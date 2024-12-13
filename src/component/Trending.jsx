import React,{useState, useEffect} from 'react'
import axios from 'axios'


const Trending = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [component, setComponet] = useState(0);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/trending?api_key=587653ca6fd352f2833ae74cf5ba2ec6"
        );
        setMovie(response.data.results);
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

  return (
    <div>Trending</div>
  )
}

export default Trending