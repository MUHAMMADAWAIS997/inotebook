import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Search, LogIn,Notebook } from 'lucide-react';
import ThemeContext from '../context/theme/themeContext';
import AuthContext from '../context/authentication/authContext';

export default function Navbar() {
  const location = useLocation();
  const { darkMode, toggleMode } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const {logout,isAuthenticated}=useContext(AuthContext)
  const toggleMenu = () => setIsOpen(!isOpen);
  const handleSearch = () => alert(`Searching for: ${searchTerm}`);
  const checkLogout = () => {
        logout()

  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Notes" , path:"/notes"}
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`${darkMode ? 'bg-black text-white' : 'bg-white text-gray-900'} shadow-md fixed top-0 left-0 w-full z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
       <div className="flex items-center">
  <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-orange-600">
    <Notebook /> iNote-Book
  </Link>
</div>
          {/* Search Bar (Desktop Only) */}
          <div className="hidden md:flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white text-black px-2 py-1 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={handleSearch} className="flex items-center gap-1 mt-2 bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700">
              <Search size={18} />Search
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center relative">
            {navItems.map((item) => (
              <div key={item.path} className="relative flex flex-col items-center">
                <Link
                  to={item.path}
                  className={`transition font-medium ${isActive(item.path) ? 'font-bold text-orange-600' : 'hover:text-orange-500'}`}
                >
                  {item.name}
                </Link>
                {/* Bottom border underline */}
                {isActive(item.path) && (
                  <div className="absolute top-[1.8rem] w-full h-[3px] bg-orange-600 rounded-md" />
                )}
              </div>
            ))}

            {/* Dark Mode Toggle */}
            <button onClick={toggleMode} className="hover:text-orange-500">
              {darkMode ? <Sun /> : <Moon />}
            </button>

            {/* Login */}
            <Link to="/login">
            {isAuthenticated?<button  onClick={checkLogout} className="flex items-center gap-1 mt-2 bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700">
                <LogIn size={18} /> Logout
              </button>: <button className="flex items-center gap-1 mt-2 bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700">
                <LogIn size={18} /> Login
              </button>}
            </Link>
            
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className={`md:hidden px-4 pb-4 space-y-3 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleSearch} className="flex items-center gap-1 mt-2 bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700">
            <Search size={18} />
            <span>Search</span>
          </button>

          {navItems.map((item) => (
            <div key={item.path} className="relative flex flex-col">
              <Link
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`transition ${isActive(item.path) ? 'font-bold text-orange-600' : 'hover:text-orange-500'}`}
              >
                {item.name}
              </Link>
              
            </div>
          ))}

          <div className="flex items-center gap-3 mt-3">
            <button onClick={toggleMode} className="hover:text-orange-500">
              {darkMode ? <Sun /> : <Moon />}
            </button>
           <Link to="/login">
            {isAuthenticated?<button  onClick={checkLogout} className="flex items-center gap-1 mt-2 bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700">
                <LogIn size={18} /> Logout
              </button>: <button className="flex items-center gap-1 mt-2 bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700">
                <LogIn size={18} /> Login
              </button>}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
