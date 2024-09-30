import axios from "axios"
import { ENV } from "../env/environment"

export const getUserById =async(userId)=>{
    let userData
    // console.log("USER ID in userservice : ",userId)
    await axios.get(`${ENV}/user/${userId}`).then((res)=>{
        // console.log("USERDATA : ",res.data)
         userData= res.data;
        // loginAction(res.data)
    }).catch((err)=>{
        userData =err
        console.error("Error : ", err);
    })
    return userData
}

export const addItemToCartById =async(userId,itemId)=>{
    let addResult
    // console.log("USER ID in userservice : ",userId)
    await axios.post(`${ENV}/user/add-to-cart`,{userId:userId,itemId:itemId}).then((res)=>{
        // console.log("USERDATA : ",res.data)
        addResult= res.data;
        // loginAction(res.data)
    }).catch((err)=>{
        addResult =err
        console.error("Error : ", err);
    })
    return addResult
}

export const removeItemFromCartById =async(userId,itemId)=>{
    let removeResult
    // console.log("USER ID in userservice : ",userId)
    await axios.put(`${ENV}/user/remove-from-cart`,{userId:userId,itemId:itemId}).then((res)=>{
        // console.log("USERDATA : ",res.data)
        removeResult= res.data;
        // loginAction(res.data)
    }).catch((err)=>{
        removeResult =err
        console.error("Error : ", err);
    })
    return removeResult
}

