// Load environment variables from .env file
require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Import route handlers
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const commonFeatureRouter = require("./routes/common/feature-routes");

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 5000; // Port configuration (from environment or default to 5000)

// Connect to MongoDB using the connection string from .env
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Enable CORS with dynamic origin from environment variables
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL, // Frontend URL (from .env)
    methods: ["GET", "POST", "DELETE", "PUT"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"], // Allowed headers
    credentials: true, // Allow credentials like cookies
  })
);

// Middleware setup
app.use(cookieParser()); // Parse cookies from requests
app.use(express.json()); // Parse incoming JSON payloads

// Register routes for different parts of the app
app.use("/api/auth", authRouter); // Authentication routes
app.use("/api/admin/products", adminProductsRouter); // Admin product management routes
app.use("/api/admin/orders", adminOrderRouter); // Admin order management routes
app.use("/api/shop/products", shopProductsRouter); // Shop product-related routes
app.use("/api/shop/cart", shopCartRouter); // Shop cart-related routes
app.use("/api/shop/address", shopAddressRouter); // Shop address-related routes
app.use("/api/shop/order", shopOrderRouter); // Shop order-related routes
app.use("/api/shop/search", shopSearchRouter); // Shop search-related routes
app.use("/api/shop/review", shopReviewRouter); // Shop review-related routes
app.use("/api/common/feature", commonFeatureRouter); // Common features

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
