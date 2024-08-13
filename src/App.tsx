import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ContactPage from './pages/ContactPage/ContactPage';
import Footer from './components/Footer/Footer';
import ItemDetails from './components/ItemDetails/ItemDetails';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import NavBar from './components/NavBar';

// import React from 'react';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<ItemListContainer />} />
        <Route path='/contacto' element={<ContactPage />} />
        <Route path='/categoria/:category' element={<ItemListContainer />} /> 
        <Route path='/detalle/:id' element={<ItemDetails />} />
        <Route path='/*' element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
