import React, { useContext, useState, useEffect } from 'react';
import { Save,ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeContext from '../../context/theme/themeContext';
export default function EditNote({ noteToEdit }) {
  const { darkMode } = useContext(ThemeContext);

  const [note, setNote] = useState({
    title: '',
    description: '',
    tags: '',
  });

  // Pre-fill data when editing
  useEffect(() => {
    if (noteToEdit) {
      setNote({
        title: noteToEdit.title,
        description: noteToEdit.description,
        tags: noteToEdit.tags.join(', ')
      });
    }
  }, [noteToEdit]);

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formattedTags = note.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const updatedNote = {
      ...noteToEdit,
      ...note,
      tags: formattedTags,
      updatedAt: new Date().toISOString()
    };
    console.log("Updated Note:", updatedNote);
    alert("Note Updated!");
  };

  return (
     <div className={`min-h-screen p-20 ${darkMode ? 'bg-black/70 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`${darkMode?'bg-black/80 text-white':'bg-white text-black'} max-w-xl mx-auto   p-6  shadow-2xl`}>
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Note</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
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
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 "
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
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 "
            ></textarea>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">Tags <span className="text-gray-500 text-xs">(comma separated)</span></label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={note.tags}
              onChange={handleChange}
              placeholder="e.g. personal, work"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center gap-2 justify-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-md w-full transition"
          >
            <Save size={18} /> Update Note
          </button>
        </form>
      </div>
       <Link to='/note'>
      <button
        className="fixed flex bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white p-1 rounded shadow-lg transition"
        aria-label="Edit Note"
      >
       <ArrowLeft/> Go Back
      </button></Link>
    </div>
  );
}
