import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { API_URL } from "../utils/baseUrl"

const MovieList = () => {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState("")
  const [sortBy, setSortBy] = useState("")

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const url = sortBy
          ? `${API_URL}/movies/sorted?sortBy=${sortBy}`
          : `${API_URL}/movies`
        const response = await axios.get(url)
        setMovies(response.data)
      } catch (err) {
        setError("Failed to fetch movies")
        console.error(err)
      }
    }
    fetchMovies()
  }, [sortBy])

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Movie List
      </h2>

      {error && (
        <p className="text-red-600 text-center mb-6 text-sm">{error}</p>
      )}

      {/* Sort Dropdown */}
      <div className="mb-6">
        <label htmlFor="sortBy" className="block text-sm font-medium mb-1">
          Sort By
        </label>
        <select
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">None</option>
          <option value="rating">Rating</option>
          <option value="releaseDate">Release Date</option>
          <option value="duration">Duration</option>
          <option value="name">Name</option>
        </select>
      </div>

      {/* Movie List */}
      <ul className="space-y-4">
        {movies.map((movie) => (
          <li
            key={movie._id}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 flex items-start gap-4"
          >
            <img
              src={movie.image[0]}
              alt={movie.title}
              className="w-24 h-24 object-cover rounded-md shadow"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {movie.description}
              </p>
              <Link to={`/movie/${movie._id}`}>
                <button className="bg-blue-600 cursor-pointer text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 shadow">
                  View Details
                </button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieList
