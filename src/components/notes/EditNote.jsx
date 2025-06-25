import React, { useState, useContext, useEffect } from 'react';
import { X, Edit } from 'lucide-react';
import noteContext from '../../context/notes/noteContext';
import ThemeContext from '../../context/theme/themeContext';
import { toast } from 'react-toastify';
import AuthContext from '../../context/authentication/authContext';
import { useNavigate } from 'react-router-dom';
export default function EditNote({ isOpen, onClose, note }) {
  const { darkMode } = useContext(ThemeContext);
  const { editNote } = useContext(noteContext);
  const { token, isAuthenticated } = useContext(AuthContext)
  const navigate=useNavigate()
  const [updatedNote, setUpdatedNote] = useState({ title: '', description: '', tag: '' });
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      toast.error("Login Required")

    }
  }, [isAuthenticated]);
  useEffect(() => {
    if (note) {
      setUpdatedNote({
        title: note.title,
        description: note.description,
        tag: note.tags.join(', ')
      });
    }
  }, [note]);

  const handleChange = (e) => {
    setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!updatedNote.title || !updatedNote.description) {
      return toast.error("All fields are required");
    }
    if (updatedNote.description.length < 5 || updatedNote.title.length < 3) {
      return toast.error(" Title or description is too small")
    }
    editNote(note.id,token, updatedNote);

    toast.success("Note updated successfully");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="min-h-screen p-10 md:p-20 fixed inset-0 bg-black/70 flex justify-center z-50 ">
      <div className={`${darkMode ? 'bg-black/80 text-white' : 'bg-white text-black'} w-full max-w-2xl px-4 md:px-10 pt-5 shadow-2xl`}>
        <button
          className="absolute top-2 right-2 text-white hover:text-red-500"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-orange-600">Edit Note</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={updatedNote.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500"
          />
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>

          <textarea
            name="description"
            value={updatedNote.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500"
          />
          <label htmlFor="tag" className="block text-sm font-medium mb-1">Tags <span className="text-gray-500 text-xs">(comma separated)</span></label>

          <input
            type="text"
            name="tag"
            value={updatedNote.tag}
            onChange={handleChange}
            placeholder="Tags (comma-separated)"
            className="w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="flex items-center gap-2 justify-center bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-md w-full transition"
          ><Edit />
            Update Note
          </button>
        </form>
      </div>
    </div>
  );
}
