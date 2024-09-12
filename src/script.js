document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  console.log("app initiated");

  //select task input form upper container
  const taskInputContainer = document.getElementById("task-input-container");

  //select task input form
  const taskForm = document.getElementById("task-form");

  // select all input fields
  const inputTask = {
    name: document.getElementById("input-name"),
    dueDate: document.getElementById("input-due-date"),
    priority: document.getElementById("input-priority"),
    status: document.getElementById("input-status"),
  };

  //set min date and remove max attribute in date input
  const today = new Date().toISOString().split("T")[0];
  inputTask.dueDate.setAttribute("min", today);
  inputTask.dueDate.removeAttribute("max");

  //select add new task button
  const addNewButton = document.getElementById("add-new-btn");

  //select container of tasks
  const tasksContainer = document.getElementById("tasks-container");

  //create array to store all tasks
  let taskData = JSON.parse(localStorage.getItem("tasks")) || [];
  console.log(taskData);

  //current target id
  let currentTaskId = null;
  //current target index
  let currentTargetIndex = null;

  //function to generate unique id for task
  function generateUniqueId() {
    return "id-" + Date.now() + "-" + Math.floor(Math.random() * 10000);
  }

  //function to format a date as dd/mm/yyyy
  function dateFormater(date) {
    const inputDate = new Date(date);
    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = inputDate.getFullYear();

    return `${day}/${month}/${year}`;
  }

  //function to create html element
  function createTask(id, name, dueDate, priority, status) {
    return `<div
          class="task-container border-l-green-500 border-l-[5px] rounded-l-xl px-4 m-2 bg-gray-300 p-4"
        id="${id}">
          <ul>
            <li class="capitalize"><b>${name}</b></li>
            <li>Due : <span class="text-gray-500">${dateFormater(
              dueDate
            )}</span></li>
            <li>${priority}</li>
            <li>${status}</li>
          </ul>
          <div class="flex justify-around">
            <button class="edit-task">
              <i class="fa-solid fa-pen-to-square text-green-600"></i>
            </button>
            <button class="delete-task"><i class="fa-solid fa-trash text-green-600"></i></button>
          </div>
        </div>`;
  }

  //create html task if already exist any tasks
  function updateTask() {
    taskData.reverse().map((element) => {
      console.log(element);
      const { taskId, inputName, inputDueDate, inputPriority, inputStatus } =
        element;
      console.log(taskId, inputName, inputDueDate, inputPriority, inputStatus);

      const elements = createTask(
        taskId,
        inputName,
        inputDueDate,
        inputPriority,
        inputStatus
      );
      tasksContainer.insertAdjacentHTML("afterbegin", elements);
    });
  }
  //call the update function
  updateTask();
  //add event listener to form to detect click event
  taskForm.addEventListener("click", (event) => {
    const { target } = event;
    if (target.id === "cancel-btn") {
      //handle cancel button
      console.log(taskInputContainer.classList); //d
      taskInputContainer.classList.toggle("flex");
      taskInputContainer.classList.toggle("hidden");
      console.log(taskInputContainer.classList); //d
      console.log("cancel btn is clicked"); //d
    } else if (target.id === "add-btn" && target.innerText === "Add") {
      //prevent reload
      event.preventDefault();

      //handle add button
      console.log("add task btn is clicked"); //d

      //destructure all inputs from object
      const { name, dueDate, priority, status } = inputTask;

      //function to check all input are entered
      function isValid() {
        return name.value && dueDate.value && priority.value && status.value
          ? true
          : false;
      }

      //function to store all input value inside object and return
      function getInput() {
        const obj = {
          taskId: generateUniqueId(),
          inputName: name.value,
          inputDueDate: dueDate.value,
          inputPriority: priority.value,
          inputStatus: status.value,
        };
        return obj;
      }

      //call isValid function to check all inputs are entered
      if (isValid()) {
        //if all inputs are entered
        console.log("inputs are valid"); //d
        //get all inputs from form
        const newTask = getInput();

        const { taskId, inputName, inputDueDate, inputPriority, inputStatus } =
          newTask;
        console.log(taskId);
        //save the elements in taskData array
        taskData.unshift(newTask);

        //save all tasks locally via local starage
        localStorage.setItem("tasks", JSON.stringify(taskData));

        console.log("date pushed to array"); //d
        console.log(taskData); //d
        console.log(localStorage.tasks);

        //create html task use input values
        const elements = createTask(
          taskId,
          inputName,
          inputDueDate,
          inputPriority,
          inputStatus
        );

        tasksContainer.insertAdjacentHTML("afterbegin", elements);

        //after save task hide the container
        taskContainerClassToggler();

        //reset all input fields
        //destructure all inputs from object
        const { name, dueDate, priority, status } = inputTask;

        name.value = dueDate.value = priority.value = status.value = "";
      } else {
        //if all inputs or anyone is empty
        alert("please enter valid input");
      }
    } else if (target.id === "add-btn" && target.innerText === "Save Changes") {
      //prevent reload
      event.preventDefault();

      console.log("save the edited task button is clicked");
      const { name, dueDate, priority, status } = inputTask;

      const taskObject = {
        taskId: currentTaskId,
        inputName: name.value,
        inputDueDate: dueDate.value,
        inputPriority: priority.value,
        inputStatus: status.value,
      };
      //remove edited element and add  new into same place
      console.log(taskObject);
      console.log(currentTargetIndex);
      taskData.splice(currentTargetIndex, 1, taskObject);
      console.log(taskData);
      //save all tasks locally
      localStorage.tasks = JSON.stringify(taskData);
      console.log(JSON.parse(localStorage.getItem("tasks"))); //d

      //display all changes;
      tasksContainer.innerHTML = "";
      // hide after save
      taskContainerClassToggler();
      updateTask();
      //reset all input fields after save
      name.value = dueDate.value = priority.value = status.value = "";

      //reset the inner text of the add button
      target.innerText = "Add";
    } else if (target.id === "reset-btn") {
      //prevent reload
      event.preventDefault();

      //handle reset button
      console.log("reset button is pressed");

      //destructure all inputs from object
      const { name, dueDate, priority, status } = inputTask;

      name.value = dueDate.value = priority.value = status.value = "";
    }
  });
  //function task container class toggler
  function taskContainerClassToggler() {
    taskInputContainer.classList.toggle("flex");
    taskInputContainer.classList.toggle("hidden");
  }
  //add event listener to add new button to detect click event
  addNewButton.addEventListener("click", () => {
    console.log("add new task button is clicked"); //d
    taskContainerClassToggler();
  });

  //add event listener to tasks container to handle buttons of task
  tasksContainer.addEventListener("click", (event) => {
    const { target } = event;
    console.log(target);
    if (target.matches(".edit-task") || target.closest(".edit-task")) {
      //handle edit task buttons
      console.log("edit button is clicked");

      //get target element id for search
      const targetId = target.closest(".task-container").id;
      console.log(targetId);
      //store the id for later use
      currentTaskId = targetId;

      //get index of target task
      const targetIndex = taskData.findIndex(
        (task) => task.taskId === targetId
      );

      currentTargetIndex = targetIndex;
      console.log(taskData.map((task) => task.taskId)); // Output: List of all task IDs

      console.log(targetIndex);
      console.log(taskData[targetIndex]); //d

      //after find task push all value into form

      //destruct all input
      const { name, dueDate, priority, status } = inputTask;

      //destruct all value from object
      const { taskId, inputName, inputDueDate, inputPriority, inputStatus } =
        taskData[targetIndex];
      console.log(taskId, inputName, inputDueDate, inputPriority, inputStatus); //d

      //push all value into form
      name.value = inputName;
      dueDate.value = inputDueDate;
      priority.value = inputPriority;
      status.value = inputStatus;

      //change the text content of the button
      document.getElementById("add-btn").innerText = "Save Changes";

      //toggle class
      taskContainerClassToggler();
    } else if (
      target.matches(".delete-task") ||
      target.closest(".delete-task")
    ) {
      //handle delete tasks buttons
      console.log("delete button is clicked");
      console.log(target.closest(".task-container").id);
      currentTaskId = target.closest(".task-container").id;
      currentTargetIndex = taskData.findIndex(
        (task) => task.taskId === currentTaskId
      );
      console.log(currentTargetIndex);
      console.log(taskData[currentTargetIndex]);
      //delete current target in array
      taskData.splice(currentTargetIndex, 1);
      //store locally
      localStorage.tasks = JSON.stringify(taskData);
      //diplay changes
      tasksContainer.innerHTML = "";
      updateTask();
    }
  });
}
