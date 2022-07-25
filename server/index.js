import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import postRoutes from "./routes/posts.js";

const app = express();
dotenv.config();

//set up body parser
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/", postRoutes);

app.get("/", (req, res) => {
  res.send("Hello to foodify");
});

const CONNECTION_URL = process.env.MONGODB_URI;
var APP_PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(APP_PORT, () =>
      console.log(`MongoDB connected Server running on port ${APP_PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
