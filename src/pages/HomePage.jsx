import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { API_URL } from '../utils/baseUrl'

const HomePage = () => {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}/movies`)
        setMovies(response.data)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching movies', err)
        setLoading(false)
      }
    }
    fetchMovies()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Top Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map(movie => (
          <div
            key={movie._id}
            className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
          >
            <img
              src={movie.image[0]}
              alt={movie.title}
              className="h-[300px] w-full object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-medium truncate">{movie.title}</h3>
                <p className="text-sm text-gray-600 truncate">
                  {movie.description}
                </p>
              </div>
              <Link to={`/movie/${movie._id}`} className="mt-4 block">
                <button className="w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
