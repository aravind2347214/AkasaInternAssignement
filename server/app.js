const express = require("express")
const app= express()
const PORT=8000;
var cors = require('cors');
const { connectToDatabase } = require("./database");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const inventoryRouter = require("./routes/inventory")
const orderRouter = require("./routes/order")



app.use(cors());
connectToDatabase().then(()=>{
    try {
        app.listen(PORT,()=>{
            console.log("Connected To Database");
            app.use(express.json())

            // AUTH REQUESTS
                        app.post("/signup",authRouter)
                        app.post("/login",authRouter)
                        app.post("/logout",authRouter)
            
            // USer requests
                       app.get("/user/:userId",userRouter)
                       app.post("/user/add-to-cart",userRouter)
                       app.put("/user/remove-from-cart",userRouter)

            // Order Requests 
                       app.post("/order/checkout/:userId",orderRouter)
                       app.get("/order",orderRouter)
            
            // Inventory requests
                      app.get("/items",inventoryRouter)
                      app.get("/items-by-id/:itemId",inventoryRouter)
                      app.get("/items-by-category/:itemId",inventoryRouter)
                      app.post("/items",inventoryRouter)
        })  
    } catch (error) {
        console.log(`Error Connecting to the database: ${error}`)   
    }
})

