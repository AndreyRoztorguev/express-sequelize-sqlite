const InvalidIdException = require("./invalidIdException");

const idNumberControl = (req, res, next) => {
  const id = Number.parseInt(req.params.id);
  if (Number.isNaN(id)) {
    throw next(new InvalidIdException());
  }
  next();
};

module.exports = idNumberControl;
