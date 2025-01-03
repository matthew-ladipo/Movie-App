import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { GoFileSubmodule } from "react-icons/go";

const TvShows = () => {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Added for pagination
  const [totalPages, setTotalPages] = useState(1);   // Added to store total pages

  const apiKey = "587653ca6fd352f2833ae74cf5ba2ec6";

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&page=${currentPage}`
        );
        setMovie(response.data.results);
        setTotalPages(response.data.total_pages); // Set the total pages from the API response
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch movie details");
        setLoading(false);
      }
    };

    fetchMovie();
  }, [currentPage]); // Update when the page changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie.length) {
    return <div>No movie data found</div>;
  }

  // Function to handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <header className="flex  items-center  gap- px-5 mb-4  top-0 ">
              <div className="p-5 mt-1 fixed top-0 overflow-hidden w-[60px] h-[60px] hover:w-[230px] bg-blue-500 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300">
                <div className="flex items-center justify-center fill-white">
                 <IoSearch className="text-[24px] text-white" />
                </div>
                <input
                  type="text"
                  className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
                />
              </div>
      
              <div className=" group inline-block fixed top-0 right-10  items-center  text-white mt-3">
                <div className="bg-blue-500 py-2 rounded-md shadow-lg hover:cursor-pointer flex justify-center items-center gap-1 px-4">
                  <GoFileSubmodule className="text-[24px]" />
                  <p>Movie Genre</p>
                </div>
      
                <div className="absolute  w-44 bg-blue-500 border h-screen overflow-y-scroll z-10 border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {/* {genre.map((genre, index) => (
                    <ul key={index} className="p-2 space-y-1">
                      <li className=" py-1 hover:bg-blue-600">📄 {genre.name}</li>
                    </ul>
                  ))}*/}
                </div> 
              </div>
            </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4 md:px-8">
        {movie.map((movieItem, index) => (
          <div key={index}>
            {movieItem.poster_path ? (
              <Link to={`/tv/${movieItem.id}`} >
                <div className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
                <div
                  className="w-full h-72 sm:h-80 md:h-96 bg-cover bg-center duration-500"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieItem.poster_path})`,
                  }}
                ></div>
                {/* <div className="absolute bg-gradient-to-t from-black via-transparent to-transparent -bottom-24 w-full p-4 flex flex-col gap-1 group-hover:bottom-0 transition-all duration-500">
                  <h3 className="text-white mt-2 text-lg font-semibold">
                    {movieItem.name}
                  </h3>
                </div> */}
                </div>
              </Link>
            ) : (
              <div className="text-center text-gray-500">No Image Available</div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Previous
        </button>
        <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TvShows;
