const TaskModel = require('../models/task.model');
const UserModel = require('../models/user.model');

const getTasks = async (req, res) => {
    try {
        let gotTasks = await TaskModel.findAll({
            include:{
                model: UserModel,
                attributes: ['username', 'email']
            }
        });
        return res.status(200).json(gotTasks);
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error}`
        })
    }
}

const getTaskById = async (req, res) => {
    let { id } = req.params;
    let currentTaks = await TaskModel.findOne({
        where: {
            id
        }
    });
    if (currentTaks) {
        try {
            let { id } = req.params;
            let gotTask = await TaskModel.findOne({
                where: {
                    id
                }
            });
            return res.status(200).json(gotTask);
        } catch (error) {
            return res.status(500).json({
                message: `Error: ${error}`
            })
        }
    } else {
        return res.status(404).json({
            message: `Task not found`
        })
    }
}

const createTask = async (req, res) => {
    try {
        const { responsable, description, userid } = req.body;
        let currentUser = await UserModel.findOne({
            where: {
                id: userid
            }
        });
        if (!currentUser) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        let postedTask = await TaskModel.create({
            responsable,
            description,
            userid,
        }, {
            fields: ['responsable', 'description', 'userid']
        });
        if (postedTask) {
            return res.status(201).json({
                message: 'Task created successfully',
                data: postedTask
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: `Error: ${error}`
        })
    }
}

const patchTaskById = async (req, res) => {
    let { id } = req.params;
    let currentTaks = await TaskModel.findOne({
        where: {
            id
        }
    });
    if (currentTaks) {
        try {
            let { responsable, description } = req.body;
            let updatedTask = await currentTaks.update({
                responsable,
                description
            });
            return res.status(201).json({
                data: updatedTask
            });
        } catch (error) {
            return res.status(500).json({
                message: `Error: ${error}`
            });
        }
    } else {
        return res.status(404).json({
            message: `Task not Found`
        })
    }
}

const deleteTaskById = async (req, res) => {
    let { id } = req.params;
    let currentTaks = await TaskModel.findOne({
        where: {
            id
        }
    })
    if (currentTaks) {
        try {
            await TaskModel.destroy({
                where: {
                    id
                }
            })
            return res.status(200).json({
                message: 'Task deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                message: `Error: ${error}`
            });
        }
    } else {
        return res.status(404).json({
            message: `Task not found`
        });
    }
}

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    patchTaskById,
    deleteTaskById,
}