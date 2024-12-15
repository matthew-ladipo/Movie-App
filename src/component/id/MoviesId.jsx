import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeftLong } from "react-icons/fa6";

const MoviesId = () => {
  const { movie_id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "587653ca6fd352f2833ae74cf5ba2ec6";

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}`
        );
        setShow(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch show details");
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [movie_id]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!show) {
    return <div className="text-center text-gray-500">No show details found</div>;
  }

  return (
    <div className="p-4">
      {/* Go Back Button */}
      <Link to="/">
        <button
          className="bg-white mb-4 text-center w-36 sm:w-48 h-10 rounded-full flex items-center justify-center relative group transition-all duration-500 hover:bg-blue-500 hover:text-white"
          type="button"
        >
          <div className="absolute left-3 flex items-center justify-center">
            <FaArrowLeftLong className="text-blue-400 group-hover:text-white transition-all duration-500" />
          </div>
          <p className="ml-6 text-sm sm:text-base font-semibold">Go Back</p>
        </button>
      </Link>

      {/* Movie Details */}
      <div className="max-w-5xl mx-auto">
        {show.backdrop_path ? (
          <div className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
          <div
            className="w-full h-72 sm:h-80 md:h-96 bg-cover bg-center duration-500"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w500/${show.backdrop_path})`,
            }}
          ></div>
        </div>
          // <img
          //   src={`https://image.tmdb.org/t/p/w500/${show.backdrop_path}`}
          //   alt={show.title}
          //   className="w-full h-auto  shadow-lg"
          // />
        ) : (
          <div className="text-center text-gray-500">No Image Available</div>
        )}

        {/* Movie Info */}
        <div className="mt-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            {show.title}
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            {show.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          <p className="mt-4 text-gray-700 text-lg">{show.overview}</p>
          <p className="mt-2 text-gray-600">Release Date: {show.release_date}</p>
          <p className="mt-2 text-gray-600">Rating: {show.vote_average}</p>
        </div>
      </div>
    </div>
  );
};

export default MoviesId;
