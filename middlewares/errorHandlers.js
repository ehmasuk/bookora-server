import { Error } from "mongoose";

const notFound = (_req, _res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
};

const errorHandler = (err, _req, res, _next) => {
  console.log(err);
  if (err instanceof Error.ValidatorError) {
    return res.status(400).json({ message: err.message });
  }
  if (err.status) {
    return res.status(err.status).json({ message: err.message });
  } else {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export default {
  notFound,
  errorHandler,
};
