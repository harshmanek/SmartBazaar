const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const {
  authenticateUser,
  authorizeRole,
} = require("./middlewares/authMiddleware");

const productRoutes = require("./routes/product.route");
const cartRoutes = require("./routes/cart.route");
const customerRoutes = require("./routes/customer.route");
const paymentRoutes = require("./routes/payment.route");
const orderRoutes = require("./routes/order.route");
const employeeRoutes = require("./routes/employee.route");
const adminRoutes = require("./routes/admin.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("combined"));

// Public Routes (No authentication needed)
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/order", orderRoutes);

// Public Employee Routes (Login should be accessible)
const employeePublicRoutes = express.Router();
const { loginEmployee } = require("./controllers/employee.controller");

employeePublicRoutes.post("/login", loginEmployee);
app.use("/api/employee", employeePublicRoutes);

// Protected Employee Routes (Only logged-in employees can access)
app.use(
  "/api/employee",
  authenticateUser,
  authorizeRole(["admin", "associate", "cashier"]),
  employeeRoutes
);

// Protected Admin Routes
app.use("/api/admin", authenticateUser, authorizeRole(["admin"]), adminRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the E-Commerce Backend!");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Export the app
module.exports = { app };
