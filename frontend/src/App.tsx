//import { useState } from 'react'
import UserPosts from './pages/posts';
import UsersTable from './pages/users'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import './App.css'

function App() {

  return (

     <Router>
      <Routes>
        <Route path="/" element={<UsersTable />} />
        <Route path="/users/:id" element={<UserPosts />} />
      </Routes>
    </Router>
  )
}

export default App
