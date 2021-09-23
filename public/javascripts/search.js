document.addEventListener("DOMContentLoaded", () => {

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
          } else {
              taskContainer.innerHTML = 'Sorry! No results found.'
            }

      } catch (e) {
          console.error(e);
        }
    }

  });
})
