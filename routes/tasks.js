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

router.get("/", csrfProtection, asyncHandler(async (req, res) => {
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

router.get("/task-list", asyncHandler(async (req, res) => {
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


router.get("/add-list", asyncHandler(async (req, res) => {
  const lists = await List.findAll({

      where:{userId: res.locals.user.id},

  });
  res.json({ tasks });
})
);

router.post("/task-list", asyncHandler(async (req, res) => {
    const { name, complete, listId, createdAt, updatedAt} = req.body;
    const task = await Task.create({ name, complete, listId, createdAt, updatedAt });
    res.redirect('/tasks')
  })
);

router.post("/:id(\\d+)", asyncHandler(async (req, res, next) => {
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


router.post("/delete/:id(\\d+)", asyncHandler(async (req, res, next) => {
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

router.post("/lists/delete/:listId(\\d+)", asyncHandler(async (req, res, next) => {
  const listId = parseInt(req.params.listId, 10);
  console.log(req.params.listId)
  const list = await List.findByPk(listId);
  if (list) {
    await list.destroy();
    res.status(204).end();
  } else {
    next(taskNotFoundError(listId));
  }
})
);

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

router.post("/:id(\\d+)/edit", requireAuth, asyncHandler(async (req, res) => {

  const taskId = parseInt(req.params.id, 10);
  let { name, due, listId, description} = req.body;
  const taskToUpdate = await Task.findByPk(taskId);
  let task = {};

  if(!due) {
    due = taskToUpdate.due;
  }

  if(description === "") {
    task = { name, due, listId }
  } else {
    task = { name, due, listId, description }
  }

  await taskToUpdate.update(task);
  // res.redirect('/tasks')
  res.status(204).end();
}))

router.get("/:id(\\d+)/tasks", asyncHandler(async (req, res, next) => {
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

router.get("/list-list", asyncHandler(async (req, res) => {
  const lists = await List.findAll({
        where:{
          userId: res.locals.user.id
        }
      });
  res.json({ lists });
})
);


router.post("/add-list", asyncHandler(async (req, res) => {
  const {name} = req.body;
  const list =await List.create({
    name,
    userId: res.locals.user.id
  })
  res.redirect('/tasks')
}))

// router.post("/task-list", asyncHandler(async (req, res) => {
//     const { name, listId} = req.body;
//     const task = await Task.create({
//       name,
//       listId: {
//         defaultValue: 1
//       }
//     });
//     const newTask = await Task.findOne({
//       where: {
//         name
//       }
//     })
//     res.json({newTask})
//   })
// );

router.post('/lists/delete/:id(\\d+)', asyncHandler(async (req, res) => {
    const bookId = parseInt(req.params.id, 10);
    const book = await db.Book.findByPk(bookId);

    checkPermissions(book, res.locals.user);

    await book.destroy();
    res.redirect('/');
  }));



module.exports = router;
