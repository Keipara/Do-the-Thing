

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
    for (let i = 0; i< tasks.length; i++) {
      const task = tasks[i];
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


// const deleteButton = document.getElementsByClassName("delete-button")
// deleteButton.addEventListener('click', async() => {
//   try {
//     const res = await fetch(`/tasks/${task.id}`, {
//       method: "DELETE",
//     });
//   } catch (e) {
//   }
// })
