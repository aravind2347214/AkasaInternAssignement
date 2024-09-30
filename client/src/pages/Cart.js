import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { dummyUser } from '../data/data'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetailsFromToken } from '../services/authServices'
import * as authActions from "../redux/actions";
import { getUserById } from '../services/userServices'
import { removeItemFromCartById } from '../services/userServices'; // Add this import
import Loader from '../components/Loader'
import APIResponseStatus from '../components/APIResponseStatus'
import { FruitBasket } from '../assets/Icons'
import { Cancel } from '@mui/icons-material'
import { Tooltip } from '@mui/material'


function Cart() {

  const navigate = useNavigate();
  const dispatch =  useDispatch()
  const [rerender, setRerender] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [pageLoading, setPageLoading] = useState("not-loaded");

  const myProfiledata = useSelector(
    (state) => state.authReducer.myUserProfile
  );

  const getMyProfileData = async (myUserId) => {
    await getUserById(myUserId)
      .then((res) => {
        if (res.code === "ERR_NETWORK") {
          setNetworkError(true);
          console.error("NETWORK ERROR ");
          setPageLoading("error");
        } else {
          setPageLoading("loaded");
          dispatch(authActions.loginAction(res));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const existingUser = getUserDetailsFromToken();

    if (existingUser?._id) {
      getMyProfileData(existingUser._id);
    } else {
      navigate("/login");
      setPageLoading("loaded");
    }
  }, [rerender]);

  console.log("cartdata",myProfiledata)
  
  // Calculate the total price
  const calculateTotalPrice = () => {
    return myProfiledata?.cart?.reduce((total, orderItem) => {
      return total + (orderItem?.price || 0);
    }, 0);
  };

  // Handle item removal from the cart
  const handleRemoveItem = async (itemId) => {
    const userId = getUserDetailsFromToken()?._id;
    if (userId && itemId) {
      const removeResult = await removeItemFromCartById(userId, itemId);
      if (removeResult?.removeSuccess) {
        // After removing the item, fetch the updated user data
        getMyProfileData(userId);
      } else {
        console.error("Failed to remove the item from the cart");
      }
    }
  };

  const handlePayandProceed=()=>{
    navigate("/order");
  }

  return (
    <>
     {pageLoading === "loaded" ? (
         <div className='flex flex-col min-h-[100vh]'>
         <Navbar myProfiledata={myProfiledata} page="cart"/>
         <div
           data-aos="fade-up"
            data-aos-duration="1000"
         className="flex flex-col flex-1 mt-10">
           <div className='w-[90%] md:w-[60%] mx-auto'>
           <div className='font-black text-[50px] text-left text-orange w-full'>
             Your Cart
           </div>
           {myProfiledata?.cart?.length > 0 ? (
             <>
             <div className="p-4 ">
              <div className='flex flex-col max-h-[300px] p-1 overflow-y-auto gap-2 rounded-[4px]'>
               {myProfiledata?.cart?.map((orderItem, index) => (
                   <div key={index} className="hover:bg-gray-200 rounded-[4px] p-2 flex flex-row items-center gap-2">
                       <div className='flex flex-row items-center justify-between flex-1'>
                         <div className="flex flex-row items-center">
                           <img src={`${orderItem?.image}`} alt={orderItem?.name} className="w-[40px] h-[40px] aspect-auto mr-4 rounded-[4px]" />
                           <div>
                               <div className="font-bold text-[16px] text-gray-500">{orderItem?.name}</div>
                           </div>
                       </div>
                       <div className="font-bold text-orange">${orderItem?.price}</div>
                       </div>
                       {/* Remove item from cart button */}
                       <Tooltip title="Remove Item">
                        <button className='text-orange ml-[20px]' onClick={() => handleRemoveItem(orderItem._id)}>
                          <Cancel/>
                        </button>
                       </Tooltip>
                   </div>
               ))}
              </div>
              <div className="mt-4 flex flex-row bg-[#4d11b52b] rounded-[4px] border-t-[2px] border-gray-200 justify-between items-center px-4 py-1">
                 <div className=" font-bold text-[20px]  text-purple">
                   Total Amount
                 </div>
                 <div className='text-purple font-bold text-[24px]'>${calculateTotalPrice().toFixed(2)}</div>
               </div>
           </div>

           <div className='flex justify-center w-full mt-10'>
             <button onClick={handlePayandProceed} className="bg-orange text-[#fff] font-bold py-2 px-4 rounded-[4px] hover:bg-orange-700">Pay and Proceed</button>
           </div>
            
            </>
           ) : (
            <div className="p-4 text-center">
              <div className='flex flex-col justify-center'>
                <div className='flex justify-center opacity-50 grayscale'>
                <FruitBasket/>
                </div>
              <p className="col-span-4 font-semibold text-center text-gray-400">
                Your Cart is empty
              </p>
              </div>
            </div>
           )}
           </div>
         </div>
         <Footer/>
       </div>
     ) : pageLoading === "not-loaded" ? (
       <div className="w-[100vw] h-[100vh] flex justify-center items-center">
         <div className="flex justify-center text-[16px] font-light flex-col ">
           <Loader />
         </div>
       </div>
     ) : (
       <div className="flex items-center justify-center flex-1 w-full h-[100vh]">
         <APIResponseStatus
           status={false}
           message={`${networkError ? "Network Error" : "An Error Occured"}`}
         />
       </div>
     )}
    </>
  )
}

export default Cart;
