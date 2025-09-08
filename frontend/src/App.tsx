//import { useState } from 'react'
import UserPosts from './pages/posts';
import UsersTable from './pages/users'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//import './App.css'

function App() {

  return (

     <Router>

      <Routes>
        <Route path="/" element={<UsersTable />} />
        <Route path="/users/:id" element={<UserPosts />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '8px',
            padding: '12px',
          },
        }}
      />
      
    </Router>
  )
}

export default App
