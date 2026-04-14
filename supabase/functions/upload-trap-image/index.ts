// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts"

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.0"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

interface ImageUploadRequest {
  trap_id: string
  captured_at: string
  gps_lat?: number
  gps_lon?: number
  ldr_value?: number
  is_fallen?: boolean
  battery_voltage?: number
  image_file: File
}

interface UploadResponse {
  success: boolean
  message: string
  image_upload_id?: string
  detection_result_id?: string
  error?: string
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    console.log(`[${new Date().toISOString()}] Received ${req.method} request`)

    // Initialize Supabase client with SERVICE_ROLE_KEY for server-side operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables")
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Parse multipart form data
    console.log("Parsing multipart form data...")
    const formData = await req.formData()
    const trapId = formData.get("trap_id") as string
    const capturedAt = formData.get("captured_at") as string
    const gpsLat = formData.get("gps_lat")
      ? parseFloat(formData.get("gps_lat") as string)
      : null
    const gpsLon = formData.get("gps_lon")
      ? parseFloat(formData.get("gps_lon") as string)
      : null
    const ldrValue = formData.get("ldr_value")
      ? parseInt(formData.get("ldr_value") as string)
      : null
    const isFallen = formData.get("is_fallen") === "true"
    const batteryVoltage = formData.get("battery_voltage")
      ? parseFloat(formData.get("battery_voltage") as string)
      : null
    const imageFile = formData.get("image_file") as File

    console.log(`Parsed form data: trapId=${trapId}, capturedAt=${capturedAt}, hasImage=${!!imageFile}`)

    // Validations
    if (!trapId || !capturedAt || !imageFile) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: trap_id, captured_at, or image_file",
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      )
    }

    // Step 1: Validate trap exists
    console.log(`[STEP 1] Validating trap: ${trapId}`)
    const { data: trap, error: trapError } = await supabase
      .from("traps")
      .select("id, trap_id")
      .eq("trap_id", trapId)
      .single()

    if (trapError) {
      console.error(`[STEP 1] Trap validation error: ${trapError.message}`)
    }
    if (!trap) {
      console.error(`[STEP 1] Trap not found: ${trapId}`)
      return new Response(
        JSON.stringify({
          success: false,
          error: `Trap not found: ${trapId}`,
        }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      )
    }

    // Step 2: Upload image to Supabase Storage
    console.log(`[STEP 2] Uploading image to storage...`)
    const timestamp = new Date().getTime()
    const imageFilename = `${trapId}-${timestamp}-${imageFile.name}`
    const imagePath = `trap-images/${trapId}/${imageFilename}`
    const imageBuffer = await imageFile.arrayBuffer()

    console.log(`[STEP 2] Image path: ${imagePath}, size: ${imageBuffer.byteLength} bytes`)

    const { data: storageData, error: storageError } = await supabase.storage
      .from("trap-images")
      .upload(imagePath, imageBuffer, {
        contentType: imageFile.type || "image/jpeg",
        upsert: false,
      })

    if (storageError) {
      console.error(`[STEP 2] Storage upload error: ${storageError.message}`)
      return new Response(
        JSON.stringify({
          success: false,
          error: `Failed to upload image: ${storageError.message}`,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      )
    }
    console.log(`[STEP 2] Image uploaded successfully`)

    // Step 3: Insert row into image_uploads table
    const { data: imageUpload, error: imageUploadError } = await supabase
      .from("image_uploads")
      .insert({
        trap_id: trapId,
        captured_at: capturedAt,
        gps_lat: gpsLat,
        gps_lon: gpsLon,
        ldr_value: ldrValue,
        is_fallen: isFallen,
        battery_voltage: batteryVoltage,
        image_path: imagePath,
        image_filename: imageFilename,
        image_size_bytes: imageBuffer.byteLength,
        content_type: imageFile.type || "image/jpeg",
      })
      .select("id")
      .single()

    if (imageUploadError) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Failed to insert image_uploads record: ${imageUploadError.message}`,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      )
    }

    // Step 4 (Optional): Insert placeholder row into detection_results table
    const { data: detectionResult, error: detectionError } = await supabase
      .from("detection_results")
      .insert({
        image_upload_id: imageUpload.id,
        beetle_count: 0,
        male_count: 0,
        female_count: 0,
        unknown_count: 0,
        classification_label: null,
        confidence_score: null,
        model_name: null,
        model_version: null,
        inference_time_ms: null,
        remarks: "Pending processing",
      })
      .select("id")
      .single()

    if (detectionError) {
      console.error("Detection results insertion warning:", detectionError)
      // Log warning but don't fail - image_uploads already created
    }

    // Step 5: Return success response
    const response: UploadResponse = {
      success: true,
      message: "Image uploaded and processed successfully",
      image_upload_id: imageUpload.id,
      detection_result_id: detectionResult?.id,
    }

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return new Response(
      JSON.stringify({
        success: false,
        error: `Server error: ${error instanceof Error ? error.message : "Unknown error"}`,
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request with multipart form data:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/upload-trap-image' \
    --header 'Authorization: Bearer {YOUR_JWT_TOKEN}' \
    --form 'trap_id="TRAP-001"' \
    --form 'captured_at="2024-03-07T10:30:00Z"' \
    --form 'gps_lat="40.7128"' \
    --form 'gps_lon="-74.0060"' \
    --form 'ldr_value="512"' \
    --form 'is_fallen="false"' \
    --form 'battery_voltage="4.2"' \
    --form 'image_file=@/path/to/image.jpg'

*/
