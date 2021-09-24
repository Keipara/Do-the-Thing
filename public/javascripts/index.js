

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


async function removeTask(taskId) {
  try {
    const res = await fetch(`/tasks/delete/${taskId}`, {
      method: 'POST',
      headers: {'Content-type': 'application/json'}
    });
  } catch (e) {
  }
}

 document.addEventListener("DOMContentLoaded", async() => {
    try {
      const res = await fetch("/tasks/list-list");
      const { lists } = await res.json();
      const listContainer = document.querySelector(".list-list");

      const listHtml = lists.map(
          (list) =>
          `
          <div class="card">
          <div class="card-body">
          <p class="card-text">${list.name}</p>
          </div>
          </div>
          `
          );
      listContainer.innerHTML = listHtml.join("");
    } catch (e) {
      console.error(e)
    }
  });

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
