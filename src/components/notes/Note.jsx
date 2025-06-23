import React, { useContext, useEffect } from 'react';
import {Plus } from 'lucide-react';
import ThemeContext from '../../context/theme/themeContext';
import { Link, useNavigate } from 'react-router-dom';
import noteContext from '../../context/notes/noteContext';
import NoteItem from './NoteItem';
import AuthContext from '../../context/authentication/authContext';
import { toast } from 'react-toastify';
export default function Notes() {
  const {token,isAuthenticated} = useContext(AuthContext);
const {notes,getNotes}=useContext(noteContext)
const navigate=useNavigate()
  useEffect(() => {
    getNotes(token)
  }, []);
  useEffect(() => {
    if(!isAuthenticated){
      navigate('/login')
      toast.error("Login Required")

    }
  }, [isAuthenticated]);


  const { darkMode } = useContext(ThemeContext);
  const separateTag=(tags)=>{
    let tag=[];
    return tag=tags.split(',')
  }

  return (
    <div className={`p-2 min-h-screen ${darkMode ? 'bg-black/70 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">Your Notes</h1>
      <div className="flex flex-col gap-4">
     
        {Array.isArray(notes) && notes.length > 0 ? (
          
      notes.map((note) => (
        
        <NoteItem
          key={note._id}
          id={note._id}
          title={note.title}
          description={note.description}
          tags={separateTag(note.tag)}
          date={note.date}
        />
      ))
    ) : (
      <p className="text-center text-lg text-gray-500 dark:text-gray-400">
        📝 You haven't created any notes yet.
      </p>
    )}
      </div>

      {/* Floating Add Button */}
      <Link to='/addnotes'>
      <button
        className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-full shadow-lg transition"
        aria-label="Add Note"
      >
        <Plus />
      </button></Link>
    </div>
  );
}
