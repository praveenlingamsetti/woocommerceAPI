require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { StatusCodes } = require("http-status-codes");
const path = require("path");
//port
const PORT = process.env.PORT || 6000;

const wooCommerceOrdersRoute = require("./route/wooCommerceOrderRoute");
const wooCommerceProductsRoute = require("./route/wooCommerceProductsRoute");
// ref
const app = express();

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// middleware
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(cookieParser(process.env.TOKEN_SECRET)); // token secret for signed cookies

// route modules

// primary route
//app.use("/api", allRoutes.authRoute);
app.use("/woocommerce/products", wooCommerceProductsRoute);
app.use("/woocommerce/orders", wooCommerceOrdersRoute);

// default route
app.all("*", (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ msg: "The Request route path not found" });
});

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`server is listening @ http://localhost:${PORT}`);
    });
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: err.message });
  }
};

start();
