import { useContext ,useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, UserPlus, Notebook,Eye,EyeOff } from 'lucide-react';
import ThemeContext from '../context/theme/themeContext';
import { toast } from 'react-toastify';

export default function Signup() {
  const navigate=useNavigate()
  const [data, setData] = useState({ name: '', email: '', password: '' });
  const [conPass,setConPass]=useState('')
   const [showPass, setShowPass] = useState(false);
    const togglePass=()=>{
      setShowPass(!showPass)
    }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
     if(data.name.length<3){
      return toast.error('Name is too short')
    }
    if(data.password.length<8){
      return toast.error('Password must be 8 Characters long')
    }
    if(data.password!==conPass){
      return toast.error('Both Passwords should be same')
      
    }
    try {
      const res = await fetch('http://localhost:3000/api/auth/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(data)

      })
      const json = await res.json()
      if (res.ok) {
      localStorage.setItem('token', json.token);
        toast.success('User created successfully')
        setData({name:'',email:'',password:''})
        navigate('/notes')
      }
      else {
        toast.error(json.error)
      }
      
    } catch (error) {
      toast.error(error)
    }

  }
  const { darkMode } = useContext(ThemeContext)

  return (
    <div className={`bg-[url("./assets/home.jpg")] bg-no-repeat bg-cover ${darkMode ? ' text-white' : ' text-gray-900'} pt-20 min-h-screen flex items-center justify-center px-4`}>
      <div className={`${darkMode ? 'bg-black/80 text-white' : 'bg-white/80 text-gray-900'} p-8 rounded-2xl  w-full max-w-sm`}>
        <p className='flex justify-self-center text-orange-600 text-2xl font-bold'><Notebook size={30} /> iNoteBook</p>

        <h2 className="text-2xl font-bold mb-6 text-center text-orange-600">Create a new Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="name">Enter your Name:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <User className="mr-2" />
            <input type="text" id='name' name='name' value={data.name} onChange={handleChange} placeholder="Full Name" className="w-full bg-transparent focus:outline-none" />
          </div>
          <label htmlFor="email">Enter your Email:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <Mail className="mr-2" />
            <input type="email" id='email' name='email' value={data.email} onChange={handleChange} placeholder="Email" className="w-full bg-transparent focus:outline-none" />
          </div>
          <label htmlFor="pass">Enter Password:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <Lock className="mr-2" />
            <input type={showPass?"text":"password"} id='pass' name='password' value={data.password} onChange={handleChange} placeholder="Password" className="w-full bg-transparent focus:outline-none" />
            <span onClick={togglePass}>{showPass?<Eye/>:<EyeOff/>}</span>
          </div>
          <label htmlFor="conpass">Confirm Password:</label>
          <div className="flex items-center border rounded px-3 py-2">
            <Lock className="mr-2" />
            <input type="text" id='conpass' name='confirmPassword' onChange={(e)=>{
      setConPass(e.target.value)
            }}  placeholder="Confirm Password" className="w-full bg-transparent focus:outline-none" />
          </div>
            <button type="submit" className="flex items-center justify-center w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-semibold">
              <UserPlus className="mr-2" /> Sign Up
            </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login" className="text-orange-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
