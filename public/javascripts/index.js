

  let addTaskButton = document.querySelector(".addTaskButton")
  addTaskButton.addEventListener("click", (event) => {
    const taskContainer = document.querySelector(".task-list")
    let addTaskbox = document.querySelector(".addTaskbox")
    let taskName = addTaskbox.value
    if (addTaskbox) {
      let newATag = document.createElement('a')
      addTask(taskName)
      taskContainer.appendChild(newATag)
    }
  })

  async function addTask(taskName) {
    try {
      const res = await fetch("/task-list", {
        headers: {'Content-type': 'application/json'}
      });
    } catch (e) {
    }
  }


document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch("/tasks/task-list");
    const {tasks} = await res.json();
    const taskContainer = document.querySelector(".task-list")

    createTasksList(tasks, taskContainer);

    //List-Summary
    let completeCounter = 0;
    let incompleteCounter = 0;
    let overdueCounter = 0;
    //

    for (let i = 0; i< tasks.length; i++) {
      const task = tasks[i];

      //List-Summary
      console.log(task.complete)
      if (task.complete === false) {
        incompleteCounter++;
      } else {
        completeCounter++;
      }

      if (task.due <= Date() ) {
        overdueCounter++;
      }

      let taskTotal= document.querySelector(".tasksNumber")
      taskTotal.innerHTML = incompleteCounter
      let completeTotal = document.querySelector(".completedNumber")
      completeTotal.innerHTML = completeCounter
      let overdueTotal = document.querySelector(".overdueNumber")
      overdueTotal.innerHTML = overdueCounter
      //

      const div = document.createElement('div')
      const aTag = document.createElement('a');
      aTag.innerText = task.name
      aTag.className = "all-tasks";
      aTag.id = task.id

      const deleteButton = document.createElement('button');
      deleteButton.className = "delete-button";
      deleteButton.innerText = "Delete";
      deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        removeTask(task.id)
        event.target.parentElement.remove();
      })
      div.appendChild(aTag)
      aTag.appendChild(deleteButton);
      taskContainer.appendChild(div)

    }

  } catch (e) {
    console.error(e)
    }
})


function createTasksList(tasks, taskContainer) {
  for (let i = 0; i< tasks.length; i++) {
    const task = tasks[i];

    const taskDiv = document.createElement('div')
    taskDiv.className = "task-div"

    const para = document.createElement("p");
      para.id = task.id;
      para.innerText = task.name;
      para.addEventListener("click", async (event) => {
        event.preventDefault();
        const listSummaryContainer = document.querySelector(".list-summary-container");
        listSummaryContainer.style.display = "none";

        const taskEditContainer = document.querySelector(".task-edit-container");
        taskEditContainer.style.display = "block";

        const taskId = event.target.id
        editTask(taskId)
        // event.target.innerText = "new text!"

      })

    const deleteButton = document.createElement('button');
    deleteButton.className = "delete-button";
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      removeTask(task.id)
      event.target.parentElement.remove();
    })

    para.appendChild(deleteButton);
    taskDiv.appendChild(para);
    taskContainer.appendChild(taskDiv)
  }
}

  async function removeTask(taskId) {
    try {
      const res = await fetch(`/tasks/delete/${taskId}`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'}
      });
    } catch (e) {
    }
  }

  async function editTask(taskId) {
     try {
      const res = await fetch(`/tasks/${taskId}/edit`);
      const data = await res.json();

      const taskNameInput = document.querySelector("#task-name-input");
      taskNameInput.value = data.task.name;

      const listSelect = document.querySelector("#list-select");
      listSelect.value = data.task.listId;

      const taskDueDate = document.querySelector("#task-due-date");
      taskDueDate.value = data.task.due;

      const taskDescription = document.querySelector("#task-description");
      taskDescription.value = data.task.description;

      // const editForm = document.querySelector("#task-edit-form")
      // editForm.action = `/tasks/${data.task.id}/edit`;

      const editSaveButton = document.querySelector("#edit-save-button");
      editSaveButton.addEventListener("click", async (event) => {
        event.preventDefault();

        const taskNameInput = document.querySelector("#task-name-input");
        const newName = taskNameInput.value

        const listSelect = document.querySelector("#list-select");
        const newListId = listSelect.value

        const taskDueDate = document.querySelector("#task-due-date");
        const newDueDate = taskDueDate.value

        const taskDescription = document.querySelector("#task-description");
        const newDescription = taskDescription.value

        await fetch (`/tasks/${data.task.id}/edit`, {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            name: newName,
            due: newDueDate,
            listId: newListId,
            description: newDescription
          }),
        });

        const listSummaryContainer = document.querySelector(".list-summary-container");
        listSummaryContainer.style.display = "block";

        const taskEditContainer = document.querySelector(".task-edit-container");
        taskEditContainer.style.display = "none";
      });

      const editCloseButton = document.querySelector("#edit-close-button");
      editCloseButton.addEventListener("click", event => {

        const listSummaryContainer = document.querySelector(".list-summary-container");
        listSummaryContainer.style.display = "block";

        const taskEditContainer = document.querySelector(".task-edit-container");
        taskEditContainer.style.display = "none";

      })

    } catch (e) {
    }
  }

//search for tasks
let searchButton = document.getElementById("search-button");

searchButton.addEventListener("click", async (event) => {
  let searchBox = document.getElementById("search-box");
  let searchTerm = searchBox.value;

  if(searchTerm) {
    try {
      const res = await fetch(`/tasks/search/${searchTerm}`);
      const { tasks } = await res.json();
      const taskContainer = document.querySelector(".task-list");

        if(tasks.length !== 0) {
          taskContainer.innerHTML = "";
          createTasksList(tasks, taskContainer)
        } else {
            taskContainer.innerHTML = 'Sorry! No results found.'
          }

    } catch (e) {
        console.error(e);
      }
  }

  let mainContainer = document.querySelector(".main-container");
  mainContainer.addEventListener("click", async(event) => {
    let searchBox = document.getElementById("search-box");
    searchBox.value = "";
  })

});


 document.addEventListener("DOMContentLoaded", async() => {
    try {
      const res = await fetch("/tasks/list-list");
      const { lists } = await res.json();
      const listContainer = document.querySelector(".list-list");
      createListsList(lists, listContainer);
    } catch (e) {
      console.error(e)
    }
  });

  function createListsList(lists, listContainer) {
    for (let i = 0; i< lists.length; i++) {
      const list = lists[i];

      const listDiv = document.createElement('div')
      listDiv.className = "list-div"
      const para = document.createElement("p");
        para.id = list.id;
        para.innerText = list.name;
        para.addEventListener("click", async (event) => {
          event.preventDefault();
          try {
            const res = await fetch(`tasks/${list.id}/tasks`);
            const {tasks} = await res.json();
            const taskContainer = document.querySelector(".task-list")
            taskContainer.innerHTML = "";
            createTasksList(tasks, taskContainer);
          } catch (e) {
            console.error(e)
            }

        })

      listDiv.appendChild(para);
      listContainer.appendChild(listDiv)
    }
  }

  let addListButton = document.querySelector(".add-list-button");
  addListButton.addEventListener("click", (event) => {
    const listContainer = document.querySelector(".list-list");
    let listInput = document.querySelector(".list-input");
    let listName = listInput.value;
    if (listInput) {
      let newListTag = document.createElement('a')
      addList(listName)
      listContainer.appendChild(newListTag)
    }
  })

  async function addList(listName) {
    try {
      const res = await fetch("/add-list", {
        headers: {'Content-type': 'application/json'}
      });
    } catch (e) {
    }
  }

  // add-list-button

// const deleteButton = document.getElementsByClassName("delete-button")
// deleteButton.addEventListener('click', async() => {
//   try {
//     const res = await fetch(`/tasks/${task.id}`, {
//       method: "DELETE",
//     });
//   } catch (e) {
//   }
// })
