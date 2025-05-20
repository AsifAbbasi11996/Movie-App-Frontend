import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '../utils/baseUrl.js'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'username') setUsername(value)
    if (name === 'email') setEmail(value)
    if (name === 'password') setPassword(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!username || !email || !password) {
      setError('All fields are required!')
      return
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (response.status === 201) {
        navigate('/login')
      } else {
        setError(data.message || 'Registration failed!')
      }
    } catch (err) {
      setError('An error occurred during registration.')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-md">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              name="username"
              type="text"
              value={username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full border cursor-pointer border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 transition"
          >
            Already have an account? <span className="underline text-blue-700">Login</span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
