import { Link } from 'react-router-dom'

function Homepage() {
  return (
    <div
      className="homepage-container"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f8f9fa',
        padding: '20px'
      }}
    >
      <div
        className="card"
        style={{
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
          background: '#fff',
          maxWidth: '600px',
          width: '100%'
        }}
      >
        <h1 style={{ marginBottom: '20px' }}>
          Welcome to User and Post Management System
        </h1>
        <h2 style={{ marginBottom: '10px' }}>Choose an option:</h2>
        <p style={{ color: '#6c757d', marginBottom: '30px' }}>
          Easily manage, edit and delete users and posts.
        </p>
        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            marginTop: '20px',
            flexWrap: 'wrap'
          }}
        >
          <Link
            to="/users"
            className="btn btn-success"
            style={{ minWidth: '200px' }}
          >
             Manage Users
          </Link>
          <Link
            to="/posts"
            className="btn btn-success"
            style={{ minWidth: '200px' }}
          >
             Manage Posts
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage
