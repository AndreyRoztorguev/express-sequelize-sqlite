module.exports = (err, req, res, next) => {
  const { status, message, errors } = err;
  let validationErrors;
  if (errors) {
    validationErrors = {};
    errors.forEach((error) => {
      validationErrors[error.param] = req.t(error.msg);
    });
  }
  return res.status(status).send({
    message: req.t(message), // req.t this is middleware i18next
    timestamps: Date.now(),
    path: req.originalUrl,
    validationErrors,
  });
};
