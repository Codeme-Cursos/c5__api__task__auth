const Sequelize = require( 'sequelize');
const sequelize = require( '../database/database');
const TaskModel = require('./task.model');

const UserModel = sequelize.define('users', {
    username: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    versionKey: false
})

UserModel.hasMany(TaskModel, { foreignKey: 'userid', sourceKey: 'id' });
TaskModel.belongsTo(UserModel, { foreignKey: 'userid', sourceKey: 'id' });

module.exports = UserModel;