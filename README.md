# FreshMart : Food Ordering Platform

This project is a full-stack food ordering platform built using **React.js** on the frontend and **Node.js** with **Express** on the backend. The platform allows users to browse available food items, add them to a cart, and proceed to checkout.

## Demo
<!-- add alink -->
[https://freshmart-frontend.onrender.com/](https://freshmart-frontend.onrender.com/)

## Features

### User Authentication
- **Login/Signup**: Users can sign up and log in securely using JWT authentication.
- **User Profile**: The platform fetches user details via token-based authentication and displays the user's profile, including their order history.

### Cart Functionality
- **Add to Cart**: Users can add items to their cart.
- **Remove from Cart**: Users can remove items from their cart.
- **Total Price Calculation**: The total price of all items in the cart is calculated and displayed dynamically.
- **Checkout**: Users can place an order, and the backend handles stock checks and updates.

### Order Processing
- **Checkout API**: Once the user confirms their order, the API processes the request by:
  - Verifying stock availability
  - Generating a unique tracking ID
  - Recording the order in the database
  - Reducing item stock accordingly

## Technologies Used

### Frontend
- **React.js**: For building a dynamic, interactive user interface.
- **Redux**: For managing application state (user profile, cart data).
- **Tailwind CSS**: For styling the application with utility-first CSS.

### Backend
- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for creating the API.
- **MongoDB**: NoSQL database to store user, item, and order data.
- **Mongoose**: ORM for MongoDB to define schemas and handle data queries.

### API Endpoints

The platform provides the following RESTful API endpoints for authentication, user operations, order management, and inventory management.

#### **Authentication Endpoints**

- **POST /signup**  
  Registers a new user with the platform.

- **POST /login**  
  Authenticates the user and provides a JWT token for session management.

- **POST /logout**  
  Logs the user out and invalidates the current session.

#### **User Endpoints**

- **GET /user/:userId**  
  Retrieves details of a specific user based on the user ID.

- **POST /user/add-to-cart**  
  Adds an item to the user's cart. The request should contain the user ID and the item details.

- **PUT /user/remove-from-cart**  
  Removes an item from the user's cart. The request should contain the user ID and the item to be removed.

#### **Order Endpoints**

- **POST /order/checkout/:userId**  
  Initiates the checkout process for the user. This endpoint processes the cart, deducts stock from inventory, and generates an order.

- **GET /order**  
  Retrieves a list of all orders placed by the user.

#### **Inventory Endpoints**

- **GET /items**  
  Retrieves a list of all available items in the inventory.

- **GET /items-by-id/:itemId**  
  Fetches the details of a specific item based on its item ID.

- **GET /items-by-category/:itemId**  
  Retrieves items from the inventory that belong to a specific category.

- **POST /items**  
  Adds a new item to the inventory. Requires admin access.



### Setup Instructions

**Clone the repository**:
   ```bash
   git clone https://github.com/aravind2347214/AkasaInternAssignement  
   ```

**Frontend**:
```bash
  cd client
  npm install
  npm start
```

**Backend**:

```bash
  cd server
  npm install
  nodemon
```




