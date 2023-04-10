import express, { NextFunction, Request, Response } from "express";
import db from "./models/index.js"

await db.sequelize.sync()

const app = express();

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send("hi");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
