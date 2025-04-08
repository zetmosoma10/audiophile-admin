# Audiophile Admin App

This is the **Frontend Admin** for Audiophile application built with **React.js + Vite**. The Admin user is able to view all Orders placed my all customers, view Order detailed, update Orders and products prices.

## FEATURE

- Admin Registration & Login (Register user as Admin and Login user)
- View Dashboard Analytics
- View All placed Orders
- View order details
- View All products
- View product details
- View all Customers
- Update product price, discounts, number in stock
- Update Order status (Pending, Shipped, Delivered, Cancelled)
- Delete Order
- Delete Customer
- Delete Admin account
- Filter Orders by status (Pending, Shipped, Delivered, Cancelled)
- Pagination on Customer & Order Data

## TECH STACK

- React.js
- Vite
- Tailwindcss
- Axios (API calls)
- React Hook Form (handling form data)
- Zod (handling schema based validation for form)
- Tanstack Query (syncing server and client)
- Zustand (Global state management)
- motion (for Animation)
- Chart.js && react-chartjs-2 (for displaying graph)
- React Router Dom (Routing and Navigation)

## GETTING STARTED

### 1. Clone Repository

```bash
git clone https://github.com/zetmosoma10/audiophile-admin.git
cd audiophile-admin
```

### 2. Install Dependencies

npm install

### 3. Create .env file

At the root of the project create .env file and add:

VITE_BASE_URL=http://localhost:3000/api

(change URL to your deployed URL if needed)

### 4. Start Development server

npm run dev

This app will run at: http://localhost:5173 (or whichever vite gives you)

**API INTEGRATION**

- This Admin app communicates with Audiophile API available here: https://github.com/zetmosoma10/audiophile-api
- Make sure that the api server is running and the .env file has correct VITE_BASE_URL .
