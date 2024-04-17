const errorHandler = (err, req, res, next) => {
  let error = {}; // Correctly initialize the error object

  error.message = err.message;

  console.log(err.stack.red); // This logs the error stack trace in red color

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server error",
  });
};

module.exports = errorHandler;