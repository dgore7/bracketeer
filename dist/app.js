import express from "express";
import dotenv from "dotenv";
import db from "./db.js";
dotenv.config(); //Reads .env file and makes it accessible via process.env
db.connectToDB();
const app = express();
app.get("/test", (req, res, next) => {
    res.send("hi");
});
app.listen(process.env.PORT, () => {
    console.log(`Server is running at ${process.env.PORT}`);
});
