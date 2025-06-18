import cors from "cors";
import express from "express";
import morgan from "morgan";

const middlewares = [morgan("dev"), cors({origin: "*"}), express.json(), express.urlencoded({ extended: true })];

export default middlewares;
