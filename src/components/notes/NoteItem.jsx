import React, { useContext,useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2 } from 'lucide-react';

import ThemeContext from '../../context/theme/themeContext';
import Alert from '../Alert';
import noteContext from '../../context/notes/noteContext';
import { toast } from 'react-toastify';
export default function NoteItem(props) {
    const {darkMode}=useContext(ThemeContext)
    const {deleteNote}=useContext(noteContext)
    const [alert, setAlert] = useState(false);
    const DeleteNote=(id)=>{
        deleteNote(id)
       console.log("Note deleted")
       toast.success("Note deleted Sucessfully")
       setAlert(false)
    }
    const {id,title,description,tags,date}=props
  return (
    <>
      <div key={id}
            className={`${darkMode?'bg-black/80 text-white':'bg-white text-black'} w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2   p-4  shadow-xl hover:shadow-2xl transition`}
          >
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

              <p className="text-xs text-gray-500 dark:text-gray-400">Created on: {date}</p>
            </div>

            <div className="flex gap-2 mt-2 sm:mt-0">
              <Link to='/editnotes'>
              <button className="text-blue-500 hover:text-blue-700">
                <Edit size={20} />
              </button></Link>
              <button onClick={()=>setAlert(true)} className="text-red-500 hover:text-red-700">
                <Trash2 size={20} />
              </button>
            </div>
            
          </div>
          <Alert isOpen={alert}
          onClose={()=>setAlert(false)} 
          onConfirm={()=>DeleteNote(id)}
           message="This action cannot be undone. Are you sure?"
          />
    </>
  );
}
