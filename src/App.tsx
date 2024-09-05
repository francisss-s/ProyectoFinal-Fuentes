// src/App.tsx

import { CartProvider } from "./context/CartContext";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <CartProvider>
      <Header />
      <Outlet />
      <Footer />
    </CartProvider>
  );
};

export default App;
