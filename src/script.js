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

//add event listener to form to detect click event
taskForm.addEventListener("click", (event) => {
  //prevent reload
  event.preventDefault();
  const { target } = event;
  if (target.id === "cancel-btn") {
    //handle cancel button
    console.log(taskInputContainer.classList); //d
    taskInputContainer.classList.toggle("flex");
    taskInputContainer.classList.toggle("hidden");
    console.log(taskInputContainer.classList); //d
    console.log("cancel btn is clicked"); //d
  } else if (target.id === "add-btn") {
    //handle add button
    console.log("add task btn is clicked"); //d

    //destructure all inputs from object
    const { name, dueDate, priority, status } = inputTask;

    //function to check all input are entered
    const isValid = () => {
      return name.value && dueDate.value && priority.value && status.value
        ? true
        : false;
    };
    //function to store all input value inside object and return
    const getInput = () => {
      const obj = {
        inputName: name.value,
        inputDueDate: dueDate.value,
        inputPriority: priority.value,
        inputStatus: status.value,
      };
      return obj;
    };

    //function to create html element
    const createTask = (name, dueDate, priority, status) => {
      
      const elements = ` <div
          class="border-l-green-500 border-l-[5px] rounded-l-xl px-4 m-2 bg-gray-300 p-4"
        >
          <ul>
            <li hidden>task id</li>
            <li class="capitalize"><b>${name}</b></li>
            <li>Due : <span class="text-gray-500">${dueDate}</span></li>
            <li>${priority}</li>
            <li>${status}</li>
          </ul>
          <div class="flex justify-around">
            <button>
              <i class="fa-solid fa-pen-to-square text-green-600"></i>
            </button>
            <button><i class="fa-solid fa-trash text-green-600"></i></button>
          </div>
        </div>`
    }

    //call isValid function to check all inputs are entered
    if (isValid()) {
      //if all inputs are entered
      console.log("inputs are valid"); //d
      //get all inputs from form
      getInput();
      console.log(getInput());


    } else {
      //if all inputs or anyone is empty
      alert("please enter valid input");
    }
  } else if (target.id === "reset-btn") {
    //handle reset button
    console.log("reset button is pressed");

    //destructure all inputs from object
    const { name, dueDate, priority, status } = inputTask;

    name.value = dueDate.value = priority.value = status.value = "";
  }
});

//add event listener to add new button to detect click event
addNewButton.addEventListener("click", () => {
  console.log("add new task button is clicked"); //d
  taskInputContainer.classList.toggle("flex");
  taskInputContainer.classList.toggle("hidden");
});
