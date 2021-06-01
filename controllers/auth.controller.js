const UserModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    let user = await UserModel.findOne({
        where: {
            email
        }
    })
    if (!user) {
        try {
            const salt = await bcrypt.genSalt(8);
            const encryptedPassword = await bcrypt.hash(password, salt);
            const registeredUser = await UserModel.create({
                username,
                email,
                password: encryptedPassword
            }, {
                fields: ['username', 'email', 'password']
            })
            return res.status(201).json(registeredUser)
        } catch (error) {
            return res.status(500).json({
                message: `Error: ${error}`
            })
        }
    } else {
        return res.status(500).json({
            message: 'Email already exist'
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    let user = await UserModel.findOne({
        where: {
            email
        }
    });
    if (user) {
        try {
            const checkPassword = await bcrypt.compare(password, user.password)
            const token = jwt.sign({ user }, process.env.JWT_SECRET, {
                expiresIn: 86400 //24 hours in seconds
            })
            if (checkPassword) {
                return res.status(200).json({
                    user: {
                        username: user.username,
                        email: user.email
                    },
                    token
                })
            } else {
                return res.status(400).json({
                    message: 'Wrong password'
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: `Error: ${error}`
            })
        }
    } else {
        return res.status(404).json({
            message: 'User not found'
        })
    }
}

module.exports = {
    register,
    login,
}

