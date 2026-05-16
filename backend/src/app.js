const express = require("express");
const cors = require("cors");
const path = require("path");

require("./config/db");

const authRoutes =
  require("./routes/auth.routes");

const storeRoutes =
  require("./routes/store.routes");

const productRoutes =
  require("./routes/product.routes");

const orderRoutes =
  require("./routes/order.routes");

const userRoutes =
  require("./routes/user.routes");

const adminRoutes =
  require("./routes/admin.routes");

const app = express();


// ==========================
// MIDDLEWARE
// ==========================
app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);


// ==========================
// STATIC FILES
// ==========================
app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);


// ==========================
// HEALTH CHECK
// ==========================
app.get("/", (req, res) => {

  res.json({
    success: true,
    message: "Vendora API Running 🚀"
  });

});


// ==========================
// API ROUTES
// ==========================
app.use(
  "/api/v1/auth",
  authRoutes
);

app.use(
  "/api/v1/stores",
  storeRoutes
);

app.use(
  "/api/v1/products",
  productRoutes
);

app.use(
  "/api/v1/orders",
  orderRoutes
);

app.use(
  "/api/v1/users",
  userRoutes
);

app.use(
  "/api/v1/admin",
  adminRoutes
);


// ==========================
// 404 HANDLER
// ==========================
app.use((req, res) => {

  res.status(404).json({
    success: false,
    message: "Route not found"
  });

});


// ==========================
// GLOBAL ERROR HANDLER
// ==========================
app.use((err, req, res, next) => {

  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });

});


module.exports = app;