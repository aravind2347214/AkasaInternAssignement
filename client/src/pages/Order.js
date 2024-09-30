import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { getUserById } from '../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as authActions from '../redux/actions';
import { getUserDetailsFromToken } from '../services/authServices';
import Loader from '../components/Loader';
import APIResponseStatus from '../components/APIResponseStatus';
import { Tooltip } from '@mui/material';
import { FruitBasket } from '../assets/Icons';
import { placeOrder } from '../services/orderServices'; // import the placeOrder API

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [rerender, setRerender] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [pageLoading, setPageLoading] = useState("not-loaded");
  const [checkoutStatus, setCheckoutStatus] = useState(null); // Add this state to handle API response

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

  console.log("cartdata", myProfiledata);

  // Calculate the total price
  const calculateTotalPrice = () => {
    return myProfiledata?.cart?.reduce((total, orderItem) => {
      return total + (orderItem?.price || 0) * (orderItem?.quantity || 1);
    }, 0);
  };

  const handleOrder = async () => {
    const existingUser = getUserDetailsFromToken();
    if (!existingUser?._id) {
      navigate("/login");
      return;
    }

    setCheckoutStatus("loading"); // Show loading state while placing the order

    try {
      const response = await placeOrder(existingUser._id);
      if (response.status === 200) {
        // Handle successful checkout
        setCheckoutStatus("success");
        
         // Clear cart after success
      } else {
        setCheckoutStatus("error");
      }
    } catch (error) {
      console.error("Checkout Error: ", error);
      setCheckoutStatus("error");
    }
  };

  return (
    <>
      {pageLoading === "loaded" ? (
        <div className='flex flex-col min-h-[100vh]'>
          <Navbar myProfiledata={myProfiledata} page="cart" />
          <div
         
          className="flex flex-col flex-1 mt-10">
            <div
               data-aos="fade-up"
            data-aos-duration="1000"
            className="w-[60%] mx-auto">
              <div className="font-black text-[50px] text-left text-orange w-full">
                Your Order
              </div>
              {myProfiledata?.cart?.length > 0 ? (
                <>
                  <div className="p-4 ">
                    <div className="flex flex-col max-h-[300px] p-1 overflow-y-auto gap-2 rounded-[4px]">
                      {myProfiledata?.cart?.map((orderItem, index) => (
                        <div
                          key={index}
                          className="hover:bg-gray-200 rounded-[4px] p-2 flex flex-row items-center gap-2"
                        >
                          <div className="flex flex-row items-center justify-between flex-1">
                            <div className="flex flex-row items-center">
                              <img
                                src={`${orderItem?.image}`}
                                alt={orderItem?.name}
                                className="w-[40px] h-[40px] aspect-auto mr-4 rounded-[4px]"
                              />
                              <div>
                                <div className="font-bold text-[16px] text-gray-500">
                                  {orderItem?.name}
                                </div>
                              </div>
                            </div>
                            <div className="font-bold text-orange">
                              ${orderItem?.price}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-row border-t-[2px] bg-[#4d11b52b] rounded-[4px]  border-gray-200 justify-between items-center px-4 py-1">
                      <div className="font-bold text-[20px] text-purple">Total Amount</div>
                      <div className="text-purple font-bold text-[24px]">
                        ${calculateTotalPrice().toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center w-full mt-10">
                    <button
                      onClick={handleOrder}
                      className="bg-orange text-[#fff] font-bold py-2 px-4 rounded-[4px] hover:bg-orange-700"
                    >
                      {checkoutStatus === "loading" ? "Processing..." : "Confirm Order"}
                    </button>
                  </div>

                  {/* Display success or error message */}
                  {checkoutStatus === "success" && (
                    <div className="mt-4 font-semibold text-center text-green-500">
                      Order placed successfully!
                    </div>
                  )}
                  {checkoutStatus === "error" && (
                    <div className="mt-4 font-semibold text-center text-purple">
                      Error in placing the order. Please try again.
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 text-center">
                  <div className="flex flex-col justify-center">
                    <div className="flex justify-center opacity-50 grayscale">
                      <FruitBasket />
                    </div>
                    <p className="col-span-4 font-semibold text-center text-gray-400">
                      Your Cart is empty
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Footer />
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
            message={`${networkError ? "Network Error" : "An Error Occurred"}`}
          />
        </div>
      )}
    </>
  );
}

export default Order;
