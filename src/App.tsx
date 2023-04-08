import { useState } from 'react'
import Navbar from './components/Navbar'
import Search from './components/Search'
import './styles/App.css'

function App() {
  

  return (
    <div className="flex flex-col justify-center mx-6">
      <Navbar />
      <Search />
  
    </div>
  )
}

export default App
