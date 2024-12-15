import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Settings from "./Settings";
import Trending from "./Trending";
import TvShows from "./TvShows";
import Home from "./Home";
import Bookmark from "./Bookmark";

import { Link, Outlet, Routes, Route } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdLiveTv } from "react-icons/md";
import { LuTrendingUp } from "react-icons/lu";
import { FaBookBookmark } from "react-icons/fa6";
import Lists from "./movies/Lists";
import { MdLocalMovies } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FaAnglesLeft } from "react-icons/fa6";
import { FaAnglesRight } from "react-icons/fa6";

import MoviesId from "./id/MoviesId";
import { BiSolidMoviePlay } from "react-icons/bi";
import TvShowDetail from "./id/TvsId";

const Dashboard = ({
  isSidebarOpen,
  toggleSidebar,
  setSearchValue,
  searchValue,
  movie,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const [component, setComponet] = useState(true);
  const [genre, setGenre] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let { pathname } = useLocation();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=587653ca6fd352f2833ae74cf5ba2ec6"
        );
        setGenre(response.data.genres);

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
    <div className="flex ">
      <div className="bg-blue-600 h-screen sticky top-0">
        <div className="p-3 text-[24px] text-white ml-3    hover:rounded cursor-pointer flex items-center">
          <div className="flex items-center">
            <MdLocalMovies
              className={`${
                isSidebarOpen   ? "h-6 w-6 mr-3" : "text-[30px] ml-1"
              }`}
            />
            <span className={`${isSidebarOpen ? "block" : "hidden  "}`}>
              Movie Base
            </span>
          </div>
        </div>
        <div
          className={`transition-all  duration-50  ${
            isSidebarOpen ? "w-60 p-5" : "w-14 -p-5 mx-4 "
          } bg-blue-600 h-[98vh]     py-5 my-2  rounded-md  text-white font-mono `}
        >
          <Link
            to={"/"}
            className={`group relative mb-2  p-4 ${
              pathname === "/" ? "bg-blue-900 rounded-lg " : ""
            } hover:bg-blue-300 hover:rounded cursor-pointer flex items-center`}
          >
            <span className="flex items-center">
              <IoHome
                className={`${isSidebarOpen ? "h-6 w-6 mr-3" : "text-[24px]"}`}
              />
              <span
                className={`${
                  isSidebarOpen
                    ? " font-sans block text-[17px] font-bold"
                    : "hidden"
                }`}
              >
                Home
              </span>
            </span>
            <div
              className={`${
                isSidebarOpen
                  ? "hidden"
                  : "bg-blue-800 p-2 z-20 rounded-md group-hover:flex hidden absolute top-1/2 right-[1px] -translate-y-1/2 translate-x-full"
              }`}
            >
              <span className="text-gra2-400 text-xs whitespace-nowrap">
                home
              </span>
              <div className="bg-inherit rotate-45 p-1 absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2"></div>
            </div>
          </Link>
          <Link
            to={"/list"}
            className={`group relative mb-2  p-4 ${
              pathname === "/list" ? "bg-blue-900 rounded-lg " : ""
            } hover:bg-blue-300 hover:rounded cursor-pointer flex items-center`}
          >
            <span className="flex items-center">
              <BiSolidMoviePlay
                className={`${isSidebarOpen ? "h-6 w-6 mr-3" : "text-[24px]"}`}
              />
              <span
                className={`${
                  isSidebarOpen
                    ? " font-sans block text-[17px] font-bold"
                    : "hidden"
                }`}
              >
                Movies
              </span>
            </span>
            <div
              className={`${
                isSidebarOpen
                  ? "hidden"
                  : "bg-blue-800 p-2 z-20 rounded-md group-hover:flex hidden absolute top-1/2 right-[1px] -translate-y-1/2 translate-x-full"
              }`}
            >
              <span className="text-gra2-400 text-xs whitespace-nowrap">
                movies
              </span>
              <div className="bg-inherit rotate-45 p-1 absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2"></div>
            </div>
          </Link>
          <Link
            to={"/tv"}
            className={`group relative mb-2  p-4 ${
              pathname === "/tv"
                ? "bg-blue-900 hover:bg-blue-700 rounded-lg"
                : ""
            } hover:bg-blue-300 hover:rounded cursor-pointer flex items-center`}
          >
            <span className="flex items-center">
              <MdLiveTv
                className={`${isSidebarOpen ? "h-6 w-6 mr-3" : "text-[24px]"}`}
              />
              <span
                className={`${
                  isSidebarOpen
                    ? "font-sans block text-[17px] font-bold"
                    : "hidden"
                }`}
              >
                TV Shows
              </span>
            </span>
            <div
              className={`${
                isSidebarOpen
                  ? "hidden"
                  : "bg-blue-800 p-2 rounded-md group-hover:flex hidden absolute top-1/2 right-2 -translate-y-1/2 translate-x-full"
              }`}
            >
              <span className="text-gray-200 text-xs whitespace-nowrap">
                series
              </span>
              <div className="bg-inherit rotate-45 p-1 absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2"></div>
            </div>
          </Link>
          <Link
            to={"/trend"}
            className={`group relative mb-2  p-4 ${
              pathname === "/trend" ? "bg-blue-900 rounded-lg" : ""
            } hover:bg-blue-300 hover:rounded cursor-pointer flex items-center`}
          >
            <span className="flex items-center">
              <LuTrendingUp
                className={`${isSidebarOpen ? "h-6 w-6 mr-3" : "text-[24px]"}`}
              />
              <span
                className={`${
                  isSidebarOpen
                    ? "font-sans block text-[17px] font-bold"
                    : "hidden"
                }`}
              >
                Trending
              </span>
            </span>
            <div
              className={`${
                isSidebarOpen
                  ? "hidden"
                  : "bg-blue-800 p-2 right-2 rounded-md group-hover:flex hidden absolute top-1/2 -translate-y-1/2 translate-x-full"
              }`}
            >
              <span className="text-gray-200 whitespace-nowrap text-xs">
                trending
              </span>
              <div className="bg-inherit rotate-45 p-1 absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2"></div>
            </div>
          </Link>
          <Link
            to={"/bookmark"}
            className={`group relative mb-2  p-4 ${
              pathname === "/bookmark" ? "bg-blue-900 rounded-lg" : ""
            } hover:bg-blue-300 hover:rounded cursor-pointer flex items-center`}
          >
            <span className="flex items-center">
              <FaBookBookmark
                className={`${isSidebarOpen ? "h-6 w-6 mr-3" : "text-[24px]"}`}
              />
              <span
                className={`${
                  isSidebarOpen
                    ? "font-sans block text-[17px] font-bold"
                    : "hidden"
                }`}
              >
                Bookmarks
              </span>
            </span>
            <div
              className={`${
                isSidebarOpen
                  ? "hidden"
                  : "bg-blue-800 p-2 right-2 rounded-md group-hover:flex hidden absolute top-1/2 -translate-y-1/2 translate-x-full"
              }`}
            >
              <span className="text-gray-200 whitespace-nowrap text-xs">
                bookmark
              </span>
              <div className="bg-inherit rotate-45 p-1 absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2"></div>
            </div>
          </Link>
          <button
            className={`p-4 relative ${
              isSidebarOpen ? "ml-[200px]" : "ml-12"
            } scroll-smooth  bg-blue-400 rounded-full`}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaAnglesLeft /> : <FaAnglesRight />}
          </button>
          <div className="p-4 mt-14 hover:bg-blue-900 hover:rounded cursor-pointer flex items-center">
            <IoSettingsSharp
              className={`${isSidebarOpen ? "h-6 w-6 mr-3" : "text-[24px]"}`}
            />
            <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
              Settings
            </span>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="p-1 h-full w-full bg-cover">
        <div className="flex-grow pl-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/list"
              element={
                <Lists
                genre={genre}
                  movie={movie}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                />
              }
            />
            <Route path="/tv" element={<TvShows />} />
            <Route path="/trend" element={<Trending />} />
            <Route path="/bookmark" element={<Bookmark />} />
            <Route path="/bookmark" element={<Settings />} />
            <Route path="/movie/:movie_id" element={<MoviesId />} />
            <Route path="/tv/:series_id" element={<TvShowDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
