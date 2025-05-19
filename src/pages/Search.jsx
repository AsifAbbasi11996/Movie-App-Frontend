import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, Link } from 'react-router-dom'
import { API_URL } from '../utils/baseUrl'

const Search = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  const query = new URLSearchParams(location.search).get('q')

  useEffect(() => {
    if (query) {
      setLoading(true)
      setError('')
      const fetchMovies = async () => {
        try {
          const response = await axios.get(`${API_URL}/movies/search?query=${query}`)
          setMovies(response.data)
        } catch (err) {
          setError('Failed to fetch movies')
        } finally {
          setLoading(false)
        }
      }

      fetchMovies()
    }
  }, [query])

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Search Results for &quot;{query}&quot;
      </h2>

      {loading && (
        <div className="flex justify-center my-8">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-center">{error}</p>
      )}

      {!loading && !error && movies.length === 0 && (
        <p className="text-center text-gray-500">No movies found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {movies.map((movie) => (
          <div key={movie._id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={movie.image?.[0] ? movie.image[0] : '/fallback.jpg'}
              alt={movie.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate">{movie.title}</h3>
              <p className="text-sm text-gray-600 mt-1 truncate">
                {movie.description
                  ? `${movie.description.slice(0, 100)}...`
                  : 'No description available'}
              </p>
            </div>
            <div className="px-4 pb-4">
              <Link
                to={`/movie/${movie._id}`}
                className="block text-center w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
