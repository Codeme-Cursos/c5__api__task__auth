const TaskModel = require("../models/task.model");
const UserModel = require("../models/user.model");

const getTasks = async (req, res) => {
  try {
    let gotTasks = await TaskModel.findAll({
      include: {
        model: UserModel,
        attributes: ["username", "email"],
      },
    });
    return res.status(200).json(gotTasks);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

const getTaskById = async (req, res) => {
  let { id } = req.params;
  let currentTaks = await TaskModel.findOne({
    where: {
      id,
    },
  });
  if (currentTaks) {
    try {
      let { id } = req.params;
      let gotTask = await TaskModel.findOne({
        where: {
          id,
        },
      });
      return res.status(200).json(gotTask);
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  } else {
    return res.status(404).json({
      error: `Tarea no encontrada`,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { responsable, description, userid } = req.body;
    let currentUser = await UserModel.findOne({
      where: {
        id: userid,
      },
    });
    if (!currentUser) {
      return res.status(404).json({
        error: "Usuario no encotrado",
      });
    }
    let postedTask = await TaskModel.create(
      {
        responsable,
        description,
        userid,
      },
      {
        fields: ["responsable", "description", "userid"],
      }
    );
    if (postedTask) {
      return res.status(201).json({
        success: "Tarea creada con éxito",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

const patchTaskById = async (req, res) => {
  let { id } = req.params;
  let currentTaks = await TaskModel.findOne({
    where: {
      id,
    },
  });
  if (currentTaks) {
    try {
      let { responsable, description } = req.body;
      await currentTaks.update({
        responsable,
        description,
      });
      return res.status(200).json({
        success: "Tarea editada con éxito",
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  } else {
    return res.status(404).json({
      error: `Tarea no econtrada`,
    });
  }
};

const deleteTaskById = async (req, res) => {
  let { id } = req.params;
  let currentTaks = await TaskModel.findOne({
    where: {
      id,
    },
  });
  if (currentTaks) {
    try {
      await TaskModel.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json({
        success: "Tarea eliminada con éxito",
      });
    } catch (error) {
      return res.status(500).json({
        error,
      });
    }
  } else {
    return res.status(404).json({
      error: `Tarea no encontrada`,
    });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  patchTaskById,
  deleteTaskById,
};
