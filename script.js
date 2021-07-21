//selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const deleteBtn = document.querySelector('.delete-btn')
const todoItem = document.querySelector('.todo-item')
const filterOption = document.querySelector('.filter-todo')

//Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoBtn.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteAndCheck);
filterOption.addEventListener('click', filterTodo)



//functions
function addTodo(e) {
    //prevent form from submitting
    e.preventDefault();
    //console.log('It works');
    //create div <div class="todo">
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //create li <li class="todo-item">
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo);
    saveTodos(todoInput.value);
    //completed button <button class="complete-btn">
    const completedBtn = document.createElement('button');
    completedBtn.innerHTML = '<i class="fas fa-check"></i>'
    completedBtn.classList.add('complete-btn');
    todoDiv.appendChild(completedBtn)
    //trash button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
    deleteBtn.classList.add('delete-btn');
    todoDiv.appendChild(deleteBtn)
    //append to list
    todoList.appendChild(todoDiv);
    todoInput.value = '';
}


function deleteAndCheck(e) {
    e.preventDefault();
    //console.log(e.target);
    const item = e.target;
    // console.log(item.classList);//returns DOMTokenList ["todo-item", value: "todo-item"]0: "todo-item"length: 1value: "todo-item"

    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('deleting')
        //console.log(todo);
        removeLocalStorageTodo(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        })
        //todo.remove();
    }
    //check mark
    //console.log(item.classList);
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(todo => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "marked":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none"
                }
                break;
        }
    })
}


function saveTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        //create div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);
        //completed button
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>'
        completedBtn.classList.add('complete-btn');
        todoDiv.appendChild(completedBtn)
        //trash button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>'
        deleteBtn.classList.add('delete-btn');
        todoDiv.appendChild(deleteBtn)
        //append to list
        todoList.appendChild(todoDiv);
    })
}


function removeLocalStorageTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    //console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    //console.log(todo.children[0].innerText);
    //console.log(todos.indexOf(todo.children[0].innerText));
}