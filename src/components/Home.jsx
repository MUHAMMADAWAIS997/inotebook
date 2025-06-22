import {useContext} from 'react';
import { Link } from 'react-router-dom';
import ThemeContext from '../context/theme/themeContext';

export default function Home() {
    const {darkMode}=useContext(ThemeContext)

  return (
    <div className={`${darkMode ? 'bg-[url("./assets/home.jpg")] bg-no-repeat bg-cover text-white' : 'bg-[url("./assets/home.jpg")] bg-no-repeat bg-cover text-white'} pt-16 min-h-screen transition-all duration-300`}>
      {/* Hero Section */}
      <section className="bg-black/80 text-center px-6 py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-orange-600">
          Welcome to iNote-Book
        </h1>
        <p className="max-w-2xl mx-auto text-lg sm:text-xl mb-6">
          Your personal digital notebook. Create, edit, and organize your thoughts securely in the cloud.
        </p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png"
          alt="Note taking illustration"
          className="mx-auto w-44 sm:w-60 mb-6"
        />
        <Link to="/login">
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md text-lg font-semibold shadow-md">
            Login to Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
     
      {/* Footer */}
      <footer className="bg-gray-800 text-center py-6 text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} iNote-Book — All rights reserved.
      </footer>
    </div>
  );
}
