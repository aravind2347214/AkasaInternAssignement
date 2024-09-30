import axios from "axios";
import { ENV } from "../env/environment";

// Get all inventory items
export const getAllInventoryItems = async () => {
    let inventoryData;
    try {
        const res = await axios.get(`${ENV}/items`);
        inventoryData = res.data;
    } catch (err) {
        inventoryData = err;
        console.error("Error: ", err);
    }
    return inventoryData;
};

// Get inventory items by category
export const getInventoryItemsByCategory = async (category) => {
    let inventoryData;
    try {
        const res = await axios.get(`${ENV}/items-by-category/${category}`);
        inventoryData = res.data;
    } catch (err) {
        inventoryData = err;
        console.error("Error: ", err);
    }
    return inventoryData;
};

// Get inventory items by category
export const getInventoryItemsById = async (id) => {
    let inventoryData;
    try {
        const res = await axios.get(`${ENV}/items-by-id/${id}`);
        inventoryData = res.data;
    } catch (err) {
        inventoryData = err;
        console.error("Error: ", err);
    }
    return inventoryData;
};