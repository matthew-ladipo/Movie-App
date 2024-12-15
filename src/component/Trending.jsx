import React,{useState, useEffect} from 'react'
import axios from 'axios'


const Trending = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Added for pagination
    const [totalPages, setTotalPages] = useState(1);   // Added to store total pages
   let apiKey = "587653ca6fd352f2833ae74cf5ba2ec6";
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
         ` https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}&page=${currentPage}`
        );
        setMovie(response?.data?.results);
        setTotalPages(response.data.total_pages)
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch movie details");
        setLoading(false);
      }
    };

    fetchMovie();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie.length) {
    return <div>No movie data found</div>;
  }
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  return (
    <div> <div>
    <div className="grid grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movie?.map((movieItem, index) => (
        <div key={index}>
          {movieItem?.poster_path ? (
            <div className="group relative overflow-hidden cursor-pointer text-gray-50 rounded-2xl">
              <div
                className="w-full h-72 sm:h-80 md:h-96 bg-cover bg-center duration-500"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieItem?.poster_path})`,
                }}
              ></div>
              <div className="absolute bg-gradient-to-t from-black via-transparent to-transparent -bottom-24 w-full p-4 flex flex-col gap-1 group-hover:bottom-0 transition-all duration-500">
                <h3 className="text-white mt-2 text-lg font-semibold">
                  {movieItem?.original_title  || movieItem?.original_name}
                </h3>
              </div>
            </div>
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
  </div></div>
  )
}

export default Trending