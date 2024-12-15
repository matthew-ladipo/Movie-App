import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TvShowDetail = () => {
  const { series_id } = useParams();
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = "587653ca6fd352f2833ae74cf5ba2ec6";

  useEffect(() => {
    const fetchShowDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/${series_id}?api_key=${apiKey}`
        );
        setShow(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch show details");
        setLoading(false);
      }
    };

    fetchShowDetails();
  }, [series_id]);

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
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Poster Section */}
          {show.poster_path ? (
            <div className="lg:w-1/3">
              <img
                src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                alt={show.name}
                className="w-full h-auto object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
              />
            </div>
          ) : (
            <div className="lg:w-1/3 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}

          {/* Details Section */}
          <div className="lg:w-2/3 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
                {show.name}
              </h1>
              <p className="mt-4 text-gray-700">{show.overview}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {show.genres && show.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="mt-4 text-gray-600">
                <strong>First Air Date:</strong> {show.first_air_date}
              </p>
              <p className="mt-2 text-gray-600">
                <strong>Rating:</strong> {show.vote_average}
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
                onClick={() => window.history.back()}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvShowDetail;
