import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { logout } from "../redux/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      if (!user) {
        toast.success(`You are logged out! 😥`, {
          duration: 5000,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/user/search/${searchTerm}`);
    } else {
      toast.error("Please enter a search term");
    }
  };

  const handleInputChangeAndFetchCollege = async (e) => {
    try {
      const value = e.target.value;
      setSearchTerm(value);
      if (!value.trim()) {
        setSearchResults([]);
        return;
      }
      const controller = new AbortController();
      const response = await fetch(
        `${process.env.VITE_BACKEND_URL}/api/v1/colleges/search-college?search=${value}`,
        { signal: controller.signal, credentials: "include" }
      );
      const data = await response.json();
      setSearchResults(data || []);
    } catch (error) {
      console.log(error.message);
      setSearchResults([]); // In case of error, set searchResults to an empty array
    }
  };

  const handleResultClick = (college) => {
    setSearchTerm(college.name); // Update input value with selected college name
    setIsSearchFocused(false); // Close the dropdown
  };

  const handleResultHover = (college) => {
    setSearchTerm(college.name); // Update input value with hovered college name
  };

  const handleInputFocus = () => {
    setIsSearchFocused(true);
  };

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsSearchFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex flex-row">
      <div className="navbar w-full bg-gray-300 px-5 py-1 pr-5 gap-1 relative">
        <div className="navbar-start vsm:hidden md:flex md:min-w-10">
          <Link to="/mentor/editprofile">
            <img src="/images/Logo.svg" alt="logo" />
          </Link>
        </div>
        <div className="navbar-center flex items-center w-[70%] max-w-[30rem] mx-auto relative">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full" ref={searchRef}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 256 256"
              >
                <g fill="none" stroke="currentColor" strokeWidth="16">
                  <path d="m 89.074145,145.23139 -68.17345,68.17344" />
                  <path d="M 111.27275,167.42999 43.099304,235.60344" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m 43.099305,235.60344 a 15.696788,15.696788 0 0 1 -22.19861,0"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m 20.900695,213.40483 a 15.696788,15.696788 0 0 0 0,22.19861"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M 240.65575,86.483932 A 70.635544,70.635544 0 0 1 170.0202,157.11948 70.635544,70.635544 0 0 1 99.384659,86.483932 70.635544,70.635544 0 0 1 170.0202,15.848389 70.635544,70.635544 0 0 1 240.65575,86.483932 Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m 89.074145,145.23139 22.198605,22.1986"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m 100.17344,156.33068 19.89988,-19.89987"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m 70.126446,164.17908 22.198606,22.1986"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M 209.26216,86.483936 A 39.241967,39.241967 0 0 1 170.0202,125.7259"
                  />
                </g>
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search college name..."
              required
              onChange={handleInputChangeAndFetchCollege}
              onFocus={handleInputFocus}
              value={searchTerm}
            />
            {isSearchFocused && searchResults.length > 0 && (
              <ul className="absolute left-0 bg-white border border-gray-300 w-full mt-2 rounded-lg shadow-lg z-10 text-black max-h-60 overflow-y-auto">
                {searchResults.map((college) => (
                  <li
                    key={college._id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onMouseEnter={() => handleResultHover(college)}
                    onClick={() => handleResultClick(college)}
                  >
                    {college.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={handleSearch}
            className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>

        <div className="navbar-end flex justify-center items-center">
          {user ? (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
