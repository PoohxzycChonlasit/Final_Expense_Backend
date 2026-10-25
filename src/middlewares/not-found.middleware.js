export const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({
    message: `The requested url: ${req.method} ${req.path} not found on this server`,
  });
};
