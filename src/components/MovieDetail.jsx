import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_URL } from "../utils/baseUrl.js";

const MovieDetail = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/movies/get/${movieId}`);
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movie details", err);
        setLoading(false);
      }
    };
    fetchMovieDetail();
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Movie Image */}
        <div>
          <img
            src={movie.image[1]}
            alt={movie.title}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Movie Details */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-lg text-gray-600">
            <strong>Directed by:</strong> {movie.director}
          </p>

          {/* Genre */}
          <div className="flex items-center gap-x-3">
            <h2 className="text-xl font-semibold">Genres:</h2>
            <div className="flex flex-wrap justify-center gap-2 mt-1">
              {movie.genre.map((genre, index) => (
                <span
                  key={index}
                  className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {/* Cast */}
          <div className="flex items-center gap-x-3">
            <h2 className="text-xl font-semibold">Cast:</h2>
            <p>{movie.cast.join(", ")}</p>
          </div>

          {/* Description */}
          <div className="flex items-baseline gap-x-3">
            <h2 className="text-xl font-semibold">Description:</h2>
            <p>{movie.description}</p>
          </div>

          {/* Rating and Duration */}
          <div className="flex items-center gap-4">
            <p>
              <strong>Rating:</strong> {movie.rating}
            </p>
            <p>
              <strong>Duration:</strong> {movie.duration} min
            </p>
          </div>

          {/* Release Date */}
          <div className="flex items-center">
            <h2 className="text-xl font-semibold">Release Date:</h2>
            <p>{new Date(movie.releaseDate).toLocaleDateString()}</p>
          </div>

          {/* Trailer */}
          {movie.trailerLink && (
            <div className="mt-4">
              <a
                href={movie.trailerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Watch Trailer
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
