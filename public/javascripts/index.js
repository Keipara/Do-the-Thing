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


  // document.addEventListener("DOMContentLoaded", async() => {
  //   try {
  //     const res = await fetch("/tasks", {
  //       method: "POST",
  //       header: {"Content-Type": "application/json"},
  //       body: JSON.stringify(Object)
  //     });
  //     const { lists } = await res.json();
  //     const listContainer = document.querySelector(".list-list");

  //     const listHtml = lists.map(
  //         () =>
  //         `
  //         <div class="card">
  //         <div class="card-body">
  //         <p class="card-text">${lists}</p>
  //         </div>
  //         </div>
  //         `
  //         );
  //     listContainer.innerHTML = listHtml.join("");
  //   } catch (e) {
  //     console.error(e)
  //   }
  // });
