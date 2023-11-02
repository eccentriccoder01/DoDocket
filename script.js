// Data Structures to store tasks
alert('You successfully linked your JavaScript file!');
var highPriorityTasks = [];
var lowPriorityTasks = [];
var today = new Date();

// Adding New Task
document.getElementById('addButton').addEventListener('click', function () {
    var taskInput = document.getElementById('taskInput');
    var deadlineInput = document.getElementById('deadlineInput');

    var newTask = {
        description: taskInput.value,
        deadline: deadlineInput.value,
        done: false,
    };

    var taskDeadline = new Date(deadlineInput.value);
      
    if (taskDeadline.getTime() <= today.getTime()) {
        highPriorityTasks.push(newTask);
    } else {
        lowPriorityTasks.push(newTask);
    }

    displayTasks();

    taskInput.value = '';
    deadlineInput.value = '';
});

// Do not update the code below this line

// Display Function for rendering after each change.
function displayTasks() {
  var highPriorityContainer = document.getElementById('highPriorityContainer');
  var lowPriorityContainer = document.getElementById('lowPriorityContainer');
  highPriorityContainer.innerHTML = '';
  lowPriorityContainer.innerHTML = '';

  var today = new Date();

  highPriorityTasks.forEach(function (task, index) {
    var taskItem = createTaskElement(task, index, 'high-priority');
    highPriorityContainer.appendChild(taskItem);
  });

  lowPriorityTasks.forEach(function (task, index) {
    var taskItem = createTaskElement(task, index, 'low-priority');
    lowPriorityContainer.appendChild(taskItem);
  });
}

// Create each task along with its delete button
function createTaskElement(task, index, priorityClass) {
  var taskItem = document.createElement('div');
  taskItem.className = 'todo-item';
  taskItem.classList.add(priorityClass);

  var checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.addEventListener('change', function () {
    task.done = this.checked;
    displayTasks();
  });

  var label = document.createElement('label');
  label.textContent = task.description + ' (Deadline: ' + task.deadline + ')';
  if (task.done) {
    label.style.textDecoration = 'line-through';
  }

  //solution as follows
  var deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Delete';
  deleteButton.setAttribute('data-index', index);
  deleteButton.addEventListener('click', function () {
    if (priorityClass === 'high-priority') {
      highPriorityTasks.splice(index, 1);
    } else {
      lowPriorityTasks.splice(index, 1);
    }
    displayTasks();
  });

  taskItem.appendChild(checkbox);
  taskItem.appendChild(label);
  taskItem.appendChild(deleteButton);

  return taskItem;
}