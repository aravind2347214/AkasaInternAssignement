import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Loader from '../components/Loader';
import { Close } from '@mui/icons-material';
import APIResponseStatus from '../components/APIResponseStatus';

function OrderHistoryModal(props) {
    const{orderData,setOrderModal}=props
    const dispatch =  useDispatch()
   

    const [error, setError] = useState(null);
    const [logoutStatus,setLogoutStatus] = useState("not-loggedout")
    // const [logoutStatus,setLogoutStatus] = useState<any>("logout-failure")

    
    const navigate=useNavigate()
    const handleModalClose =()=>{
      setLogoutStatus("not-loggedout")
      setError(null)
      setOrderModal({isOpen:false,orderData:null})

    }

    console.log("askdhjnas",orderData)
  return (
    <div
    onClick={handleModalClose}
    className="top-0 left-0 absolute w-[100vw] z-[50] h-[100vh] bg-[#00000054] flex justify-center items-center">
    <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#fff] rounded-[8px] p-2 shadow-xl w-[90%] md:max-w-[700px]  overflow-y-auto`}>
        <div className="bg-orange text-[#fff] font-bold text-[20px] px-4 py-2 rounded-[4px]">
            Order Details
        </div>
        
        <div className="p-4">
            {/* Map through the items in the order */}
           <div className='flexflex-col max-h-[300px] overflow-y-auto'>
            {orderData.items?.map((orderItem, index) => (
                <div key={index} className="hover:bg-gray-200 rounded-[4px] p-4 flex justify-between items-center mb-2  gap-2">
                    <div className="flex items-center">
                        <img src={`${orderItem.image}`} alt={orderItem.name} className="w-[80px] h-[80px] aspect-auto mr-4 rounded-[4px]" />
                        <div>
                            <div className="font-bold text-[16px] text-gray-500">{orderItem.name}</div>
                        </div>
                    </div>
                    <div className="font-bold text-orange">${orderItem.price}</div>
                </div>
            ))}
           </div>

            {/* Order status and date */}
            <div className="mt-4">
                <div className="text-gray-600">
                    <strong className='text-orange'>Status:</strong> {orderData.status}
                </div>
                <div className="text-gray-600">
                    <strong className='text-orange'>Order Date:</strong> {new Date(orderData.date).toLocaleString()}
                </div>
            </div>

            {/* Total Price */}
            <div className="mt-4 text-right">
                <div className="text-orange font-bold text-[24px]">
                    Total: ${orderData.total}
                </div>
            </div>
        </div>

        
    </div>
</div>
  )
}

export default OrderHistoryModal
