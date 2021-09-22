var express = require('express');
const { Op } = require("sequelize");
var router = express.Router();

const { Task, List, User, sequelize }= require('../db/models')
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


router.get("/search/:searchTerm(\\w+)", asyncHandler(async (req, res) => {
   const searchTerm = req.params.searchTerm;
   const tasks = await Task.findAll({
     where: {
        name: {
          [Op.iLike]: `%${searchTerm}%`,
        }
    },
    include: [
      {
        model: List,
        where:{
          userId: res.locals.user.id
        }
      }
    ]
  });
  res.json({ tasks });
})
);

router.get("/list-list", asyncHandler(async (req, res) => {
  const lists = await List.findAll();
  res.json({ lists });
})
);

router.post("/", asyncHandler(async (req, res) => {
  const {name} = req.body;
  const list = db.List.build({
    name,
    userId: 1
  })
  await list.save()
  res.redirect("/tasks")
  //get userId from cookies
})
);

router.post("/", asyncHandler(async (req, res) => {
    const { name, complete, listId, createdAt, updatedAt} = req.body;
    const task = await Task.create({ name, complete, listId, createdAt, updatedAt });
    res.status(201).redirect('/tasks')
  })
);

module.exports = router;
