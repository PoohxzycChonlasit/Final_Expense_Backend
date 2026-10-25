import express from "express";
import "dotenv/config";
import { env } from "./src/config/env.js";
import cors from "cors";
import morgan from "morgan";
import { notFoundMiddleware } from "./src/middlewares/not-found.middleware.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import { authRouter } from "./src/routes/auth.route.js";
import { expenseRouter } from "./src/routes/expense.route.js";
export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/auth", authRouter);
app.use("/expense", expenseRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
