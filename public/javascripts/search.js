document.addEventListener("DOMContentLoaded", () => {
    let searchButton = document.getElementById("search-button");
        searchButton.addEventListener("click", async (event) => {
            let searchBox = document.getElementById("search-box");
            let searchTerm = searchBox.value;
    
            try {
                const res = await fetch(`/tasks/search/${searchTerm}`);
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
    })
