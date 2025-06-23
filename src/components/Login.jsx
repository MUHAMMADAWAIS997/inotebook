import { useContext,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, Notebook ,Eye,EyeOff} from 'lucide-react';
import ThemeContext from '../context/theme/themeContext';
import { toast } from 'react-toastify';
import AuthContext from '../context/authentication/authContext';

export default function Login() {
  const navigate=useNavigate()
  const { darkMode } = useContext(ThemeContext)
  const {login} = useContext(AuthContext);
  const [data, setData] = useState({ email: "", password: ""});
  const handleChange= (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const [showPass, setShowPass] = useState(false);
  const togglePass=()=>{
    setShowPass(!showPass)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
   
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method:'POST',
        headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify(data)
      })
      const json = await res.json()
      if (res.ok) {
        login(json.token)
        toast.success('Logged in successfully')
        navigate('/note')
    } else {
      toast.error(json.error);
    }
    setData({email:'',password:''})
    }
    catch (err) {
      toast.error(err)
    }
  }
  return (
    <div className={`bg-[url("./assets/home.jpg")] bg-no-repeat bg-cover ${darkMode ? ' text-white' : ' text-gray-900'} pt-16 min-h-screen flex items-center justify-center px-4`}>
      <div className={`${darkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-gray-900'} p-8 rounded-2xl  w-full max-w-sm`}>
        <p className='flex justify-self-center text-orange-600 text-2xl font-bold'><Notebook size={30} /> iNoteBook</p>
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="email">Enter your Email:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <Mail className="mr-2" />
            <input
              type="email"
              name='email'
              required
              placeholder="Email"
              onChange={handleChange}
              value={data.email}
              className="w-full bg-transparent focus:outline-none"
            />
            
          </div>
          <label htmlFor="password">Enter Password:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <Lock className="mr-2" />
            <input
            

              type={showPass?"text":"password" }
              name='password'
             required
              placeholder="Password"
              onChange={handleChange}
               value={data.password}
              className="w-full bg-transparent focus:outline-none"
            />
            
            <span onClick={togglePass}>{showPass?<Eye />:<EyeOff/>}</span>
          </div>
          <div className="text-right text-sm">
            <Link to="/forgot" className="text-orange-500 hover:underline">Forgot password?</Link>
          </div>
          
            <button type="submit"  className="flex items-center justify-center w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-semibold">
              <LogIn className="mr-2" /> Login
            </button>
       
        </form>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-orange-500 hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
