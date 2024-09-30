import React from 'react'

function AddItemMessageModal() {
  return (
<div
// onClick={handleModalClose}
className='top-0 left-0 absolute w-[100vw] z-[50] h-[100vh] bg-[#00000054] flex justify-center items-center'>
    <div 
    onClick={(e)=>e.stopPropagation()}
    className={`bg-[#fff] rounded-[4px] p-5 shadow-xl w-full bg-[#00000014] h-full  justify-center flex items-center text-center":"w-[90%] md:max-w-[500px] max-h-[300px]"}`} >
    

    </div>
  </div>
  )
}

export default AddItemMessageModal
