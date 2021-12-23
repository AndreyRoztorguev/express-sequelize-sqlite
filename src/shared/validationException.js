module.exports = function validationException(errors) {
  this.status = 400;
  this.message = "validation_exception";
  this.errors = errors;
};
