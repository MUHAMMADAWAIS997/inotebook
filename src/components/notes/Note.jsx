import React, { useContext } from 'react';
import {Plus } from 'lucide-react';
import ThemeContext from '../../context/theme/themeContext';
import { Link } from 'react-router-dom';
import noteContext from '../../context/notes/noteContext';
import NoteItem from './NoteItem';
export default function Notes() {
const {notes}=useContext(noteContext)


  const { darkMode } = useContext(ThemeContext);
  const separateTag=(tags)=>{
    let tag=[];
    return tag=tags.split(',')
  }

  return (
    <div className={`p-2 min-h-screen ${darkMode ? 'bg-black/70 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <h1 className="text-3xl font-bold mb-6 text-center">Your Notes</h1>

      <div className="flex flex-col gap-4">
        {notes.map((note,idx) => (
          <NoteItem key={note._id}
          id={note._id}
          title={note.title} description={note.description} 
          tags={separateTag(note.tag)}
          date={note.date}
          />
        ))}
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
