# HarborLane E-Commerce Platform

Welcome to **HarborLane**, a modern, full-stack e-commerce platform designed to streamline online shopping experiences for customers, administrators, and employees. HarborLane is built with cutting-edge technologies to ensure scalability, performance, and ease of use.

---

## 🚀 Features

- **Customer Portal**: Seamless shopping experience with QR code scanning, cart management, and secure payments.
- **Admin Dashboard**: Manage products, employees, and orders with real-time analytics and insights.
- **Employee Tools**: Efficient cart verification and stock management for associates and cashiers.
- **Secure Payments**: Integrated with Razorpay for secure and reliable payment processing.
- **Real-Time Updates**: WebSocket-powered notifications for cart verification and order updates.

---

## 🛠️ Tech Stack

### **Frontend**
- **React** with **TypeScript**: For building a dynamic and type-safe user interface.
- **Vite**: Lightning-fast development environment.
- **Tailwind CSS**: Utility-first CSS framework for responsive and modern designs.
- **Framer Motion**: Smooth animations and transitions.
- **React Router**: For seamless navigation between pages.
- **Socket.IO Client**: Real-time communication with the backend.

### **Backend**
- **Node.js** with **Express**: High-performance server-side framework.
- **MongoDB** with **Mongoose**: NoSQL database for flexible and scalable data storage.
- **Razorpay SDK**: Payment gateway integration for secure transactions.
- **Socket.IO**: Real-time communication for WebSocket-based features.
- **JWT**: Secure authentication and authorization.

---

## 📂 Folder Structure

```
HarborLane/
├── FRONTEND/          # React-based customer-facing application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Application pages (Home, Checkout, etc.)
│   │   ├── api/         # API service integrations
│   │   ├── context/     # Global state management
│   │   └── App.tsx      # Main application entry point
│   └── vite.config.ts   # Vite configuration
├── BACKEND/           # Node.js backend application
│   ├── controllers/    # Business logic for routes
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   ├── app.js          # Express app setup
│   └── server.js       # Server entry point
├── ADMIN/             # Admin dashboard application
│   ├── src/
│   │   ├── components/  # Admin-specific UI components
│   │   ├── pages/       # Admin dashboard pages
│   │   └── App.tsx      # Main application entry point
│   └── vite.config.ts   # Vite configuration
└── README.md          # Project documentation
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v16+)
- **MongoDB** (local or cloud instance)
- **Razorpay Account** (for payment integration)

### Clone the Repository
```bash
git clone https://github.com/your-username/HarborLane.git
cd HarborLane
```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd BACKEND
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the following:
   ```env
   MONGO_URI=mongodb://localhost:27017/harborlane
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd FRONTEND
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the API base URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Admin Dashboard Setup
1. Navigate to the admin directory:
   ```bash
   cd ADMIN
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure the API base URL:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 📖 API Documentation

The backend exposes RESTful APIs for various operations. Below are some key endpoints:

### **Payment APIs**
- `POST /api/payments/create-order`: Create a Razorpay order.
- `POST /api/payments/verify-payment`: Verify payment and trigger order creation.

### **Order APIs**
- `POST /api/order/create`: Create an order after payment verification.
- `GET /api/order/:orderId`: Fetch order details by ID.

### **Cart APIs**
- `GET /api/cart/:customer_id`: Retrieve the customer's cart.
- `POST /api/cart/:customer_id/add`: Add items to the cart.

For detailed API documentation, refer to the [API Reference](#).

---

## 🧪 Testing

### Run Backend Tests
```bash
cd BACKEND
npm test
```

### Run Frontend Tests
```bash
cd FRONTEND
npm test
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

---

## 🌟 Acknowledgments

- **Razorpay** for seamless payment integration.
- **MongoDB** for scalable database solutions.
- **React** and **Vite** for powering the frontend.
