const chalk = require("chalk");
const normalizeCard = require("../cards/helpers/normalizeCard");
const { createCard } = require("../cards/models/cardsAccessDataService");
const { registerUser } = require("../users/models/usersAccessDataService");
const data = require("./initialData.json");
const normalizeUser = require("../users/helpers/normalizeUser");
const { generateUserPassword } = require("../users/helpers/bcrypt");
const Card = require("../cards/models/mongodb/Card");
const User = require("../users/models/mongodb/User");

const generateInitialCards = async () => {
  const { cards } = data;

  cards.forEach(async (card) => {
    try {
      const cardInDb = await Card.findOne({ email: card.email });
      if (cardInDb) return;

      const userId = "6376274068d78742d84f31d2";
      card = await normalizeCard(card, userId);
      await createCard(card);
      return;
    } catch (error) {
      return console.log(chalk.redBright(error.message));
    }
  });
};

const generateInitialUsers = async () => {
  const { users } = data;
  users.forEach(async (user) => {
    try {
      const userInDb = await User.findOne({ email: user.email });
      if (userInDb) return;
      user = await normalizeUser(user);
      user.password = generateUserPassword(user.password);
      await registerUser(user);
      return;
    } catch (error) {
      return console.log(chalk.redBright(error.message));
    }
  });
};

exports.generateInitialCards = generateInitialCards;
exports.generateInitialUsers = generateInitialUsers;
