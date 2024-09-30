import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart'
import Order from './pages/Order'
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import SingleItem from './pages/SingleItem';
import "aos/dist/aos.css"
import AOS from "aos";
import { useEffect } from 'react';

function App() {
  useEffect(()=>{
    AOS.init();
  },[])
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={<Order/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/item' element={<SingleItem/>}/>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
