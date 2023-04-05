import { useState } from 'react'
import Navbar from './components/Navbar'
import Search from './components/Search'
import './styles/App.css'

function App() {
  

  return (
    <div className="flex flex-col justify-center">
      <Navbar />
      <Search />
      <h1>Hello</h1>
  
    </div>
  )
}

export default App
