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
                    } else {
                        taskContainer.innerHTML = 'Sorry! No results found.'
                    }

                  } catch (e) {
                    console.error(e);
                  }
            }

        });
    })
