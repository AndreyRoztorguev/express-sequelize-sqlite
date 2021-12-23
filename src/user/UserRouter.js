const router = require("express").Router();
const idNumberControl = require("../shared/idNumberControl");
const pagination = require("../shared/pagination");
const UserService = require("./UserService");
const ValidationException = require("../shared/validationException");
const {
  check,
  body,
  header,
  query,
  cookie,
  validationResult,
} = require("express-validator");

router.get("/users", pagination, async (req, res) => {
  const page = await UserService.getUsers(req.pagination);
  res.send(page);
});

router.get("/users/:id", idNumberControl, async (req, res, next) => {
  try {
    const user = await UserService.getUser(Number.parseInt(req.params.id));
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/users",
  body("username")
    .notEmpty()
    .withMessage("username cannot be null")
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("username must have min 4 and max 32 characters"),
  body("email")
    .isEmail()
    .withMessage("Must be a valid email address")
    .bail()
    .custom(async (email) => {
      const user = await UserService.findByEmail(email);
      if (user) {
        throw new Error("This email is in use");
      }
    }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
      //   return res.status(400).send(errors.array());
    }
    await UserService.create(req.body);
    res.send("user is inserted");
  }
);

router.put("/users/:id", idNumberControl, async (req, res) => {
  await UserService.updateUser(req.params.id, req.body);
  res.send("updated");
});

router.delete("/users/:id", idNumberControl, async (req, res) => {
  await UserService.deleteUser(req.params.id);
  res.send("removed");
});

module.exports = router;
