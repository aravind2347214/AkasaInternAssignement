import React, { useState, useEffect, useDebugValue } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom'; // For redirecting after logout
import { getUserDetails, getUserDetailsFromToken, logoutUser } from '../services/authServices'; // Mock API service to get user data
import { dummyUser } from '../data/data';
import { Tooltip } from '@mui/material';
import LogoutModal from '../modals/LogoutModal';
import OrderHistoryModal from '../modals/OrderHistoryModal';
import * as authActions from "../redux/actions";
import { getUserById } from '../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import APIResponseStatus from '../components/APIResponseStatus';
import Loader from '../components/Loader';


function Profile() {
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
        // console.log("in TASKPAGE RETURNED TASK ",res.code);
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
    // console.log("EXISITING USER ID : ",existingUser)

    if (existingUser?._id) {
      getMyProfileData(existingUser._id);


    } else {
      navigate("/login");
      setPageLoading("loaded");
    }
  }, [rerender]);

  const [logoutModal,setLogoutModal] = useState(false)
  const [orderModal,setOrderModal] = useState({isOpen:false,orderData:null})

  console.log("PROFILE",myProfiledata)

  return (
    <>
     {pageLoading === "loaded"?
    <div className='flex flex-col min-h-[100vh]'>
      <Navbar myProfiledata={myProfiledata} page="profile" />
      <div className="flex flex-col items-center flex-1 mt-10">
        {myProfiledata?._id ? (
          <div className="w-[85%] relative flex-1">
            {/* Profile Header */}
            <div 
            data-aos="fade-up"
            data-aos-duration="1000"
            className="flex flex-row justify-between mb-6 ">
              <div>
              <h1 className="text-[50px] font-black text-orange">{myProfiledata.fullName}</h1>
              <p className="mt-2 text-gray-600">{myProfiledata.email}</p>
              </div>
              <button
                onClick={(e)=>setLogoutModal(true)}
                className="mt-4 px-4 py-2 max-h-fit  text-orange font-bold rounded-[4px] hover:bg-gray-200"
              >
                Logout
              </button>
            </div>

            {/* Order History Section */}
            <div 
              data-aos="fade-up"
            data-aos-duration="1000"
            className="my-8">
              <h2 className="text-2xl font-bold text-orange ">Order History</h2>
              {myProfiledata.orderHistory.length > 0 ? (
                <div className="flex-col gap-2 w-[50%]">
                  {myProfiledata?.orderHistory.map((order, index) => (
                    <Tooltip arrow title="View Order" placement='bottom' >
                    <div 
                    onClick={(e)=>setOrderModal({isOpen:true,orderData:order})}
                     key={index} className=" rounded-r-[4px] px-4 border-l-[5px]  border-orange py-1 cursor-pointer mt-3 hover:bg-gray-100 flex flex-row justify-between items-center">
                      <h3 className="text-[14px] text-gray-500 font-bold">On {new Date(order.date).toLocaleDateString()}</h3>
                      <p className="text-[12px] text-gray-600 ">Total: <span className='text-lg font-bold text-orange'>${order.total}</span></p>
                    </div>
                    </Tooltip>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-gray-400">You have no previous orders.</p>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">Loading user details...</p>
        )}
      </div>
      <Footer />
      {logoutModal&&
    <LogoutModal
    setLogoutModal={setLogoutModal}
    />
    }
    {
      orderModal.isOpen&&
      <OrderHistoryModal orderData={orderModal.orderData} setOrderModal={setOrderModal}/>
    }
    </div>
    :
    pageLoading === "not-loaded" ? (
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
  );
}

export default Profile;
