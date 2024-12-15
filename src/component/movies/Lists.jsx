import React from "react";
import img from "../../images.jpeg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { GoFileSubmodule } from "react-icons/go";
import { IoSearchSharp } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
const Lists = ({ movie, totalPages, currentPage, handlePageChange, genre }) => {
  return (
    <div className="container mx-auto py-10 px-4">
      <header className="flex  items-center  gap- px-5 mb-4  top-0 max-sm:bg-blue-500">
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
            {genre.map((genre, index) => (
              <ul key={index} className="p-2 space-y-1">
                <li className=" py-1 hover:bg-blue-600">📄 {genre.name}</li>
              </ul>
            ))}
          </div>
        </div>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 px-4 md:px-8">
        {movie.map((movieItem, index) => (
          <div key={index}>
            {movieItem.poster_path ? (
              <Link to={`/movie/${movieItem.id}`}>
                <div className="group bg-white rounded-lg shadow-md overflow-hidden border border-gray-300">
                  <div
                    className="w-full h-72 sm:h-80 md:h-96 bg-cover bg-center duration-500"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieItem.poster_path})`,
                    }}
                  ></div>
                </div>
              </Link>
            ) : (
              <div className="text-center text-gray-500">
                No Image Available
              </div>
            )}
          </div>
        ))}
      </div>
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

export default Lists;
