import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const notesInitial=[
  {
    "_id": "684fab0eaaad946ea25390e0",
    "user": "684e948fdf726ebf86577448",
    "title": "Songs",
    "description": "song1 and song 2",
    "tag": "personal",
    "date": "2025-06-16T05:26:38.726Z",
    "__v": 0
  },
  {
    "_id": "6853979502cb90b69705a9ab",
    "user": "684e948fdf726ebf86577448",
    "title": "Hello",
    "description": "I am 2nd note",
    "tag": "today",
    "date": "2025-06-19T04:52:37.282Z",
    "__v": 0
  },
  {
    "_id": "68539cc302cb90b69705a9ae",
    "user": "684e948fdf726ebf86577448",
    "title": "shoping List",
    "description": "fruits, oil, brush,paint,oil and vegetables",
    "tag": "grocery",
    "date": "2025-06-19T05:14:43.237Z",
    "__v": 0
  }
];
// Add a note
const addNote=(note)=>{
  setNotes(notes.concat(note))
}

// Edit a note
const editNote=()=>{

}

// delete a note
const deleteNote=(id)=>{
  const newNotes=notes.filter((note)=>{return note._id!==id})
  setNotes(newNotes)
}

 const [notes, setNotes] = useState(notesInitial);
    return(<NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
        {props.children}
    </NoteContext.Provider>
)
}    
export default NoteState