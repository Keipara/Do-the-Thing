var express = require('express');
var router = express.Router();
const db = require('../db/models')
const { Task, List } = db;
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

module.exports = router;
