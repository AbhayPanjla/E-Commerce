# Ecommerce App

## Overview

The Ecommerce App is a comprehensive platform built using the MERN stack (MongoDB, Express.js, React.js, Node.js) following the MVC (Model-View-Controller) pattern. This project offers full authentication for both admin and user roles, enabling a wide range of functionalities for managing products, categories, and orders. The application is fully dynamic, responsive, and designed using Bootstrap.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
  - [Admin Features](#admin-features)
  - [User Features](#user-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

### Admin Features

- Full authentication for admin.
- Add, remove, delete, and edit categories.
- Create products based on categories with dynamic pricing.
- View and manage payments through PayPal gateway.
- Change order statuses (e.g., pending, shipped, delivered).
- Access multiple dashboards with various management functionalities.

### User Features

- Full authentication for users.
- Create, edit, and delete orders.
- Update user details.
- Make payments through PayPal gateway.
- Search for products dynamically from any part of the application.
- View order statuses updated by admin.

## Technologies Used

- **Frontend:** React.js, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Payment Gateway:** PayPal
- **Authentication:** JWT (JSON Web Tokens)

## Installation

1. Clone the repository:
   bash https://github.com/nextworktechnologies/E-Commerce.git
   cd ecommerce-app
2. Install backend dependencies:
   cd backend
   npm install
3. Install frontend dependencies:
   cd ../frontend
   npm install

4. Set up environment variables:
   Create a .env file in the backend directory.

MONGO_URI=your_mongo_database_uri
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id

5. Usage

cd .. npm run dev
