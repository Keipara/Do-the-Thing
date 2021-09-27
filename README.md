# Do the Thing!
### A task tracker to keep track of all the things you need to do! Do The Thing, a Remember the Milk clone, is a website for students to log and keep track of assignments, assessments, and more.

<br/>

### By Kiara Mendaros, Lakshmi Prakash, and Nevin Chow

<br/>

### Documentation: https://github.com/Keipara/Do-the-Thing/wiki
### Link: https://aa-do-the-thing.herokuapp.com/
<br/>
<br/>

# Preview

![Splash Page](https://cdn.discordapp.com/attachments/370781138194530308/891890467329949786/unknown.png)

![Tasks Page](https://cdn.discordapp.com/attachments/370781138194530308/891890594518016070/unknown.png)

# Features
* New account creation, log in, log out, and guest/demo login
* Partially Dynamic CRUD functionality for Tasks
* Creation and deletion of Lists
* Task Details
* List Summary
* Dynamic Searching

# Feature Highlights
One challenge that gave us a lot of frustration was ensuring that, when clicking a list, only that list's tasks populate the task container.
Another challenge was completing the list summary statistics so an accurate total of incomplete tasks, overdue tasks, and complete tasks were displayed.

The first issue was overcome by dynamically going through all the tasks, checking if the listId matches the clicked list, and appending the list's tasks onto the task container. This function was refactored solve our second issue by also checking the complete value and due date, and adjusting the counters accordingly.

```
function createListsList(lists, listContainer) {
    for (let i = 0; i< lists.length; i++) {
      const list = lists[i];

      const listDiv = document.createElement('div')
      listDiv.className = "list-div"
      const para = document.createElement("p");
        para.id = list.id;
        para.innerText = list.name;
        para.className = "listNames"
        para.addEventListener("click", async (event) => {
          event.preventDefault();
          try {
            const res = await fetch(`tasks/${list.id}/tasks`);

            selectedList = list.id;
            const {tasks} = await res.json();
            const taskContainer = document.querySelector(".task-list")
            taskContainer.innerHTML = "";
            createTasksList(tasks, taskContainer);
            let incompleteCounter = 0;
            let completeCounter = 0;
            let overdueCounter = 0;
            for (let i = 0; i < tasks.length; i++) {
             let task = tasks[i];
             if (task.complete === false) {
               incompleteCounter++
             } else {
               completeCounter++
             }
             if (task.due <= Date()) {
               overdueCounter++;
             }
            }
            let taskTotal= document.querySelector(".tasksNumber")
            let completeTotal = document.querySelector(".completedNumber")
            let overdueTotal = document.querySelector(".overdueNumber")
            taskTotal.innerHTML = incompleteCounter
            completeTotal.innerHTML = completeCounter
            overdueTotal.innerHTML = overdueCounter
            const listName = document.querySelector('.listName')
            listName.innerText = para.innerText

          } catch (e) {
            console.error(e)
            }

        })
```


# Future Plans
Coming back to this project, we hope to implement full CRUD functionality of tasks, as well as a much cleaner UI.

