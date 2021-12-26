const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const ValidationException = require("../shared/validationException");

const upload = multer({ limits: { fileSize: 1024 * 1024 } }).single("my-file");

router.post("/upload", async (req, res, next) => {
  upload(req, res, async (error) => {
    if (error) {
      return next(
        new ValidationException([{ param: error.name, msg: error.message }])
      );
    }
    await fs.promises.writeFile(
      `./public/${req.file.originalname}`,
      req.file.buffer
    );
    res.send({ message: req.t("upload_success") });
  });
});

module.exports = router;
