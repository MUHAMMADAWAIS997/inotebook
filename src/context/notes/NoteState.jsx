import NoteContext from "./noteContext";
import { useState } from "react";
import { toast } from "react-toastify";
const NoteState = (props) => {
  const path = 'http://localhost:3000/api/notes/'
  const initialNotes = []
  //fetch Alll NOtes
  const getNotes = async () => {
    try {
      const response = await fetch(`${path}getNotes`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0ZTk0OGZkZjcyNmViZjg2NTc3NDQ4In0sImlhdCI6MTc0OTk4NDQyN30.BGHRUUex3NjAesjrcbvwHfhkqvDxAy86Dqy-Bzajyp0'
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
    setNotes(notes.concat(note))
  }

  // Edit a note
  const editNote = async (note,id) => {
    try {
      const response = await fetch(`${path}updateNote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0ZTk0OGZkZjcyNmViZjg2NTc3NDQ4In0sImlhdCI6MTc0OTk4NDQyN30.BGHRUUex3NjAesjrcbvwHfhkqvDxAy86Dqy-Bzajyp0'
        },
        body: JSON.stringify(note)
      })
      setNotes(response)

    } catch (err) {
      toast.error(err)
    }

  }

  // delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${path}getNotes`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0ZTk0OGZkZjcyNmViZjg2NTc3NDQ4In0sImlhdCI6MTc0OTk4NDQyN30.BGHRUUex3NjAesjrcbvwHfhkqvDxAy86Dqy-Bzajyp0'
        },
        body: JSON.stringify(data)
      })
      setNotes(response)

    } catch (err) {
      toast.error(err)
    }
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  const [notes, setNotes] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch(`${path}getNotes`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg0ZTk0OGZkZjcyNmViZjg2NTc3NDQ4In0sImlhdCI6MTc0OTk4NDQyN30.BGHRUUex3NjAesjrcbvwHfhkqvDxAy86Dqy-Bzajyp0'
        },
        body: JSON.stringify(data)
      })
      setNotes(response)

    } catch (err) {
      toast.error(err)
    }

  }

  return (<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
    {props.children}
  </NoteContext.Provider>
  )
}
export default NoteState