module.exports = function validationException(errors) {
  this.status = 400;
  this.message = "Invalid Request";
  this.errors = errors;
};
