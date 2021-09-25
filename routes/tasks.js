var express = require('express');
const { Op } = require("sequelize");
const { loginUser, restoreUser, logoutUser, requireAuth } = require("../auth");
const { csrfProtection, asyncHandler, handleValidationErrors } = require('./utils');

var router = express.Router();

const { Task, List, User, sequelize }= require('../db/models')




const taskNotFoundError = (id) => {
  const err = Error(`Task with id of ${id} could not be found.`);
  err.title = "Task not found.";
  err.status = 404;
  return err;
};

//loads the main page when a user logs in
router.get("/", csrfProtection, requireAuth, asyncHandler(async (req, res) => {
    const tasks = await Task.findAll();
    const task = Task.build();
    const lists = await List.findAll({
      where: {
        userId: res.locals.user.id
      }
    });
    res.render("tasks.pug", {
      task,
      lists,
      // csrfToken: req.csrfToken()
    })
    // res.json({ tasks });
  })
);

//finds the lists belonging to the logged in user
//and sends all the tasks associated with that list
router.get("/task-list", requireAuth, asyncHandler(async (req, res) => {
  const tasks = await Task.findAll({
    include: [{
      model: List,
      where:{userId: res.locals.user.id},
      order: ["id"]
    }]
  });
  res.json({ tasks });
})
);

//??????
router.get("/add-list", requireAuth, asyncHandler(async (req, res) => {
  const lists = await List.findAll({

      where:{userId: res.locals.user.id},

  });
  res.json({ tasks });
})
);


// router.post("/task-list", asyncHandler(async (req, res) => {
//     const { name, complete, listId, createdAt, updatedAt} = req.body;
//     const task = await Task.create({ name, complete, listId, createdAt, updatedAt });
//     res.redirect('/tasks')
//   })
// );

//?????
router.post("/:id(\\d+)", requireAuth, asyncHandler(async (req, res, next) => {
    const taskId = parseInt(req.params.id, 10);
    const task = await Task.findByPk(taskId);
    res.json({ task });
  })
);
//??????
router.patch("/:id(\\d+)", requireAuth, asyncHandler(async (req, res, next) => {
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

//deletes a task from the Tasks table
router.post("/delete/:id(\\d+)", requireAuth, asyncHandler(async (req, res, next) => {
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

//deletes a list from the Lists table
router.post("/lists/delete/:listId(\\d+)", requireAuth, asyncHandler(async (req, res, next) => {
  const listId = parseInt(req.params.listId, 10);

  const list = await List.findByPk(listId);
  if (list) {
    await list.destroy();
    res.status(204).end();
  } else {
    next(taskNotFoundError(listId));
  }
})
);

//searches for the tasks containing the search term
router.get("/search/:searchTerm(\\w+)", requireAuth, asyncHandler(async (req, res) => {
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

//when a user clicks on a task, this route receives the task id
//and pulls the task details from the Task table
//and sends them to be populated in the task edit panel
router.get("/:id(\\d+)/edit", csrfProtection, requireAuth, asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.id, 10);
    const task = await Task.findByPk(taskId);
    const lists = await List.findAll({
      where: {
        userId: res.locals.user.id
      }
    });

    res.json({ task, lists });

    // res.render("task-edit.pug", {
    //   title: 'Task Edit Form',
    //   task,
    //   lists,
    //   csrfToken: req.csrfToken(),
    // })
  })
);

//receives the task edits from the task edit panel
//and updates the changes in the Tasks table
router.post("/:id(\\d+)/edit", requireAuth, asyncHandler(async (req, res) => {

  const taskId = parseInt(req.params.id, 10);
  let { name, due, listId, complete, description} = req.body;
  const taskToUpdate = await Task.findByPk(taskId);
  let task = {};

  if(!due) {
    due = taskToUpdate.due;
  }

  if(description === "") {
    task = { name, due, listId, complete }
  } else {
    task = { name, due, listId, complete, description }
  }

  await taskToUpdate.update(task);
  // res.redirect('/tasks')
  res.status(204).end();
}))

//gets the tasks belonging to a particular list
router.get("/:id(\\d+)/tasks", requireAuth, asyncHandler(async (req, res, next) => {
  const listId = parseInt(req.params.id, 10);
  const tasks = await Task.findAll({
    include: [{
      model: List,
      where:{
        id: listId
       }
    }]
  });
  res.json({ tasks });
})
);

//gets the lists belonging to a particular user
router.get("/list-list", requireAuth, asyncHandler(async (req, res) => {
  const lists = await List.findAll({
        where:{
          userId: res.locals.user.id
        }
      });
  res.json({ lists });
})
);

//adds a new list to the Lists table
router.post("/add-list", requireAuth, asyncHandler(async (req, res) => {
  const {name} = req.body;
  const list =await List.create({
    name,
    userId: res.locals.user.id
  })
  res.redirect('/tasks')
}))


//adds a new task to the Task table
router.post("/add-task", requireAuth, asyncHandler(async (req, res) => {
    let { name, listId} = req.body;

    if(!listId) {
      const list = await List.findAll({
        where:{
          userId: res.locals.user.id
        },
        order: ["id"],
        limit: 1
      });

      listId = list[0].id;

    }

    const newTask = await Task.create({
      name,
      listId: listId
    });
    res.status(204).end();
  })
);

//???????
router.post('/lists/delete/:id(\\d+)', requireAuth, asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = await db.Book.findByPk(bookId);

    checkPermissions(book, res.locals.user);

    await book.destroy();
    res.redirect('/');
  }));



module.exports = router;
