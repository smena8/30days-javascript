const newTaskBtn = document.querySelector('#add_task')
const taskList = document.querySelector('#tasklist__list')

getFromLocalStorage();

newTaskBtn.addEventListener('click', addTask);

newTaskBtn.addEventListener('submit', addTask);

function addTask(){
    const taskInput = document.querySelector('#input_task')
    if (!taskInput.value) {
        return
    }
    const task = {
        id: Date.now(),
        name: taskInput.value,
        priority: 'low',
        completed: false,
    }
    tasksArray.push(task);
    addToLocalStorage(tasksArray);
    div = createTask(task);
    taskList.appendChild(div);
    delTaskEvent();
    taskInput.value = '';
    document.querySelector('#tasklist__length').innerHTML = tasksArray.length
}

function addToLocalStorage(tasksArray) {
    localStorage.setItem('todos', JSON.stringify(tasksArray));
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todos');
  if (reference) {
    tasksArray = JSON.parse(reference);
    renderTaskList(tasksArray);
    document.querySelector('#tasklist__length').innerHTML = tasksArray.length
  } else {
    let tasksArray = [];
  }
}

function removeFromLocalStorage(task){
    for (let i=0; i < tasksArray.length; i++) {
        if (task === tasksArray[i].name) {
            tasksArray.splice(i,1);
            localStorage.setItem('todos', JSON.stringify(tasksArray));
        }
    }
}

function createTask(task){
    let div = document.createElement('div');
    div.setAttribute('class', 'tasklist__item');
    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('class', 'tasklist__status');
    input.checked = task.completed;
    onCompleteEvent(input);
    div.appendChild(input);
    let p = document.createElement('p');
    p.setAttribute('class', 'tasklist__title');
    p.textContent = `${task.name}`;
    if (task.completed) {
        p.style.textDecorationLine = 'line-through';
    } else if (!task.completed){
        p.style.textDecorationLine = '';
    }
    div.appendChild(p);
    let priorityBtn = document.createElement('button');
    priorityBtn.setAttribute('type','button');
    priorityBtn.setAttribute('class','tasklist__priority');
    if (task.priority === 'low') {
        priorityBtn.style.background = 'var(--green)';
        priorityBtn.setAttribute('aria-label','Current Priority Level Low');
    } else if (task.priority === 'medium') {
        priorityBtn.style.background = 'var(--yellow)';
        priorityBtn.setAttribute('aria-label','Current Priority Level Medium');
    } else if (task.priority === 'high') {
        priorityBtn.style.background = 'var(--red)';
        priorityBtn.setAttribute('aria-label','Current Priority Level High');
    }
    changePriorityEvent(priorityBtn);
    div.appendChild(priorityBtn);
    let delBtn = document.createElement('button');
    delBtn.setAttribute('type','button');
    delBtn.setAttribute('class','tasklist__delete');
    delBtn.setAttribute('aria-label','Remove Task');
    let trashIcon = document.createElement('i');
    trashIcon.setAttribute('class','fa fa-trash');
    delBtn.appendChild(trashIcon);
    div.appendChild(delBtn);
    return div
}

function onCompleteEvent(input) {
        input.addEventListener('click', function(){
            if (input.checked) {
                input.nextElementSibling.style.textDecorationLine = 'line-through';
            } else if (!input.checked){
                input.nextElementSibling.style.textDecorationLine = '';
            }
            task = input.parentElement.querySelector('.tasklist__title').textContent
            objIndex = tasksArray.findIndex((obj => obj.name === task));
            tasksArray[objIndex].completed = input.checked;
            localStorage.setItem('todos', JSON.stringify(tasksArray));
        })
    }

function changePriorityEvent(priorityBtn) {
        priorityBtn.addEventListener('click', function() {
            let priority;
            if (priorityBtn.style.background === 'var(--green)') {
                priorityBtn.style.background = 'var(--yellow)';
                priority = 'medium'
            } else if (priorityBtn.style.background === 'var(--yellow)') {
                priorityBtn.style.background = 'var(--red)';
                priority = 'high'
            } else if (priorityBtn.style.background === 'var(--red)') {
                priorityBtn.style.background = 'var(--green)';
                priority = 'low'
            }
            task = priorityBtn.parentElement.querySelector('.tasklist__title').textContent
            objIndex = tasksArray.findIndex((obj => obj.name === task));
            tasksArray[objIndex].priority = priority
            localStorage.setItem('todos', JSON.stringify(tasksArray));
        })
    }

function delTaskEvent() {
    const delTaskBtns = document.querySelectorAll('.tasklist__delete')
    delTaskBtns.forEach(btn => {
        btn.addEventListener('click', function(){
            task = btn.parentElement.querySelector('.tasklist__title').textContent
            removeFromLocalStorage(task);
            btn.parentElement.remove();
        })
    })
}

function renderTaskList(tasks){
    for (let i=0; i < tasks.length; i++) {
        div = createTask(tasks[i]);
        taskList.appendChild(div);
        delTaskEvent();
    }
}
