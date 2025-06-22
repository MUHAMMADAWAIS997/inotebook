import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Contact from './components/Contact';
import Notes from './components/notes/Note'
import NoteState from './context/notes/NoteState';
import ThemeState from './context/theme/themeState';
import AddNote from './components/notes/AddNote';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <>
    <ThemeState>
      <NoteState>
        <Router>
          <Navbar />

          <Routes>
            <Route path='/' element={<Home  />}></Route>
            <Route path='/login' element={<Login  />}></Route>
            <Route path='/signup' element={<Signup  />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/contact' element={<Contact  />}></Route>
            <Route path='/note' element={<Notes/>}></Route>
            <Route path='/addnotes' element={<AddNote/>}></Route>

          </Routes>
          <ToastContainer position='top-right' autoClose={'3000'}/>
        </Router>
      </NoteState>
      </ThemeState>
    </>
  )
}

export default App
