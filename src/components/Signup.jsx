import {useContext} from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, Notebook } from 'lucide-react';
import ThemeContext from '../context/theme/themeContext';

export default function Signup() {
    const {darkMode}=useContext(ThemeContext)

  return (
    <div className={`bg-[url("./assets/home.jpg")] bg-no-repeat bg-cover ${darkMode ? ' text-white' : ' text-gray-900'} pt-20 min-h-screen flex items-center justify-center px-4`}>
      <div className={`${darkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-gray-900'} p-8 rounded-2xl  w-full max-w-sm`}>
        <p className='flex justify-self-center text-orange-600 text-2xl font-bold'><Notebook size={30}/> iNoteBook</p>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Create a new Account</h2>

        <form className="space-y-4">
            <label htmlFor="name">Enter your Name:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <User className="mr-2" />
            <input type="text" id='name' placeholder="Full Name" className="w-full bg-transparent focus:outline-none" />
          </div>
            <label htmlFor="email">Enter your Email:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <Mail className="mr-2" />
            <input type="email" id='email' placeholder="Email" className="w-full bg-transparent focus:outline-none" />
          </div>
            <label htmlFor="pass">Enter Password:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <Lock className="mr-2" />
            <input type="password" id='pass' placeholder="Password" className="w-full bg-transparent focus:outline-none" />
          </div>
            <label htmlFor="conpass">Confirm Password:</label>
           <div className="flex items-center border rounded px-3 py-2">
            <Lock className="mr-2" />
            <input type="password" id='conpass' placeholder="Confirm Password" className="w-full bg-transparent focus:outline-none" />
          </div>
          <Link to='/note'>
          <button type="submit" className="flex items-center justify-center w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-semibold">
            <UserPlus className="mr-2" /> Sign Up
          </button>
          </Link>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login" className="text-orange-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
