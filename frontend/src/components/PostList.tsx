import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface Post {
  userId: number
  id: number
  title: string
}

interface User {
  id: number
  name: string
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [formData, setFormData] = useState({
    userId: 1,
    title: ''
  })
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const [postsResponse, usersResponse] = await Promise.all([
        axios.get('http://localhost:3001/posts'),
        axios.get('http://localhost:3001/users')
      ])
      setPosts(postsResponse.data)
      setUsers(usersResponse.data)
    } catch (error) {
      console.error('Error fetching data:', error)
      setError('An error occurred while loading data. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.title.trim()) {
      errors.title = 'Title is required'
    }

    if (!formData.userId) {
      errors.userId = 'User selection is required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const getUserName = (userId: number) => {
    const user = users.find((u) => u.id === userId)
    return user ? user.name : `User ${userId}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    try {
      setError(null)
      setSuccess(null)

      if (editingPost) {
        const response = await axios.patch(
          `http://localhost:3001/posts/${editingPost.id}`,
          formData
        )
        setPosts(
          posts.map((post) =>
            post.id === editingPost.id ? response.data : post
          )
        )
        setSuccess('Post updated successfully!')
      } else {
        const response = await axios.post(
          'http://localhost:3001/posts',
          formData
        )
        setPosts([...posts, response.data])
        setSuccess('Post added successfully!')
      }

      setShowForm(false)
      setEditingPost(null)
      setFormData({ userId: 1, title: '' })
      setFormErrors({})

      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error('Error saving post:', error)
      setError('An error occurred while saving post. Please try again.')
    }
  }

  const handleEdit = (post: Post) => {
    setEditingPost(post)
    setFormData({
      userId: post.userId,
      title: post.title
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return

    try {
      setError(null)
      await axios.delete(`http://localhost:3001/posts/${id}`)
      setPosts(posts.filter((post) => post.id !== id))
      setSuccess('Post deleted successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error('Error deleting post:', error)
      setError('An error occurred while deleting post. Please try again.')
    }
  }

  if (loading)
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div>Loading posts...</div>
      </div>
    )

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '20px',
        background: '#f8f9fa'
      }}
    >
      <nav className="nav" style={{ marginBottom: '20px' }}>
        <Link to="/">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/posts" className="active">
          Posts
        </Link>
      </nav>

      <div
        className="card"
        style={{
          padding: '20px',
          borderRadius: '12px',
          background: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <h2>Post Management</h2>

        {error && <div className="error" style={{ color: '#dc3545' }}>{error}</div>}
        {success && <div className="success" style={{ color: '#28a745' }}>{success}</div>}

        <button
          className="btn btn-success"
          onClick={() => {
            setShowForm(true)
            setEditingPost(null)
            setFormData({ userId: 1, title: '' })
            setFormErrors({})
            setError(null)
            setSuccess(null)
          }}
        >
          Add New Post
        </button>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{ marginTop: '20px', textAlign: 'left' }}
          >
            <div className="form-group">
              <label>User:</label>
              <select
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: parseInt(e.target.value) })
                }
                className={formErrors.userId ? 'error' : ''}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {formErrors.userId && (
                <div
                  style={{
                    color: '#dc3545',
                    fontSize: '12px',
                    marginTop: '4px'
                  }}
                >
                  {formErrors.userId}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className={formErrors.title ? 'error' : ''}
              />
              {formErrors.title && (
                <div
                  style={{
                    color: '#dc3545',
                    fontSize: '12px',
                    marginTop: '4px'
                  }}
                >
                  {formErrors.title}
                </div>
              )}
            </div>
            <button type="submit" className="btn">
              {editingPost ? 'Update Post' : 'Add Post'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false)
                setEditingPost(null)
                setFormData({ userId: 1, title: '' })
                setFormErrors({})
              }}
            >
              Cancel
            </button>
          </form>
        )}

        {posts.length === 0 ? (
          <p style={{ marginTop: '20px', color: '#6c757d' }}>
            No posts available. Please add one.
          </p>
        ) : (
          <table className="table" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>{post.id}</td>
                  <td>{getUserName(post.userId)}</td>
                  <td>{post.title}</td>
                  <td>
                    <button className="btn" onClick={() => handleEdit(post)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(post.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default PostList
