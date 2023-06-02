
var count = document.getElementById('task-counter');
var taskInputText = document.getElementById('input-text');
var taskList = document.getElementById('tasks-list');
var ID = 1;

var incomplete = document.getElementById('incomplete');
var completed = document.getElementById('completed');
var all = document.getElementById('all');

var tasksArray = [];
var completedTasksArray = []; 
var incompleteTasksArray = [];


// converting arrays task data into html element and appending it in our unordered list
const addTaskToDom = (task) => {
  const li = document.createElement('li');
  li.innerHTML = 
  `
    <span class="checkbox-wrapper-24">
      <input class="check" type="checkbox" id="${task.id}" ${task.completed ? "checked" : ''} data-id="${task.id}" />
      <label for="${task.id}">
        <span><!-- This span is needed to create the "checkbox" element --></span>${task.text}
      </label>
    </span>
    <span>
      <i id="delete" class="fa-solid fa-trash-can" data-id="${task.id}"></i> 
    </span>
  `;

  taskList.append(li);
}


// rendering list items from array to our Browser
// param is given because we will be having different array for completedTasks, incompleteTasks and AllTasks
// Array containing all Tasks is given default if no array passes
const renderList = (array=tasksArray) => { 
  taskList.innerHTML = '';
  for (let i=0; i<array.length; i++) {
    addTaskToDom(array[i]);
  }
  count.innerHTML = array.length;
}


// toggling task check/uncheck 
const toggleTask = (taskId) => {
  for (var t of tasksArray) {
    if (t.id === Number(taskId)) {
      console.log(t.completed);  
      t.completed = !t.completed;
      console.log(t.completed);  
        // showNotification('Task Toggled successfully');
      }     
  }
  renderList();
}


// deleting task
const deleteTask = (taskId) => {
  let newTasks = tasksArray.filter((task)=> {
    return task.id !== Number(taskId);
  });
  console.log(newTasks);
  tasksArray = newTasks;
  renderList();
  return;
}

// Adding task to array
const addTask = (task) => {
  if (task)   {
    tasksArray.push(task);
  }
  renderList();
  return;
}


// marking complete to all of the tasks
const comepleteAllTasks = () => {
  for (var t of tasksArray) {
    t.completed = true;
  }
  renderList(tasksArray);
  return;
}


// shows only completed tasks
const displayCompleted = () => {
  completedTasksArray = tasksArray.filter((task) => {
    return task.completed === true;
  });
  renderList(completedTasksArray);
}


// deleteing completed tasks from the list
const clearCompleted = () => {
  let clear = tasksArray.filter((task) => {
    return task.completed === false;
  });
  tasksArray = clear;
  console.log(tasksArray);
  renderList();
  return;
}


// showing incomplete task only
const incompleteTask = () => {
  incompleteTasksArray = tasksArray.filter((task) => {
    return task.completed === false;
  });
  renderList(incompleteTasksArray);
}


// for showing notification
const showNotification = (text) => {
  alert(text);
}


// Handling keyboard key presses 
const handleInputKeypress = (e) => {
    if (e.key === 'Enter') {
      const text = e.target.value;
      if (!text) {
        showNotification('Tast Text cannot be empty!');
        return;
      }

      const task = {
        text,
        id: ID++,
        completed: false
      }
      e.target.value = '';
      addTask(task);
    }
}

// handling mouse click all over the page for verying which element got click and performing actions according to that 
const handleClickListener = (e) => {
  const target = e.target;
  console.log(target.id);
  console.log(target.dataset.id);

  if (target.id === 'delete') {
    const taskId = target.dataset.id;
    deleteTask(taskId);
    return;
  } else if (target.className === 'check') {
      const taskId = target.dataset.id;
      toggleTask(taskId);
      return;
  } else if (target.id === 'complete-all') {
      comepleteAllTasks();
      return;
  } else if (target.id === 'completed') {
      displayCompleted();
      completedTasksArray = [];
      return;
  } else if (target.id === 'all') {
      renderList(tasksArray);
  } else if (target.id === 'clear-completed') {
      clearCompleted();
      return;
  } else if (target.id === 'incomplete') {  
      incompleteTask();
  } else if (target.id === 'plus') {   // adding tasks in list through plus icon
      const text = taskInputText.value;
      if (!text) {
        showNotification('Tast Text cannot be empty!');
        return;
      }
      const task = {
        text,
        id: ID++,
        completed: false
      }
      taskInputText.value = '';
      addTask(task);
  }
}

// Initialing our app
const initializeApp = () => {
  taskInputText.addEventListener('keyup', handleInputKeypress);
  document.addEventListener('click', handleClickListener);
}

initializeApp();
