import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import BookSearchee from '../components/BookSearchee.jsx'
import Sidebar from '../components/dashbord.jsx'
import Adding from '../components/Adding.jsx';

function App() {
  

  const sidebarWidthClass = 'w-60' // 15rem ~ 240px

  return (
    <BrowserRouter>
      <div className="flex">
        <div className={`fixed left-0 top-0 h-screen ${sidebarWidthClass} overflow-y-auto`}>
          <Sidebar />
        </div>

        <div className={`ml-60 flex-1 min-h-screen`}>
          <Routes>
            <Route path="/Books" element={<BookSearchee />} />
            <Route path= '/add-book' element={<Adding />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
