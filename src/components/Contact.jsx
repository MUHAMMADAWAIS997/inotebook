import {useContext} from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';
import ThemeContext from '../context/theme/themeContext';

export default function Contact() {
    const {darkMode}=useContext(ThemeContext)

  return (
    <div className={`bg-[url("./assets/home.jpg")] bg-no-repeat bg-cover  pt-16 min-h-screen px-4`}>
      <div className={`text-center ${darkMode ? 'bg-black/80 text-white' : ' text-gray-900 bg-white/80'} max-w-4xl mx-auto mt-5 p-10`}>
        <h1 className="text-4xl font-bold text-orange-600 mb-4">📞 Contact Us</h1>
        <p className="mb-6 text-lg">
          Got a question, suggestion, or facing any issues? We’re here to help! 💬
        </p>

        <form className="grid gap-4">
          <div className="flex items-center border rounded px-3 py-2">
            <Mail className="mr-2" />
            <input type="email" placeholder="Your Email" className="w-full bg-transparent focus:outline-none" />
          </div>
          <div className="flex items-center border rounded px-3 py-2">
            <MessageCircle className="mr-2" />
            <textarea placeholder="Your Message" rows={4} className="w-full bg-transparent focus:outline-none"></textarea>
          </div>
          <button className="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-semibold">
            Send Message
          </button>
        </form>

        <div className="mt-8 text-sm text-gray-400 dark:text-gray-600">
          <Phone className="inline w-4 h-4 mr-1" /> +92 305 2808851
        </div>
      </div>
    </div>
  );
}
