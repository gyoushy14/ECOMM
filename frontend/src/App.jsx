import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

import Cart from "./pages/Cart";
import Verify from "./pages/Verify";
import Myorders from "./pages/Myorders";
import { useState } from "react";
import Login from "./components/Login";
import Order from "./pages/Orders";

export default function App() {
  const [showLogin, setshowLogin] = useState(false);

  return (
    <BrowserRouter>
      {showLogin ? <Login setshowLogin={setshowLogin} /> : <></>}
      <Header setshowLogin={setshowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/myorders" element={<Myorders />} />


      </Routes>
    </BrowserRouter>
  )
}