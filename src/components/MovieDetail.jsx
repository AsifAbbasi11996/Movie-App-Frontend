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

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

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
            className="md:w-full md:h-[450px] w-full h-[300px] object-contain md:rounded-lg"
          />
        </div>

        {/* Movie Details */}
        <div className="md:col-span-2 flex flex-col gap-y-2">
          <h1 className="md:text-2xl text-lg font-bold">{movie.title}</h1>
          <p className="md:text-lg text-[14px] text-gray-600">
            <strong>Directed by :</strong> {movie.director}
          </p>

          {/* Genre */}
          <div className="flex items-center gap-x-3">
            <h2 className="md:text-xl text-[14px]">
              <strong>Genres :</strong>
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
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
          <div className="flex items-baseline gap-x-3">
            <p className="md:text-xl text-[14px]">
              <strong>Cast:</strong>
            </p>
            <p className="md:text-lg text-[14px]">{movie.cast.join(", ")}</p>
          </div>

          {/* Description */}
          <div className="flex items-baseline gap-x-3">
            <p className="md:text-xl text-[14px]">
              <strong>Description:</strong>
            </p>
            <p className="md:text-lg text-[14px]">{movie.description}</p>
          </div>

          {/* Rating and Duration */}
          <div className="flex items-center gap-4">
            <p className="md:text-xl text-[14px]">
              <strong>Rating :</strong> {movie.rating} ⭐
            </p>
            <p className="md:text-xl text-[14px]">
              <strong>Duration :</strong> {movie.duration} min
            </p>
          </div>

          {/* Release Date */}
          <div className="flex items-center">
            <h2 className="md:text-xl text-[14px]">
              <strong>Release Date :</strong>
            </h2>
            <p className="ml-1 md:text-lg text-[14px]">
              {new Date(movie.releaseDate).toLocaleDateString()}
            </p>
          </div>

          {/* Trailer */}
          {movie.trailerLink && (
            <div className="mt-4">
              <a
                href={movie.trailerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="md:text-[16px] text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                ▶️ Watch Trailer
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
