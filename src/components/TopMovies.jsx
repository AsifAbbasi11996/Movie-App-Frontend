import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/baseUrl";

const TopMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${API_URL}/movies`);
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching movies", err);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-4 md:py-8 px-4">
      <h2 className="lg:text-3xl md:text-2xl text-xl text-blue-600  font-semibold text-center mb-6">
        Top Movies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white shadow-md border border-[#e4e4e4] rounded-lg overflow-hidden flex flex-col p-3 pb-0"
          >
            <img
              src={movie.image[0]}
              alt={movie.title}
              className="h-[200px] md:h-[300px] w-full object-cover rounded-md"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="md:text-lg text-base font-bold text-wrap mb-1">
                  {movie.title}
                </h3>
                <p className="text-sm text-gray-600">{movie.description}</p>
              </div>
              <Link to={`/movie/${movie._id}`} className="mt-4 block">
                <button className="text-sm md:text-base w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMovies;
