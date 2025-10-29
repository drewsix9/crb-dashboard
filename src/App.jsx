import { useState } from 'react'
import './App.css'
import { supabase } from './supabase'

function App() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [posts, setPosts] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  // Create a new post
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{ title, content }])
        .select()

      if (error) throw error

      setMessage('✅ Post created successfully!')
      setTitle('')
      setContent('')
      fetchPosts() // Refresh the posts list
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
      console.error('Error creating post:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch all posts
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setPosts(data || [])
      setMessage('✅ Posts loaded successfully!')
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
      console.error('Error fetching posts:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Supabase Test - Posts</h1>
      
      {/* Create Post Form */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <textarea
              placeholder="Post Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="4"
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>

      {/* Message Display */}
      {message && (
        <div style={{ padding: '10px', marginBottom: '20px', backgroundColor: message.includes('❌') ? '#ffebee' : '#e8f5e9', borderRadius: '4px' }}>
          {message}
        </div>
      )}

      {/* Fetch Posts Button */}
      <button 
        onClick={fetchPosts}
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: '16px', marginBottom: '20px', cursor: 'pointer' }}
      >
        {loading ? 'Loading...' : 'Fetch All Posts'}
      </button>

      {/* Display Posts */}
      <div> 
        <h2>Posts ({posts.length})</h2>
        {posts.map((post) => (
          <div key={post.id} style={{ padding: '15px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small style={{ color: '#666' }}>
              Created: {new Date(post.created_at).toLocaleString()}
            </small>
          </div>
        ))}
        {posts.length === 0 && (
          <p style={{ color: '#666' }}>No posts yet. Create one or click "Fetch All Posts"!</p>
        )}
      </div>
    </div>
  )
}

export default App
