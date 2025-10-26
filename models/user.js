const Sequelize = require(`sequelize`);
const db = require(`../db/connection`);

const cadastro = db.define(`User`, {
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING
    }
    
});

module.exports = cadastro;