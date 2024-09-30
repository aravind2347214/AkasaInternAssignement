import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle, Search, ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { FruitLogo } from '../assets/Icons';

function Navbar({ onSearch ,page,myProfiledata}) {
  

  console.log("PROFILEEE",myProfiledata)
  
  return (
    <div
    data-aos="fade-up"
    data-aos-duration="1000"
    className="min-h-[50px] m-2 rounded-[8px] mx-auto px-[10px] md:px-[30px] py-[10px] justify-end md:justify-between w-[98%] bg-orange flex flex-row items-center">
      <Link to="/" className="flex-row items-center hidden md:flex">
        <div className="text-[#fff]  items-center flex mt-[3px] scale-90 mb-2 p-1 rounded-[4px] ">
          {/* <MenuIcon sx={{ fontSize: 35 }} /> */}
          <FruitLogo/>
        </div>
        <div className="text-[30px] font-black ">
          <span className="text-[#fff]">Fresh</span>
          <span className="text-purple">Mart</span>
        </div>
      </Link>
      {
        page === 'home' ? (
      <div className="flex flex-1">
        <div className="items-center w-[75%] flex text-[#161616] bg-[#ffffff] mx-auto outline-none px-4 py-2 pl-[25px] rounded-full">
          <input
            className="flex-1 outline-none text-gray-500 text-[14px]"
            placeholder="Search for Groceries, Vegetable and More"
            onChange={onSearch} // Attach the search handler here
          />
          <div className="text-orange">
            <Search sx={{ fontSize: 25 }} />
          </div>
        </div>
      </div>
        ):null
      }

      <div className="flex flex-row items-center gap-[10px]">

      <Link
          to="/cart"
          className={`relative w-[40px] h-[40px] p-1 rounded-full
            border-[#fff]
            hover:border-2 hover:shadow-md
            ${page === "cart" ? "bg-[#fff] text-orange" : "bg-[#ffffff4a] text-[#fff]"}
            flex items-center justify-center`}
        >
          <ShoppingCart sx={{ fontSize: 20 }} />
          {/* Bubble displaying cart length */}
          {myProfiledata?.cart && myProfiledata?.cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-purple text-white text-[10px] font-bold rounded-full w-[18px] h-[18px] flex items-center justify-center">
              {myProfiledata?.cart.length}
            </span>
          )}
        </Link>
        <Link to="/profile" 
 className={`w-[40px] h-[40px] p-1 rounded-full
   border-[#fff]
          hover:border-2 hover:shadow-md
  ${page==="profile"?"  bg-[#fff] text-orange ":"bg-[#ffffff4a] text-[#fff]"} 
     flex items-center justify-center`}        >
          
          <AccountCircle sx={{ fontSize: 30 }} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
