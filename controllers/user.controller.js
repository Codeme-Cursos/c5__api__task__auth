const UserModel = require('../models/user.model');

const getUsers = async (req, res) => {
    try {
        let gotUsers = await UserModel.findAll();
        return res.status(200).json(gotUsers);
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

const deleteUserById = async (req, res) => {
    let { id } = req.params;
    let currentUser = await UserModel.findOne({
        where: { id }
    })
    if (currentUser) {
        try {
            await UserModel.destroy({
                where: { id }
            })
            return res.status(200).json({
                error: 'Usuario eliminado con éxito'
            })
        } catch (error) {
            return res.status(500).json({
                error
            })
        }
    } else {
        return res.status(404).json({
            error: 'Usuario no encontrado'
        })
    }
}

module.exports = {
    getUsers,
    deleteUserById,
}