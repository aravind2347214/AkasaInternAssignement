import { LOGIN, LOGOUT } from "../redux/types"


export const loginAction=(userData)=>{
    // console.log("IN Action :",userData)
    return{
        type:LOGIN,
        payload:userData
    }
}

export const logoutAction=()=>{
    return{
        type:LOGOUT,
    }
}


