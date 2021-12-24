const router = require("express").Router();
const idNumberControl = require("../shared/idNumberControl");
const pagination = require("../shared/pagination");
const UserService = require("./UserService");
const ValidationException = require("../shared/validationException");
const basicAuthentication = require("../shared/basicAuthentication");
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
    .withMessage("user_null") // with i18next translations
    .bail()
    .isLength({ min: 4, max: 32 })
    .withMessage("user_size"),
  body("email")
    .isEmail()
    .withMessage("email_invalid")
    .bail()
    .custom(async (email) => {
      const user = await UserService.findByEmail(email);
      if (user) {
        throw new Error("email_inuse");
      }
    }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new ValidationException(errors.array()));
    }
    await UserService.create(req.body);
    res.send({ message: req.t("user_created_success") });
  }
);

router.put(
  "/users/:id",
  idNumberControl,
  basicAuthentication,
  async (req, res) => {
    const authenticatedUser = req.authenticatedUser;

    if (!authenticatedUser) {
      return res.status(403).send({ message: "Forbidden" });
    }

    if (authenticatedUser.id != req.params.id) {
      return res.status(403).send({ message: "Forbidden" });
    }
    await UserService.updateUser(req.params.id, req.body);
    res.send("updated");
  }
);

router.delete(
  "/users/:id",
  idNumberControl,
  basicAuthentication,
  async (req, res) => {
    const authenticatedUser = req.authenticatedUser;

    if (!authenticatedUser) {
      return res.status(403).send({ message: "Forbidden" });
    }

    if (authenticatedUser.id != req.params.id) {
      return res.status(403).send({ message: "Forbidden" });
    }
    await UserService.deleteUser(req.params.id);
    res.send("removed");
  }
);

module.exports = router;
