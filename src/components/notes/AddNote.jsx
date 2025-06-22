import React, { useState, useContext } from 'react';
import { Plus, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeContext from '../../context/theme/themeContext';
import noteContext from '../../context/notes/noteContext';
import { toast } from 'react-toastify';
export default function AddNote() {
  const { darkMode } = useContext(ThemeContext);
  const { addNote } = useContext(noteContext)
  const [note, setNote] = useState({
    title: '',
    description: '',
    tag: ''
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.description || !note.title) {
      return toast.error('All feilds are required')
    }
    if(note.description.length<5||note.title.length<3){
      return toast.error('Title or Description is too small')
    }
    else {
      addNote(note)
      toast.success('Note added Successfully')
    }

    setNote({ title: '', description: '', tag: '' });
  };

  return (
    <div className={`min-h-screen p-20 ${darkMode ? 'bg-black/70 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`${darkMode ? 'bg-black/80 text-white' : 'bg-white text-black'} max-w-xl mx-auto   p-6  shadow-2xl`}>
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Note</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={note.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500 "
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              value={note.description}
              onChange={handleChange}
              required
              rows="4"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 outline-none"
            ></textarea>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tag" className="block text-sm font-medium mb-1">Tags <span className="text-gray-500 text-xs">(comma separated)</span></label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={handleChange}
              placeholder="e.g. work, urgent"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center gap-2 justify-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-md w-full transition"
          >
            <Plus size={18} /> Add Note
          </button>
        </form>
      </div>
      <Link to='/note'>
        <button
          className="fixed flex bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white p-1 rounded shadow-lg transition"
          aria-label="Add Note"
        >
          <ArrowLeft /> Go Back
        </button></Link>
    </div>
  );
}
