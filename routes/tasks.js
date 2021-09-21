var express = require('express');
var router = express.Router();
const db = require('../db/models')
const { Task } = db;
const {asyncHandler, handleValidationErrors} = require("./utils");

router.get("/", asyncHandler(async (req, res) => {
    const tasks = await Task.findAll();
    res.render("tasks.pug")
    // res.json({ tasks });
  })
);

router.get("/task-list", asyncHandler(async (req, res) => {
  const tasks = await Task.findAll();
  res.json({ tasks });
})
);


router.post("/", asyncHandler(async (req, res) => {
    const { name, complete, listId, createdAt, updatedAt} = req.body;
    const task = await Task.create({ name, complete, listId, createdAt, updatedAt });
    res.status(201).redirect('/tasks')
  })
);

module.exports = router;
