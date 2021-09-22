window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})

document.addEventListener("DOMContentLoaded", async () => {
  // let addTaskBtn = document.querySelector(".addTaskBtn")
  // const addTask = () => {

  // }
    try {
      const res = await fetch("/tasks/task-list");
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
