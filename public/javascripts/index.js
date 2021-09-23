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

      for(let i = 0; i < tasks.length; i++) {
        const task = tasks[i];

        const outerDiv = document.createElement("div");
        outerDiv.className = "each-task";

        const para = document.createElement("p");

        const aTag = document.createElement('a');
        aTag.className = "task-tag"
        aTag.href = `/tasks/${task.id}/edit`
        aTag.innerText = task.name;

        para.appendChild(aTag)
        outerDiv.appendChild(para);
        taskContainer.appendChild(outerDiv);
      }

    } catch (e) {
      console.error(e);
    }
    // addTaskBtn.addEventListener('click', addTask)
  });


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


  document.addEventListener("DOMContentLoaded", async() => {
    try {
      const res = await fetch("/tasks/add-list", {
        method: "POST",
        header: {"Content-Type": "application/json"},
        body: JSON.stringify(listName)
      });
      const {list} = await res.json();
      const listContainer = document.querySelector(".list-list");
      const listHtml = lists.map((list) => {
      `
            <div class="card">
          <div class="card-body">
          <input type="checkbox"</input>${list.name}
          </div>
          </div>
      `});
      listContainer.innerHTML = listHtml.join("");
    } catch (e) {
      console.error(e);
    }
  });

//  const taskEdit = async (taskId) => {
//     console.log(`Received ${taskId} in function`)
//     const res = await fetch(`/tasks/${taskId}/edit`);
//     const { task } = await res.json();

//     const listSummaryContainer = document.querySelector(".list-summary-container");
//     listSummaryContainer.style.display = 'none';

//     const taskEditContainer = document.querySelector(".task-edit-container");
//     taskEditContainer.innerHTML = "Task Details";
//     taskEditContainer.style.display = 'block';

//     let closeButton = document.createElement("input");
//     closeButton.type = "submit";
//     closeButton.value = "Close";

//     closeButton.addEventListener("click", event => {
//       listSummaryContainer.style.display = 'block';
//       taskEditContainer.style.display = 'none';
//     })

//     taskEditContainer.appendChild(closeButton);

// }
