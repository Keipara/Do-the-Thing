window.addEventListener("load", (event)=>{
    console.log("hello from javascript!")
})

document.addEventListener("DOMContentLoaded", async () => {
    try {
      const res = await fetch("/tasks/task-list");
      const { tasks } = await res.json();
      const taskContainer = document.querySelector(".task-list");

      const taskHtml = tasks.map(
          ( task ) =>
          `
            <div class="card">
          <div class="card-body">
          <p class="card-text">${task.name}</p>
          </div>
          </div>
          `
          );
      taskContainer.innerHTML = taskHtml.join("");
    } catch (e) {
      console.error(e);
    }
  });
