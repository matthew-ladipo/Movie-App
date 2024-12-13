import React from "react";
import img from "../../images.jpeg";

const Lists = ({ movie,totalPages,currentPage,handlePageChange }) => {
  return (
    <>
      <div className="grid pl-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movie.map((movieItem, index) => (
          <div key={index} >
            {movieItem.poster_path ? (
              <div className="group relative overflow-hidden cursor-pointer text-gray-50 rounded-2xl">
                <div
                  className="w-full h-72 sm:h-80 md:h-96 bg-cover bg-center duration-500"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieItem.poster_path})`,
                  }}
                ></div>
                <div className="absolute bg-gradient-to-t from-black via-transparent to-transparent -bottom-24 w-full p-4 flex flex-col gap-1 group-hover:bottom-0 transition-all duration-500">
                  <h3 className="text-white mt-2 text-lg font-semibold">
                    {movieItem.title}
                  </h3>
                </div>
              </div>
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
    </>
  );
};

export default Lists;
