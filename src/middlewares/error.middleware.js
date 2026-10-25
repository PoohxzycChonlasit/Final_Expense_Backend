export const errorMiddleware = (err, req, res, next) => {
  if (err.statusCode) {
    res
      .status(err.statusCode)
      .json({ message: err.message, details: err.details });
  }

  res.status(500).json({ message: err.message });
};
