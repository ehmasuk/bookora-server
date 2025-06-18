import dotenv from "dotenv";
import express from "express";
import errorHandlers from "../middlewares/errorHandlers.js";
import middlewares from "../middlewares/index.js";
import router from "../routes/index.js";

dotenv.config();
const app = express();

// middlewares
app.use(middlewares);

// routes
app.use(router);

// error handlers
app.use(errorHandlers.notFound);
app.use(errorHandlers.errorHandler);

export default app;
