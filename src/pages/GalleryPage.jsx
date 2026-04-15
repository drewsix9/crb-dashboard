import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { ImageFilters, ImageGrid } from "../components/features";
import Container from "../components/layout/Container";
import { Spinner } from "../components/ui";
import DataModeToggle from "../components/ui/DataModeToggle";
import Modal, { ModalContent } from "../components/ui/Modal";
import { useImageGalleryData } from "../hooks/useImageGalleryData";

const GalleryPage = () => {
  const [filters, setFilters] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const { images, traps, genders, loading, error } = useImageGalleryData();

  // Transform images to match ImageGrid component expectations
  const transformedImages = images.map((img) => ({
    id: img.id,
    trap_id: img.trap_id,
    image_url: img.image_url,
    image_filename:
      img.image_filename || img.image_path?.split("/").pop() || "Unknown",
    gender: img.metadata?.gender || "unknown",
    captured_at: img.taken_at,
    // Include full detection data for modal display
    detection: img.detection,
    metadata: img.metadata,
  }));

  // Filter images based on current filters
  let filteredImages = transformedImages.filter((image) => {
    if (filters.trapId && image.trap_id !== filters.trapId) return false;
    if (filters.gender && image.gender !== filters.gender) return false;
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      if (!image.image_filename.toLowerCase().includes(searchLower))
        return false;
    }

    // Date range filtering
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      const imageDate = new Date(image.captured_at);
      if (imageDate < fromDate) return false;
    }
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      const imageDate = new Date(image.captured_at);
      // Add 1 day to include the entire end date
      toDate.setDate(toDate.getDate() + 1);
      if (imageDate >= toDate) return false;
    }

    return true;
  });

  // Sort images based on sortBy filter
  if (filters.sortBy) {
    filteredImages = [...filteredImages].sort((a, b) => {
      switch (filters.sortBy) {
        case "date_desc":
          return new Date(b.captured_at) - new Date(a.captured_at);
        case "date_asc":
          return new Date(a.captured_at) - new Date(b.captured_at);
        case "trap_id":
          return a.trap_id.localeCompare(b.trap_id);
        default:
          return 0;
      }
    });
  }

  return (
    <>
      <Container maxWidth="2xl">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Image Gallery
              </h1>
              <p className="text-gray-600 mt-2">
                Browse captured CRB images from all traps
              </p>
            </div>
            <DataModeToggle />
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900">Load Error</h3>
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Spinner />
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">Total Images</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {transformedImages.length}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">Filtered Results</p>
                  <p className="text-2xl font-bold text-primary-700">
                    {filteredImages.length}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">Male</p>
                  <p className="text-2xl font-bold text-[#60a5fa]">
                    {
                      filteredImages.filter((img) => img.gender === "male")
                        .length
                    }
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600">Female</p>
                  <p className="text-2xl font-bold text-[#f472b6]">
                    {
                      filteredImages.filter((img) => img.gender === "female")
                        .length
                    }
                  </p>
                </div>
              </div>

              {/* Filters */}
              <ImageFilters traps={traps} onFilterChange={setFilters} />

              {/* Image Grid */}
              {filteredImages.length > 0 ? (
                <ImageGrid
                  images={filteredImages}
                  onImageClick={setSelectedImage}
                />
              ) : (
                <div className="bg-gray-50 rounded-lg p-12 text-center">
                  <p className="text-gray-600 text-lg">
                    No images match the current filters
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </Container>

      {/* Image Detail Modal */}
      {selectedImage && (
        <Modal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          title="Capture Details"
          size="lg"
        >
          <ModalContent>
            <div className="space-y-4">
              <img
                src={selectedImage.image_url}
                alt={`Capture from ${selectedImage.trap_id}`}
                className="w-full rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Trap ID</p>
                  <p className="font-semibold">{selectedImage.trap_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-semibold capitalize">
                    {selectedImage.gender}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Captured</p>
                  <p className="font-semibold">
                    {new Date(selectedImage.captured_at).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Image ID</p>
                  <p className="font-semibold">#{selectedImage.id}</p>
                </div>
              </div>

              {/* Detection Results (if available) */}
              {selectedImage.detection && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    🔬 ML Detection Results
                  </h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-blue-700">Total Beetles</p>
                      <p className="font-bold text-lg">
                        {selectedImage.detection.beetle_count}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-700">Male</p>
                      <p className="font-bold">
                        {selectedImage.detection.male_count}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-700">Female</p>
                      <p className="font-bold">
                        {selectedImage.detection.female_count}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-700">Unknown</p>
                      <p className="font-bold">
                        {selectedImage.detection.unknown_count}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-blue-700">Confidence Score</p>
                      <p className="font-bold">
                        {(
                          selectedImage.detection.confidence_score * 100
                        ).toFixed(1)}
                        %
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-blue-700 text-xs">
                        Model: {selectedImage.detection.model_name} v
                        {selectedImage.detection.model_version}
                      </p>
                      <p className="text-blue-700 text-xs">
                        Inference: {selectedImage.detection.inference_time_ms}ms
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default GalleryPage;
