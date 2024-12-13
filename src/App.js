import react, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./component/Dashboard";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [component, setComponet] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // Added for pagination
    const [totalPages, setTotalPages] = useState(1);   // Added to store total pages
    let apiKey = "587653ca6fd352f2833ae74cf5ba2ec6";
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
         `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${currentPage}`
        );
        setMovie(response.data.results);
        setTotalPages(response.data.total_pages)
        setLoading(false);
      } catch (error) {
        setError(error.message || "Failed to fetch movie details");
        setLoading(false);
      }
    };

    fetchMovie();
  }, [currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!movie.length) {
    return <div>No movie data found</div>;
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className="bg-blue-300 bg-cover bg-center scroll-smooth w-full h-full ">
        <Dashboard
          isSidebarOpen={isSidebarOpen}
        
          toggleSidebar={toggleSidebar}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          movie={movie}
         
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default App;
