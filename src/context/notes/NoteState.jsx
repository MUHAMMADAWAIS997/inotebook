import NoteContext from "./noteContext";
import { useState } from "react";
import { toast } from "react-toastify";
const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  const path = 'http://localhost:3000/api/notes/'
  //fetch Alll NOtes
  const getNotes = async (token) => {
    try {
      const response = await fetch(`${path}getNotes`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'auth-token': token
        }
      })
      const data=await response.json()
      console.log(data)
      setNotes(data)

    } catch (err) {
      toast.error(err)
    }
  }
  // Add a note
  const addNote = async (note) => {
    try {
      const response = await fetch(`${path}addNote`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0ZTk0OGZkZjcyNmViZjg2NTc3NDQ4In0sImlhdCI6MTc0OTk4NDQyN30.BGHRUUex3NjAesjrcbvwHfhkqvDxAy86Dqy-Bzajyp0'
        },
        body: JSON.stringify(note)
      })
      let data=await response.json()
      setNotes(notes.concat(data))

    } catch (err) {
      toast.error(err)
    }
  }

  // Edit a note
  const editNote = async (id,note) => {
    try {
      const response = await fetch(`${path}updateNote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0ZTk0OGZkZjcyNmViZjg2NTc3NDQ4In0sImlhdCI6MTc0OTk4NDQyN30.BGHRUUex3NjAesjrcbvwHfhkqvDxAy86Dqy-Bzajyp0'
        },
        body: JSON.stringify(note)
      })
      let newNotes=JSON.parse(JSON.stringify(notes))
     for (let index = 0; index < newNotes.length; index++) {
      if(newNotes[index]._id==id){
        newNotes[index].title=note.title
        newNotes[index].description=note.description
        newNotes[index].tag=note.tag
        break
      }
      
     }
     setNotes(newNotes)

    } catch (err) {
      console.log(err)
    }

  }

  // delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${path}deleteNote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0ZTk0OGZkZjcyNmViZjg2NTc3NDQ4In0sImlhdCI6MTc0OTk4NDQyN30.BGHRUUex3NjAesjrcbvwHfhkqvDxAy86Dqy-Bzajyp0'
        },
       
      })
     

    } catch (err) {
      toast.error(err)
    }
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  return (
  <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
    {props.children}
  </NoteContext.Provider>
  )
}
export default NoteState