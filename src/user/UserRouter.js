const router = require("express").Router();
const idNumberControl = require("../shared/idNumberControl");
const pagination = require("../shared/pagination");
const UserService = require("./UserService");

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

router.post("/users", async (req, res) => {
  await UserService.create(req.body);
  res.send("user is inserted");
});

router.put("/users/:id", idNumberControl, async (req, res) => {
  await UserService.updateUser(req.params.id, req.body);
  res.send("updated");
});

router.delete("/users/:id", idNumberControl, async (req, res) => {
  await UserService.deleteUser(req.params.id);
  res.send("removed");
});

module.exports = router;
