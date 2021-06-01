const Sequelize = require( 'sequelize');
const sequelize = require( '../database/database');

const TaskModel = sequelize.define('tasks', {
    responsable: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
}, {
    timestamps: false
})

module.exports = TaskModel;
