const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");
const { NODE_ENV, PORT } = process.env;
const connectDB = require("./config/connectDB");
// Error handling
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
// Routes
const servicesRoute = require("./routes/servicesRoute");
const facebookRoute = require("./routes/facebookRoute");
const linkedinRoute = require("./routes/linkedinRoute");
const whatsappRoute = require("./routes/whatsappRoute");
const gmailRoute = require("./routes/gmailRoute");
const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");

// Connect DB
connectDB();

// Init App
const app = express();

// Middlewares
app.use(express.json());

if (NODE_ENV === "Development") {
  app.use(morgan("dev"));
  console.log(`Mode: ${NODE_ENV} ✓`);
}

// Cors Policy
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
  })
);

// Mount Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/services", servicesRoute);
app.use("/api/v1/facebook", facebookRoute);
app.use("/api/v1/linkedin", linkedinRoute);
app.use("/api/v1/whatsapp", whatsappRoute);
app.use("/api/v1/gmail", gmailRoute);
app.use("/api/v1/users/profile", userRoute);
app.use("/api/v1/products", productRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route ${req.originalUrl}`, 400));
});

// Global Error Handling Middleware For Express
app.use(globalError);

const server = app.listen(PORT, () =>
  console.log(`Server Is Running On Port ${PORT} In ${NODE_ENV} Mode ✓`)
);

// Handle "Unhandled Rejection Errors" Outside Express
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection Errors --> ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down...`);
    process.exit(1);
  });
});
