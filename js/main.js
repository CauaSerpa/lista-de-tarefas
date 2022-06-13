let inputNewTask = document.querySelector('#inputNewTask');
let btnAddTask = document.querySelector('#btnAddTask');
let listTasks = document.querySelector('#listTasks');
let editWindow = document.querySelector('#editWindow');
let editWindowBackground = document.querySelector('#editWindowBackground');
let editWindowBtnClose = document.querySelector('#editWindowBtnClose');
let btnUpdateTask = document.querySelector('#btnUpdateTask');
let idTaskEdit = document.querySelector('#idTaskEdit');
let inputTaskNameEdit = document.querySelector('#inputTaskNameEdit');

inputNewTask.addEventListener('keypress', (e) => {
    if(e.keyCode == 13) {
        let task = {
            nome: inputNewTask.value,
            id: createId(),
        }
        addTask(task);
    }
});

editWindowBtnClose.addEventListener('click', (e) => {
    toggleWindowEdit();
});

btnAddTask.addEventListener('click', (e) => {
    let task = {
        nome: inputNewTask.value,
        id: createId(),
    }
    addTask(task);
});

btnUpdateTask.addEventListener('click', (e) => {
    e.preventDefault();

    let idTask = idTaskEdit.innerHTML.replace('#', '');

    let task = {
        nome: inputTaskNameEdit.value,
        id: idTask,
    }

    let taskCurrent = document.getElementById(''+idTask+'');

    if(taskCurrent) {
        let li = createTagLI(task);
        listTasks.replaceChild(li, taskCurrent);
        toggleWindowEdit();
    } else {
        alert('Tarefa não encontrada!');
    }

});

function createId() {
    return Math.floor(Math.random() * 3000);
}

function addTask(task) {
    let li = createTagLI(task);
    listTasks.appendChild(li);
    inputNewTask.value = '';
}

function createTagLI(task) {
    let li = document.createElement('li');
    li.id = task.id;

    let span = document.createElement('span');
    span.classList.add('taskText');
    span.innerHTML = task.nome;

    let div = document.createElement('div');

    let btnEdit = document.createElement('button');
    btnEdit.classList.add('btnAction');
    btnEdit.innerHTML = '<i class="bx bxs-pencil" ></i>';
    btnEdit.setAttribute('onclick', 'edit('+task.id+')');
    
    let btnDelete = document.createElement('button');
    btnDelete.classList.add('btnAction');
    btnDelete.innerHTML = '<i class="bx bxs-trash" ></i>';
    btnDelete.setAttribute('onclick', 'exclude('+task.id+')');

    div.appendChild(btnEdit);
    div.appendChild(btnDelete);

    li.appendChild(span);
    li.appendChild(div);
    return li;
}

function edit(idTask) {
    let li = document.getElementById(''+ idTask + '');
    if(li) {
        idTaskEdit.innerHTML = '#' + idTask;
        inputTaskNameEdit.value = li.innerText;
        toggleWindowEdit();
    } else {
        alert('Tarefa não encontrada!');
    }
}

function exclude(idTask) {
    let confirm = window.confirm('Tem certeza que deseja excluir?');
    if(confirm) {
        let li = document.getElementById(''+ idTask + '');
        if(li) {
            listTasks.removeChild(li);
        } else {
            alert('Tarefa não encontrada!');
        }
    }
}

function toggleWindowEdit()
{
    editWindow.classList.toggle('open');
    editWindowBackground.classList.toggle('open');
}