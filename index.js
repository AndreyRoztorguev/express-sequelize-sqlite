const sequelize = require("./src/config/database");
const app = require("./src/app");

sequelize.sync({ force: true }).then(async () => {
  console.log("db in ready");
});

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
