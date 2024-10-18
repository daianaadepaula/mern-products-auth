# MERN Product and Authentication Application

This is a full-stack MERN (MongoDB, Express, React, Node.js) application that includes user authentication features (signup, login, logout) and product management (CRUD). The app offers a complete authentication system with JWT, user sessions, email verification, and protected routes, along with the ability to manage products in a database.

## Features

- **User Authentication**: Secure user registration and login using bcrypt for password hashing.
- **JWT Authentication**: User sessions are managed with JSON Web Tokens (JWT) stored as cookies.
- **Email Verification**: Users need to verify their email before accessing certain routes.
- **Protected Routes**: Only authenticated users can access specific pages.
- **Product Management**: Add, view, update, and delete products.
- **Responsive Design**: Built using Tailwind CSS and Chakra UI.

## Technologies

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt
- **Frontend**: React, Zustand (for state management), Chakra UI, Tailwind CSS, React Router

## Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/mern-product-auth.git
   cd mern-product-auth
   ```

2. **Install dependencies for both frontend and backend:**

   ```bash
   npm run build
   ```

3. **Set up environment variables:**

   Create a .env file in the root directory with the following content:

   ```bash
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application in development mode:**

   ```bash
   npm run dev
   ```

This will start both the frontend and backend on different ports.

## Scripts

- **Development**: npm run dev — Starts the backend server with nodemon in development mode.
- **Production**: npm start — Starts the backend server in production mode.
- **Build**: npm run build — Installs dependencies and builds the frontend.

## API Routes

The following routes are available:

#### Authentication Routes

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Login user.
- **POST /api/auth/logout**: Logout user.
- **GET /api/auth/check-auth**: Verify if the user is authenticated.

#### Product Routes

- **POST /api/products**: Add a new product.
- **GET /api/products**: Retrieve all products.
- **PUT /api/products/**: Update a product.
- **DELETE /api/products/**: Delete a product.

## Deployment

To deploy the app in a production environment:

1. **Run this app locally:**

   ```bash
   npm run build
   ```

2. **Run the app:**

   ```bash
   npm run start
   ```

This will serve the backend and frontend as a single application.

## License

This project is licensed under the MIT License. See the <a href="https://github.com/daianaadepaula/mern-products-auth/blob/main/LICENSE">License</a> file for more information.
