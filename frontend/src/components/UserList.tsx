import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

interface User {
  id: number
  name: string
  username: string
  email: string
}

interface Post {
  id: number;
  userId: number;
  title: string;
}


function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: ''
  })
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetchUsers()
    fetchPosts()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await axios.get('http://localhost:3001/users')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users:', error)
      setError('An error occurred while loading users. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  
  const validateForm = () => {
    const errors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    }

    if (!formData.username.trim()) {
      errors.username = 'Username is required'
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      setError(null)
      setSuccess(null)

      if (editingUser) {
        const response = await axios.patch(
          `http://localhost:3001/users/${editingUser.id}`,
          formData
        )
        setUsers(
          users.map((user) =>
            user.id === editingUser.id ? response.data : user
          )
        )
        setSuccess('User updated successfully!')
      } else {
        const response = await axios.post(
          'http://localhost:3001/users',
          formData
        )
        setUsers([...users, response.data])
        setSuccess('User added successfully!')
      }

      setShowForm(false)
      setEditingUser(null)
      setFormData({ name: '', username: '', email: '' })
      setFormErrors({})
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error('Error saving user:', error)
      setError('An error occurred while saving user. Please try again.')
    }
  }

  const handleEdit = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email
    })
    setShowForm(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return

    try {
      setError(null)
      await axios.delete(`http://localhost:3001/users/${id}`)
      setUsers(users.filter((user) => user.id !== id))

      const userPosts = posts.filter((post) => post.userId === id);
      for (const post of userPosts) {
        await axios.delete(`http://localhost:3001/posts/${post.id}`);
      }

      setPosts(posts.filter((post) => post.userId !== id));

      setSuccess('User deleted successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } catch (error) {
      console.error('Error deleting user:', error)
      setError('An error occurred while deleting user. Please try again.')
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
        <div>Loading users...</div>
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
        <Link to="/users" className="active">
          Users
        </Link>
        <Link to="/posts">Posts</Link>
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
        <h2>User Management</h2>

        {error && <div style={{ color: '#dc3545' }}>{error}</div>}
        {success && <div style={{ color: '#28a745' }}>{success}</div>}

        <button
          className="btn btn-success"
          onClick={() => {
            setShowForm(true)
            setEditingUser(null)
            setFormData({ name: '', username: '', email: '' })
            setFormErrors({})
            setError(null)
            setSuccess(null)
          }}
        >
          Add New User
        </button>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            style={{ marginTop: '20px', textAlign: 'left' }}
          >
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className={formErrors.name ? 'error' : ''}
              />
              {formErrors.name && (
                <div style={{ color: '#dc3545', fontSize: '12px' }}>
                  {formErrors.name}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className={formErrors.username ? 'error' : ''}
              />
              {formErrors.username && (
                <div style={{ color: '#dc3545', fontSize: '12px' }}>
                  {formErrors.username}
                </div>
              )}
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={formErrors.email ? 'error' : ''}
              />
              {formErrors.email && (
                <div style={{ color: '#dc3545', fontSize: '12px' }}>
                  {formErrors.email}
                </div>
              )}
            </div>
            <button type="submit" className="btn">
              {editingUser ? 'Update User' : 'Add User'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false)
                setEditingUser(null)
                setFormData({ name: '', username: '', email: '' })
                setFormErrors({})
              }}
            >
              Cancel
            </button>
          </form>
        )}

        {users.length === 0 ? (
          <p style={{ marginTop: '20px', color: '#6c757d' }}>
            No users found. Please add one.
          </p>
        ) : (
          <table className="table" style={{ marginTop: '20px' }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="btn" onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(user.id)}
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

export default UserList
