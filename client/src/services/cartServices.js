import axios from "axios";
import { ENV } from "../env/environment";

// Get user's cart by user ID
export const getCartByUserId = async (userId) => {
    let cartData;
    try {
        const res = await axios.get(`${ENV}/cart/${userId}`);
        cartData = res.data;
    } catch (err) {
        cartData = err;
        console.error("Error: ", err);
    }
    return cartData;
};

// Add item to user's cart
export const addItemToCart = async (userId, itemId, quantity) => {
    let response;
    try {
        response = await axios.post(`${ENV}/cart/${userId}/add`, { itemId, quantity });
    } catch (err) {
        response = err;
        console.error("Error: ", err);
    }
    return response;
};



// Update item quantity in cart
export const updateCartItem = async (userId, itemId, quantity) => {
    let response;
    try {
        response = await axios.put(`${ENV}/cart/${userId}/update`, { itemId, quantity });
    } catch (err) {
        response = err;
        console.error("Error: ", err);
    }
    return response;
};

// Remove item from cart
export const removeCartItem = async (userId, itemId) => {
    let response;
    try {
        response = await axios.delete(`${ENV}/cart/${userId}/remove`, { data: { itemId } });
    } catch (err) {
        response = err;
        console.error("Error: ", err);
    }
    return response;
};