import React, { useContext } from 'react';
import ThemeContext from '../context/theme/themeContext';
export default function About() {
    const {darkMode}=useContext(ThemeContext)
    return (
        <>
        
        <section id="about" className={`bg-[url("./assets/home.jpg")] bg-no-repeat bg-cover ${darkMode ? ' text-white' : ' text-black'} mt-5 py-16 text-center`}>
            <div className={`${darkMode ? 'bg-black/80 text-white' : 'bg-black/80 text-white'} text-center  max-w-6xl justify-self-center rounded-2xl`}>
                <h1 className="text-4xl sm:text-5xl font-bold text-orange-600 mb-6">📘 About iNote-Book</h1>
                <p className="text-lg mb-2 ">
                    iNote-Book is your intelligent note-taking companion. It's designed to help you securely write, save, and manage your daily notes, ideas, and tasks.
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 pb-3"> Fetures we are providing:</h1>
                <div className={` pt-5 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 rounded-2xl`}>

                {/* Feature 1 */}
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100 text-black'} text-center p-6 shadow-md rounded-lg`}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1029/1029183.png" alt="Create Notes" className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Organized Notes</h3>
                    <p>Quickly write your ideas, tasks, or reminders with a fast and clean interface. You can categorize your thoughts effortlessly 🗂️</p>
                </div>

                {/* Feature 2 */}
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100 text-black'} text-center p-6 shadow-md rounded-lg`}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1250/1250689.png" alt="Edit Notes" className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Edit Notes Anytime</h3>
                    <p>Update or improve your notes anytime, from any device and keep your notes updated 📝</p>
                </div>

                {/* Feature 3 */}
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100 text-black'} text-center p-6 shadow-md rounded-lg`}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete Notes" className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Delete unnecessary Notes</h3>
                    <p>Clear out old or unnecessary notes with one click to stay organized.</p>
                </div>

                {/* Feature 4 */}
                <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-100 text-black'} text-center p-6 shadow-md rounded-lg mb-3`}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1251/1251061.png" alt="Save Notes" className="w-20 h-20 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Save Securely and Access Anywhere</h3>
                    <p>All your data is encrypted and stored securely so you never lose your notes. Notes are stored in the cloud ☁️</p>
                </div>

                

            </div>
            </div>

            
            
        </section>
        <footer className="bg-gray-800 text-center py-6 text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} iNote-Book — All rights reserved.
      </footer>
        </>

    );
}
