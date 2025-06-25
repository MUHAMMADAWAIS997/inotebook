import React, { useContext, useState, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import ThemeContext from '../../context/theme/themeContext';
import { useNavigate } from 'react-router-dom';
import Alert from '../Alert';
import noteContext from '../../context/notes/noteContext';
import { toast } from 'react-toastify';
import EditNote from './EditNote.jsx';
import AuthContext from '../../context/authentication/authContext.jsx';

export default function NoteItem(props) {
  const { darkMode } = useContext(ThemeContext);
  const { deleteNote } = useContext(noteContext);
  const [alert, setAlert] = useState(false);
  const [edit, setEdit] = useState(false);
  const { token, isAuthenticated } = useContext(AuthContext)
  const navigate = useNavigate()
  const DeleteNote = (id) => {
    deleteNote(id, token);
    toast.success('Note deleted successfully');
    setAlert(false);
  };
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      toast.error("Login Required")

    }
  }, [isAuthenticated]);
  const { id, title, description, tags, date } = props;

  return (
    <>
      <div key={id}
        className={`${darkMode ? 'bg-black/70 text-white' : 'bg-gray-100 text-gray-800'} flex items-center justify-center shadow-xl hover:shadow-2xl px-4`}>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm mt-1 mb-2">{description}</p>

          <div className="flex flex-wrap gap-2 text-sm mb-1">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full text-xs dark:bg-orange-800 dark:text-white"
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">Created on: {new Date(date).toLocaleDateString()}</p>
        </div>

        <div className="flex gap-2 mt-2 sm:mt-0">
          <button onClick={() => setEdit(true)} className="text-blue-500 hover:text-blue-700">
            <Edit size={20} />
          </button>
          <button onClick={() => setAlert(true)} className="text-red-500 hover:text-red-700">
            <Trash2 size={20} />
          </button>
        </div>
      </div>

      <Alert
        isOpen={alert}
        onClose={() => setAlert(false)}
        onConfirm={() => DeleteNote(id)}
        message="This action cannot be undone. Are you sure?"
      />

      <EditNote
        isOpen={edit}
        onClose={() => setEdit(false)}
        note={{ id, title, description, tags }}
      />
    </>
  );
}
