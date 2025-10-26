const Sequelize = require(`sequelize`);

const sequelize = new Sequelize({
    dialect: `sqlite`,
    Storage: `./db/app.db`
});

module.exports = sequelize