const sequelize = require("./src/config/database");
const app = require("./src/app");
const UserService = require("./src/user/UserService");
const logger = require("./src/logger");

if (process.env.NODE_ENV === "production") {
  sequelize.sync();
} else {
  sequelize.sync({ force: true }).then(async () => {
    console.log("db in ready");
    for (let i = 1; i <= 5; i++) {
      const user = {
        username: `user${i}`,
        email: `user${i}@gmail.com`,
        password: `password`,
      };

      await UserService.create(user);
    }
  });
}

const PORT = process.env.PORT || 3000;

// logs priority error is highest
logger.error("error");
logger.warn("warn");
logger.info("info");
logger.verbose("verbose");
logger.debug("debug");
logger.silly("silly");

app.listen(PORT, () => {
  logger.info(`app is running on port ${PORT}, mode: ${process.env.NODE_ENV}`);
});
