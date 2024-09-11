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

//select add new task button
const addNewButton = document.getElementById("add-new-btn");

//select container of tasks
const tasksContainer = document.getElementById("tasks-container");

//add event listener to form to detect click event
taskForm.addEventListener("click", (event) => {
  const { target } = event;
  if (target.id === "cancel-btn") {
    //handle cancel button
    console.log(taskInputContainer.classList);//d
    taskInputContainer.classList.toggle("flex");
    taskInputContainer.classList.toggle("hidden");
    console.log(taskInputContainer.classList);//d
    console.log("cancel btn is clicked"); //d
  } else if (target.id === "add-btn") {
    //handle add button
    console.log("add task btn is clicked"); //d
  }
});

//add event listener to add new button to detect click event
addNewButton.addEventListener('click', ()=>{
    console.log('add new task button is clicked');//d
    taskInputContainer.classList.toggle("flex");
    taskInputContainer.classList.toggle("hidden");
})