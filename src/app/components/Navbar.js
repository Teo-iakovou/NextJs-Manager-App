"use client";

import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toggleTheme } from "../redux/themeSlice";
import { BsMoon, BsSun } from "react-icons/bs";
// import logoSvg from "../assets/logo.svg";

const Navbar = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest(".dropdown-container")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav
      className={`flex justify-between items-center p-4 shadow-sm ${
        theme === "dark" ? "bg-blue-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className="flex items-center space-x-2">
        <a href="/" className="text-2xl font-bold">
          CodeCLA
        </a>
        <a href="/challenges" className="hover:underline">
          Challenges
        </a>
        <a href="/leaderboard" className="hover:underline">
          Leaderboard
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={() => dispatch(toggleTheme())} className="text-xl">
          {theme === "light" ? <BsMoon /> : <BsSun />}
        </button>
        <div className="relative dropdown-container">
          <div
            onClick={handleDropdownToggle}
            className="flex items-center cursor-pointer"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-2">Michael Williams</span>
          </div>
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10">
              <ul>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li className="p-2 hover:bg-gray-100 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
