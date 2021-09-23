

window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})

// document.addEventListener("DOMContentLoaded", async () => {
//   // let addTaskBtn = document.querySelector(".addTaskBtn")
//   // const addTask = () => {

//   // }
//     try {
//       const res = await fetch("/tasks/task-list", {});
//       const { tasks } = await res.json();
//       const taskContainer = document.querySelector(".task-list");


//       // const taskHtml = tasks.map(
//       //     ( task ) =>
//       //     `
//       //       <div class="card">
//       //     <div class="task">
//       //     <input type="checkbox"</input>${task.name}
//       //     </div>
//       //     </div>
//       //     `
//       //     );
//       const taskHtml = tasks.map(
//         (task) =>
//         `
//             <div class="card">
//           <div class="task">
//           <input type="checkbox"</input>${task.name}

//           </div>
//           </div>
//           `
//       )

//       taskContainer.innerHTML = taskHtml.join("");
//       const deleteButton = document.querySelector('.deleteButton')
//       deleteButton.addEventListener("click", (event) => {
//         event.target.
//       })
//     } catch (e) {
//       console.error(e);
//     }
//     // addTaskBtn.addEventListener('click', addTask)
//   });



  let addTaskButton = document.querySelector(".addTaskButton")
  addTaskButton.addEventListener("click", async () => {
    // let addTaskBtn = document.querySelector(".addTaskBtn")
    // const addTask = () => {

    // }
      try {
        const res = await fetch("/tasks/task-list", {});
        const { tasks } = await res.json();
        const taskContainer = document.querySelector(".task-list");

        const taskHtml = tasks.map(
            ( task ) =>
            `
              <div class="card">
            <div class="card-body">
            <input type="checkbox"</input>${task.name}
            </div>
            </div>
            `
            );
        taskContainer.innerHTML = taskHtml.join("");
      } catch (e) {
        console.error(e);
      }
      // addTaskBtn.addEventListener('click', addTask)
    });

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch("/tasks/task-list");
    const {tasks} = await res.json();
    const taskContainer = document.querySelector(".task-list")
    for (let i = 0; i< tasks.length; i++) {
      const task = tasks[i];

      const a = document.createElement('a');
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
      aTag.appendChild(deleteButton);
      taskContainer.appendChild(aTag)
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
