module.exports = (err, req, res, next) => {
  return res.status(err.status).send({
    message: err.message,
    timestamps: Date.now(),
    path: req.originalUrl,
  });
};
