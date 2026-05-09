module.exports = `const globalError = (err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error"
  });
};

module.exports = globalError;
`;