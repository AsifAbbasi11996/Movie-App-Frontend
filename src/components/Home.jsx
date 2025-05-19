import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import { API_URL } from "../utils/baseUrl";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${API_URL}/movies`);
        setMovies(res.data);
      } catch (err) {
        console.error("Error fetching movies", err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Top Movies</h1>
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;
