import { useContext, useState } from "react";
import { FaMoon, FaSearch, FaSun } from "react-icons/fa";
import ThemeContext from "../context/ThemeContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { FaCircleUser } from "react-icons/fa6";

const Navbar = () => {
  const currentUser = { name: "Bakare" }; // 👤 replace with real user later

  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("Navbar must be used inside ThemeProvider");
  }
  const { darkMode, toggleDarkMode } = theme;

  return (
    <nav className="sticky top-0 bg-primary-light dark:bg-primary-dark z-50 shadow-md transition-colors duration-300 w-full min-h-[60px]">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 font-bold text-base sm:text-xl md:text-2xl text-teal-900 dark:text-sky-100"
          >
            {/* User profile - hidden on very small screens */}
            <div className="hidden sm:flex relative group">
              <FaCircleUser className="text-text-light dark:text-accent-dark md:text-3xl cursor-pointer" />
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2 py-1 rounded bg-gray-800 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none">
                {currentUser.name}
              </span>
            </div>
            <span>MernyBlog</span>
          </a>
        </div>

        {/* Links - DESKTOP */}
        <ul className="hidden md:flex gap-4 md:gap-5 lg:gap-6 font-medium">
          {["Home", "Categories", "Popular", "About", "Contact"].map(
            (link, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="relative text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark hover:underline transition-all"
                >
                  {link}
                </a>
              </li>
            )
          )}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <div className="relative">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center sm:hidden text-gray-600 dark:text-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-accent-light"
              aria-label="Toggle search"
            >
              <FaSearch className="text-xl" />
            </button>
            {/* Mobile expanded search */}
            <div
              className={`absolute top-full right-0 mt-1 w-64 bg-white dark:bg-black rounded-lg shadow-lg p-3 border border-gray-200 dark:border-gray-700 ${
                searchOpen ? "block" : "hidden"
              } sm:hidden z-10`}
            >
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent outline-none text-sm text-text-light dark:text-text-dark placeholder-gray-500 dark:placeholder-gray-400"
                autoFocus
              />
            </div>
            {/* Desktop search bar */}
            <div className="hidden sm:flex items-center bg-white dark:bg-black rounded-full px-3 py-1 border border-gray-200 dark:border-gray-700">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm text-text-light dark:text-text-dark w-full sm:w-32 md:w-48 placeholder-gray-500 dark:placeholder-gray-400 pr-2"
              />
              <button
                className="text-gray-600 dark:text-gray-300"
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </div>
          </div>

          {/* Theme toggle */}
          <button
            onClick={() => toggleDarkMode()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark transition-all"
            aria-label="Toggle theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-xl sm:text-2xl text-text-light dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-accent-light"
            aria-label="Toggle menu"
          >
            {menuOpen ? <IoMdClose /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-screen opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <ul className="flex flex-col items-center bg-primary-light dark:bg-primary-dark py-4 space-y-2 w-full shadow-md">
          {/* Mobile Search in Menu */}
          <li className="w-full px-4">
            <div className="bg-white dark:bg-black rounded-full px-3 py-2 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <FaSearch className="text-gray-600 dark:text-gray-300 mr-2 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm text-text-light dark:text-text-dark flex-1 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          </li>
          {["Home", "Categories", "Popular", "About", "Contact"].map(
            (link, index) => (
              <li key={index} className="w-full">
                <a
                  href="#"
                  className="block py-3 px-4 text-base font-medium text-text-light dark:text-text-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors w-full text-left"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
