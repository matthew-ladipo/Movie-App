import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Settings from "./Settings";
import Trending from "./Trending";
import TvShows from "./TvShows";
import Bookmark from "./Bookmark";
import { IoSearchSharp } from "react-icons/io5";
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
import { GoFileSubmodule } from "react-icons/go";

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
        console.log(response.data);
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
      {/* Sidebar */}

      <div className="bg-blue-300 h-screen sticky top-0">
        <div className="p-3 text-[24px] text-white ml-3    hover:rounded cursor-pointer flex items-center">
          <div className="flex items-center">
            <MdLocalMovies
              className={`${isSidebarOpen ? "h-6 w-6 mr-3" : "text-[30px]"}`}
            />
            <span className={`${isSidebarOpen ? "block" : "hidden"}`}>
              Movie Base
            </span>
          </div>
        </div>
        <div
          className={`transition-all  duration-50  ${
            isSidebarOpen ? "w-60" : "w-16"
          } bg-blue-400 h-[98vh]    p-1 py-5 my-2 mx-2 rounded-md shadow-lg text-white font-mono `}
        >
          <Link
            to={"/"}
            className={`group relative mb-2  p-4 ${
              pathname === "/" ? "bg-blue-700" : ""
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
            to={"/tv"}
            className={`group relative mb-2  p-4 ${
              pathname === "/tv" ? "bg-blue-700 hover:bg-blue-700" : ""
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
              pathname === "/trend" ? "bg-blue-700" : ""
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
              pathname === "/bookmark" ? "bg-blue-700" : ""
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
              isSidebarOpen ? "ml-[215px]" : "ml-7"
            } scroll-smooth  bg-blue-400 rounded-full `}
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaAnglesLeft /> : <FaAnglesRight />}
          </button>
          <div className="p-4 mt-36 hover:bg-blue-700 hover:rounded cursor-pointer flex items-center">
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
      <div className="p-2 h-full w-full bg-cover">
        <header className="flex bg-blue-400 items-center py-2 justify-between px-5 mb-4 top-2 ">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="Search movies..."
              className="w-56 py-2 pl-8 pr-4 border bg-blue-50 border-gray-500 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <IoSearchSharp className="absolute start-2 top-0 bottom-0 m-auto w-5 h-5 text-gray-500" />
          </div>

          {/* Genre Dropdown */}
          <div className="relative group inline-block">
            <div className="bg-blue-500 py-2 rounded-md shadow-lg hover:cursor-pointer flex justify-center items-center gap-1 px-4">
              <GoFileSubmodule className="text-[24px]" />
              <p>Movie Genre</p>
            </div>

            <div className="absolute mt-2 w-44 bg-blue-500 border h-screen overflow-y-scroll z-10 border-gray-200 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {genre.map((genre, index) => (
                <ul key={index} className="p-2 space-y-1">
                  <li className=" py-1 hover:bg-blue-600">📄 {genre.name}</li>
                </ul>
              ))}
            </div>
          </div>
        </header>

        <div className="flex-grow p-6">
          <Routes>
            <Route
              path="/"
              element={
                <Lists
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
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
