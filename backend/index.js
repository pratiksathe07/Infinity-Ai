


import express from "express";
import "dotenv/config";
import connectDB from "./database/db.js";
import authRoute from "./routes/authRoute.js";
import websiteRoute from "./routes/websiteRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://infinity-ai-1-6ot2.onrender.com/",
    credentials: true,
  })
);



app.use("/api/auth", authRoute);
app.use("/api/website", websiteRoute); 
app.use("/api/payment", paymentRoute); 



app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});