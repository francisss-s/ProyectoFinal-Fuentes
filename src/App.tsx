import React from 'react'
import NavBar from './components/NavBar'
import ItemListContainer from './components/ItemListContainer'  
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer texto='Esto es un contenedor de items'/>
      <Footer/>
    </>
  )
}

export default App
