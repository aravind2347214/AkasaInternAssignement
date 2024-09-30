import axios from "axios";
import { ENV } from "../env/environment";

// Place an order (checkout)
export const placeOrder = async (userId) => {
    let response;
    try {
        response = await axios.post(`${ENV}/order/checkout/${userId}`);
    } catch (err) {
        response = err;
        console.error("Error: ", err);
    }
    return response;
};

// Get user order history
export const getUserOrderHistory = async (userId) => {
    let ordersData;
    try {
        const res = await axios.get(`${ENV}/order/${userId}`);
        ordersData = res.data;
    } catch (err) {
        ordersData = err;
        console.error("Error: ", err);
    }
    return ordersData;
};
