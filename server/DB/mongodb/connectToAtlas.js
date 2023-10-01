const mongoose = require("mongoose");
const chalk = require("chalk");
const config = require("config");

const userName = config.get("DB_NAME");
const password = config.get("DB_PASSWORD");
const DB_HOST = config.get("DB_HOST");

mongoose
  .connect(`mongodb+srv://${userName}:${password}@${DB_HOST}/business_card_app`)

  .then(() => console.log(chalk.magentaBright("connected to MongoDb Locally!")))
  .catch((error) =>
    console.log(chalk.redBright.bold(`could not connect to mongoDb: ${error}`))
  );
