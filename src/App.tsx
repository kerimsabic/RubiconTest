import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Home } from './Pages'
import { Route, Routes } from 'react-router-dom'
import { MovieProvider } from './context/MovieContext'
import Details from './Pages/Details'

function App() {


  return (
    <>
      <MovieProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="/details/:type/:id" element={<Details />} />


        </Routes>
      </MovieProvider>

    </>
  )
}

export default App
