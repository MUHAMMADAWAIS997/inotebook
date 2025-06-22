import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn,Notebook } from 'lucide-react';
import ThemeContext from '../context/theme/themeContext';

export default function Login() {
    const {darkMode}=useContext(ThemeContext)

  return (
    <div className={`bg-[url("./assets/home.jpg")] bg-no-repeat bg-cover ${darkMode ? ' text-white' : ' text-gray-900'} pt-16 min-h-screen flex items-center justify-center px-4`}>
      <div className={`${darkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-gray-900'} p-8 rounded-2xl  w-full max-w-sm`}>
         <p className='flex justify-self-center text-orange-600 text-2xl font-bold'><Notebook size={30}/> iNoteBook</p>
         <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Login</h2>
        <form className="space-y-4">
            <label htmlFor="email">Enter your Email:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <Mail className="mr-2" />
            <input
            id='email'
              type="email"
              placeholder="Email"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          <label htmlFor="pass">Enter Password:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <Lock className="mr-2" />
            <input
            id='pass'
              type="password"
              placeholder="Password"
              className="w-full bg-transparent focus:outline-none"
            />
          </div>
          <div className="text-right text-sm">
            <Link to="/forgot" className="text-orange-500 hover:underline">Forgot password?</Link>
          </div>
          <Link to='/note'>
          <button type="submit" className="flex items-center justify-center w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-semibold">
            <LogIn className="mr-2" /> Login
          </button>
          </Link>
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-orange-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
