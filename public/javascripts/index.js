document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch("/tasks/task-list");
    const {tasks} = await res.json();
    const taskContainer = document.querySelector(".task-list")

    let completeCounter = 0;
    let incompleteCounter = 0;
    let overdueCounter = 0;
    createTasksList(tasks, taskContainer);

    //List-Summary

    for (let i = 0; i< tasks.length; i++) {
      let task = tasks[i];

      //List-Summary
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
    }

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

        const completeStatus = document.querySelector("#complete-select");
        const newStatus = completeStatus.checked

        const taskId = event.target.dataset.taskId;
        const res = await fetch (`/tasks/${taskId}/edit`, {
          method: 'POST',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            name: newName,
            due: newDueDate,
            listId: newListId,
            complete: newStatus,
            description: newDescription
          }),
        });

        if(res.ok) {
          window.location.reload();
        }

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
    console.error(e)
    }
})


function createTasksList(tasks, taskContainer) {
  const incompleteContainer = document.querySelector(".task-list")
  const completeContainer = document.querySelector(".complete-tasks")
  incompleteContainer.innerHTML = "";
  completeContainer.innerHTML = "";


  const taskDiv = document.createElement('div')
  taskDiv.className = "task-div"
  for (let i = 0; i< tasks.length; i++) {
    const task = tasks[i];


    const para = document.createElement("p");
      para.id = task.id;
      para.innerText = task.name;
      para.className = "edit-task-para"
      para.addEventListener("click", (event) => {
        event.preventDefault();
        if(event.target.classList.contains("edit-task-para")) {
          const listSummaryContainer = document.querySelector(".list-summary-container");
          listSummaryContainer.style.display = "none";


          const taskEditContainer = document.querySelector(".task-edit-container");
          taskEditContainer.style.display = "block";


          const taskId = event.target.id
          const editSubmitButton = document.querySelector("#edit-save-button")
          editSubmitButton.dataset.taskId = taskId;
          editTask(taskId)
        }
      })


    if (task.complete === false) {
      const checkbox = document.querySelector("#complete-select")
      checkbox.checked = false
      const completeButton = document.createElement('button');
      completeButton.className = 'complete-button';
      completeButton.innerText = "Complete";
      const deleteButton = document.createElement('button')
    deleteButton.className = "delete-button";
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      removeTask(task.id)
      event.target.parentElement.remove();
    })
      para.appendChild(deleteButton);
      taskDiv.appendChild(para);

      incompleteContainer.appendChild(taskDiv)
    } else if (task.complete === true) {
      const completeTaskDiv = document.createElement('div')
      completeTaskDiv.className = "complete-task-div"
      const deleteButton = document.createElement('button')
      deleteButton.className = "complete-task-delete-btn"
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      removeTask(task.id)
      event.target.parentElement.remove();
    })
      const checkbox = document.querySelector("#complete-select")
      checkbox.checked = true
      para.appendChild(deleteButton);
      completeTaskDiv.appendChild(para)
      completeContainer.appendChild(completeTaskDiv)
    }
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
      if(data.task.due) {
        taskDueDate.value = data.task.due.slice(0,10);
      } else {
        taskDueDate.value = "9999-12-31";
      }


      const taskDescription = document.querySelector("#task-description");
      taskDescription.value = data.task.description;

      const completeStatus = document.querySelector("#complete-select");
      completeStatus.value = data.task.complete;
      if (completeStatus.value === false) {
        const completeButton = document.createElement('button');
        completeButton.className = 'complete-button';
        completeButton.innerText = "Complete";
        para.appendChild(deleteButton);
        taskDiv.appendChild(para);

        incompleteContainer.appendChild(taskDiv)
      } else {
        para.appendChild(deleteButton);
        taskDiv.appendChild(para);

        completeContainer.appendChild(taskDiv)
      }
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

  let selectedList;

  function createListsList(lists, listContainer) {
    for (let i = 0; i< lists.length; i++) {
      const list = lists[i];

      const listDiv = document.createElement('div')
      listDiv.className = "list-div"
      const para = document.createElement("p");
        para.id = list.id;
        para.innerText = list.name;
        para.className = "listNames"
        para.addEventListener("click", async (event) => {
          event.preventDefault();
          try {
            const res = await fetch(`tasks/${list.id}/tasks`);

            selectedList = list.id;
            const {tasks} = await res.json();
            const taskContainer = document.querySelector(".task-list")
            taskContainer.innerHTML = "";
            createTasksList(tasks, taskContainer);
            let incompleteCounter = 0;
            let completeCounter = 0;
            let overdueCounter = 0;
            for (let i = 0; i < tasks.length; i++) {
             let task = tasks[i];
             if (task.complete === false) {
               incompleteCounter++
             } else {
               completeCounter++
             }
             if (task.due <= Date()) {
               overdueCounter++;
             }
            }
            let taskTotal= document.querySelector(".tasksNumber")
            let completeTotal = document.querySelector(".completedNumber")
            let overdueTotal = document.querySelector(".overdueNumber")
            taskTotal.innerHTML = incompleteCounter
            completeTotal.innerHTML = completeCounter
            overdueTotal.innerHTML = overdueCounter
            const listName = document.querySelector('.listName')
            listName.innerText = para.innerText

          } catch (e) {
            console.error(e)
            }

        })
      const deleteListButton = document.createElement('button')
      deleteListButton.className = "delete-list-button"
      const trashCanButton = document.createElement('i')
    trashCanButton.className = "fa fa-trash-o"
    trashCanButton.style.fontSize = "12px"
      deleteListButton.addEventListener('click', (event) => {
        event.preventDefault();
        removeList(list.id)
        event.target.parentElement.remove();
      })
      deleteListButton.appendChild(trashCanButton)
      para.appendChild(deleteListButton)
      listDiv.appendChild(para);
      listContainer.appendChild(listDiv)


    }

  }

  const addTaskButton = document.querySelector(".addTaskButton")
      addTaskButton.addEventListener("click", (event) => {
        event.preventDefault()
        let addTaskbox = document.querySelector(".addTaskbox")
        if (addTaskbox.value !== "") {
          let taskName = addTaskbox.value;
          addTask(taskName, selectedList);
        }
      })


  async function addTask(taskName, listId) {

    try {
      const res = await fetch("/tasks/add-task", {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({
          name: taskName,
          listId
        }),
      });

      if(res.ok) {
        window.location.reload();
      }

    } catch (e) {
    }
  }

  async function removeList(listId) {
    try {
      const res = await fetch(`/tasks/lists/delete/${listId}`, {
        method: 'POST',
        headers: {'Content-type': 'application/json'}
      });

      if(res.ok) {
        window.location.reload();
      }
    } catch (e) {
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


//List Summary
document.addEventListener('DOMContentLoaded', async () => {
  let incompleteTab = document.querySelector(".button-1");
  let completeTab = document.querySelector(".button-2");
  const taskContainer = document.querySelector(".task-list")
  const completeContainer = document.querySelector(".complete-tasks")
  incompleteTab.style.border = "1px solid"
  incompleteTab.style.fontWeight = "bold"
  completeTab.addEventListener("click", async (event) => {

    taskContainer.style.display = "none";
    completeContainer.style.display = "block";
    incompleteTab.style.border = "none"
    incompleteTab.style.fontWeight = "normal"
    completeTab.style.border = "1px solid"
    completeTab.style.fontWeight = "bold"
  });

  incompleteTab.addEventListener("click", async (event) => {

    taskContainer.style.display = "block";
    completeContainer.style.display = "none";
    completeTab.style.border = "none"
    completeTab.style.fontWeight = "normal"
    incompleteTab.style.border = "1px solid"
    incompleteTab.style.fontWeight = "bold"
  });
});
