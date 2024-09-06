"use strict";

// DOM elements
const taskName = document.querySelector("#task-name");
const taskPriority = document.querySelector("#priority");
const taskEndDate = document.querySelector("#task-end-date");
const taskStatus = document.querySelector("#task-status");
const addTaskBtn = document.querySelector(".add-task-btn");
const tasks = document.querySelector("#tasks");
const taskMenu = document.querySelector(".task-menu");
const threeDotMenu = document.querySelectorAll(".three-dot-menu");
const cancelTaskBtn = document.querySelector(".cancel-task-btn");
// Get tasks from localStorage or set to empty array
let taskData = JSON.parse(localStorage.getItem("tasks")) || [];
//Store current edit field id
let editId = undefined;
console.log(window);

// Add event listener to the parent container 'tasks' using event delegation
tasks.addEventListener("click", (event) => {
  // Check if the clicked element is a three-dot menu button
  if (event.target.closest(".three-dot-menu")) {
    const targetMenu = event.target.closest(".three-dot-menu");
    console.log("Menu clicked:", targetMenu);

    const taskMenu = targetMenu.nextElementSibling;
    taskMenu.classList.toggle("hide");
  }

  // Handle "Edit" button clicks
  if (
    event.target.matches(".task-menu-btn") &&
    event.target.textContent.trim() === "edit"
  ) {
    const editButton = event.target;
    console.log("Edit button clicked:", editButton);

    // Add logic for editing the task
    const taskItem = editButton.closest("li"); // Get the task item (li element) that contains the button
    console.log("Editing task:", taskItem.id);
    search(taskData, taskItem);

    // Add an exit data in input field
    function search(array, taskItem) {
      array.forEach((element) => {
        console.log(element.id === taskItem.id);
        if (element.id === taskItem.id) {
          const { id, name, priority, endDate, status } = element;
          editId = id;
          taskName.value = name;
          taskPriority.value = priority;
          taskEndDate.value = endDate;
          taskStatus.value = status;
          addTaskBtn.innerText = "Save Changes";
          taskAddContainer.classList.remove("hide");
        }
      });
    }
  }

  // Handle "Delete" button clicks
  if (
    event.target.matches(".task-menu-btn") &&
    event.target.textContent.trim() === "delete"
  ) {
    const deleteButton = event.target;
    console.log("Delete button clicked:", deleteButton);

    const taskItem = deleteButton.closest("li"); // Get the task item (li element) that contains the button
    console.log("Deleting task:", taskItem.id);

    // Remove the task from the DOM
    taskItem.remove();

    // Also remove the task from localStorage
    taskData = taskData.filter((task) => task.id !== taskItem.id);
    //reasign all field's id
    let newId = 1;
    taskData.forEach((element) => {
      element.id = newId;
      newId++;
    });
    localStorage.setItem("tasks", JSON.stringify(taskData));
  }
});

// Function to display all tasks on load
const addToHTML = () => {
  taskData.forEach((task) => {
    console.log(task);

    const { id, name, priority, endDate, status } = task;
    const date = new Date(endDate);
    const dateFormatted = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}`;

    console.log(id);

    // Create task element
    const li = document.createElement("li");
    li.classList.add("task");
    li.id = id;
    li.innerHTML = `
      <p>${name}</p>
      <p>${priority}</p>
      <p>${dateFormatted}</p>
      <p>${status}</p>
      <div>
        <button class="btn-reset three-dot-menu">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </button>
        <div class="task-menu hide">
          <button class="task-menu-btn">edit</button>
          <button class="task-menu-btn">delete</button>
        </div>
      </div>`;

    tasks.append(li);
  });
};

// Function to add the latest task to HTML
const addChildToHTML = () => {
  const task = taskData[taskData.length - 1];
  console.log(task);

  const { id, name, priority, endDate, status } = task;
  const date = new Date(endDate);
  const dateFormatted = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  console.log(id);

  // Create task element
  const li = document.createElement("li");
  li.classList.add("task");
  li.id = id;
  li.innerHTML = `
    <p>${name}</p>
    <p>${priority}</p>
    <p>${dateFormatted}</p>
    <p>${status}</p>
    <div>
      <button class="btn-reset three-dot-menu">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </button>
      <div class="task-menu hide">
        <button class="task-menu-btn">edit</button>
        <button class="task-menu-btn">delete</button>
      </div>
    </div>`;

  tasks.appendChild(li);
};

// Initial task rendering on page load
addToHTML();

// Show/Hide task adder container
const addBtn = document.querySelector("#click-to-view-task");
const taskAddContainer = document.querySelector(".task-add-container");
addBtn.addEventListener("click", () => {
  taskAddContainer.classList.toggle("hide");
});

// Add task to taskData and localStorage
const taskAdder = (event) => {
  const task = {
    id: `${taskData.length + 1}`,
    name: taskName.value,
    priority: taskPriority.value,
    endDate: taskEndDate.value,
    status: taskStatus.value,
  };

  console.log(task.id);

  taskData.push(task);
  localStorage.setItem("tasks", JSON.stringify(taskData));

  addChildToHTML();
  clearForm();
};

// Add event listener to "Add Task" button
addTaskBtn.addEventListener("click", (event) => {
  console.log("task added is clicked");
  if (event.target.innerText === "Add task") {
    taskAdder();
  } else if (event.target.innerText === "Save Changes") {
    console.log("save changes button is clicked");
    for (let index = 0; index < taskData.length; index++) {
      if (taskData[index].id === editId) {
        console.log("edited field is found value store process is going");
        console.log(taskData[index]);
        const tmpObj = taskData[index];

        tmpObj.id = editId;
        tmpObj.name = taskName.value;
        tmpObj.priority = taskPriority.value;
        tmpObj.endDate = taskEndDate.value;
        tmpObj.status = taskStatus.value;
        console.log(tmpObj);
      }
    }
    console.log(taskData);
    localStorage.setItem("tasks", JSON.stringify(taskData));
    tasks.innerHTML = "";
    addToHTML();
    clearForm();
    event.target.innerText = "Add task";
    taskAddContainer.classList.toggle("hide");
  }
});

// Add event listener to "Cancel" button
cancelTaskBtn.addEventListener("click", () => {
  clearForm();
  taskAddContainer.classList.add("hide");
});

// Clear input fields after adding task
const clearForm = () => {
  taskName.value = "";
  taskPriority.value = "";
  taskEndDate.value = "";
  taskStatus.value = "";
};

console.log(taskData);
