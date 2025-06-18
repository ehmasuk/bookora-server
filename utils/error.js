const error = (message = "Something went wrong", statusCode = 400) => {
  const customError = new Error(message);
  customError.status = statusCode;
  return customError;
};

export default error;
