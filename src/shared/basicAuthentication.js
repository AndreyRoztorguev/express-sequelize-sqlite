const UserService = require("../user/UserService");
const bcrypt = require("bcrypt");

module.exports = async (req, res, next) => {
  const authorization = req.headers.authorization; // 'Authorization: Basic dXNlcjE6cGFzc3dvcmQ='
  if (authorization) {
    const encoded = authorization.substring(6); // dXNlcjE6cGFzc3dvcmQ=
    const decoded = Buffer.from(encoded, "base64").toString("ascii"); // we get something like this => email:password
    const [email, password] = decoded.split(":");
    const authenticatedUser = await UserService.findByEmail(email);

    if (authenticatedUser) {
      const match = await bcrypt.compare(password, authenticatedUser.password);
      if (match) {
        req.authenticatedUser = authenticatedUser;
      }
    }
  }
  next();
};
