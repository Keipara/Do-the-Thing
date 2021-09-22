var express = require('express');
var router = express.Router();
const db = require('../db/models')
const { Task } = db;
const {asyncHandler, handleValidationErrors} = require("./utils");



const taskNotFoundError = (id) => {
  const err = Error(`Task with id of ${id} could not be found.`);
  err.title = "Task not found.";
  err.status = 404;
  return err;
};

router.get("/", asyncHandler(async (req, res) => {
    const tasks = await Task.findAll();
    res.render("tasks.pug")
    // res.json({ tasks });
  })
);

router.get("/task-list", asyncHandler(async (req, res) => {
  const tasks = await Task.findAll();
  res.json({ tasks });
  //get userId to find taskList related to user. 
})
);


router.post("/", asyncHandler(async (req, res) => {
    const { name, complete, listId, createdAt, updatedAt} = req.body;
    const task = await Task.create({ name, complete, listId, createdAt, updatedAt });
    res.status(201).redirect('/tasks')
  })
);

router.get("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await Task.findByPk(taskId);
    res.json({ task });
  })
);

router.patch("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await Task.findByPk(taskId);

    if (task) {
      await task.update({ name: req.body.name });
      res.json({ task });
    } else {
      next(taskNotFoundError(taskId));
    }
  })
);


router.delete("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await Task.findByPk(taskId);

    if (task) {
      await task.destroy();
      res.status(204).end();
    } else {
      next(taskNotFoundError(taskId));
    }
  })
);


module.exports = router;
