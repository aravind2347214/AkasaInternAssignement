import { CheckCircleOutline, Error } from '@mui/icons-material';
import React from 'react'

function APIResponseStatus(props) {
    const {status, message} = props;
  return (
<>
<div>
    {
        // Sucess
        status?
        <div className='flex flex-col justify-center '>
            <div className='flex items-center justify-center'>
                <CheckCircleOutline
                sx={{fontSize:50,color:"green"}}
                />
            </div>
            <div className='text-[18px] justify-center text-center font-bold text-SucessGreen'>
                {message}
            </div>

        </div>:

        // Failure
        <div className='flex flex-col justify-center '>
            <div className='flex items-center justify-center'>
                <Error
                sx={{fontSize:50,color:"red"}}
                />
            </div>
            <div className='text-[18px] justify-center text-center font-bold text-C11'>
                {message}
            </div>
            

        </div>
    }
</div>

</>
  )
}

export default APIResponseStatus
