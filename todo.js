// 1 way

// const titleField = document.querySelector('#title');
// const desField = document.querySelector('#description');
// const btn = document.querySelector('#btn');

// btn.addEventListener('click', function(){
//     console.log(titleField.value);
//     console.log(desField.value);

// });

// 2 way FormDATA

let todos = [];
let isEdit = false;
let editId = null;


const todoForm = document.querySelector('#todoForm');
const btn = document.querySelector('#btn');
const title = document.querySelector('#title');
const description = document.querySelector('#description');


// working of when user clicks on add todo button

btn.addEventListener('click', function(){

    const form = new FormData(todoForm);
    const formValues = {};
    for(var val of form.keys()){
        formValues[val] = form.get(val);
    }
    if(!isEdit){
        // Add functionality

    var todo = getTodo(formValues.title, formValues.description);
    todos = [...todos, todo];
    }
    else{
        //edit functionality
        var newTodos = [...todos];
        var idx = newTodos.findIndex(t => t.id == editId);
        var t = {...newTodos[idx]};
        t.title = formValues.title;
        t.description = formValues.description;
        newTodos[idx] = t;
        releaseEditLock();
        todos = newTodos;

    }

    title.value = null;
    description.value = null;

    render(todos);
});

function editLock(id){
    editId = id;
    isEdit = true;
    btn.textContent = 'Save';

}

function releaseEditLock(){
    editId = null;
    isEdit = false;
    btn.textContent = 'Add ToDo';

}

// This gives me a new todo to add


function getTodo(title, description){

    var id;

    if (todos.length == 0) id = 1;
    else{
        var last = todos[todos.length - 1];
        id = last.id + 1;
    }
    return{
        id,
        title,
        description,
        createdAt: new Date().toString(),
        status: 'active'
    };

}

// this renders todo list to the browser

function render(todos){
    const todo_list = document.querySelector('.todo_list');

    const items = todos.map(todo => renderATodoItem(todo));
    
    // i want to clear the text inside input box after clicking the button
    todo_list.innerHTML = null;

    items.forEach(item => {
        todo_list.appendChild(item)
    });
}

// render a list item


function renderATodoItem(todo){
    const mainRow = document.createElement('div');
    mainRow.className = 'row jumbotron section';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'col-md-2';
    titleDiv.textContent = todo.title;

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'col-md-2';
    descriptionDiv.textContent = todo.description;

    const statusDiv = document.createElement('div');
    statusDiv.className = 'col-md-2';
    statusDiv.textContent = todo.status;

    let markCompletedDiv = document.createElement('div');
    markCompletedDiv.className = 'col-md-2';
    let statusBtn = document.createElement('button');
    statusBtn.className = 'btn btn-info';
    statusBtn.textContent = 'Mark completed';

    statusBtn.addEventListener('click',() =>{
    

        // mutable way

        // var t = todos.find (t => t.id == todo.id);
        // t.status = 'Completed';
        // render(todos);


        // Immutable way

        var newTodos = [...todos];
        var idx = newTodos.findIndex (t => t.id == todo.id);
        var t = {...newTodos[idx]};
        t.status = 'Completed';
        newTodos[idx] = t;
        todos = newTodos;
        render(newTodos);



    });
    markCompletedDiv.appendChild(statusBtn);

    const actionDiv = document.createElement('div');
    actionDiv.className = 'col-md-4';
    const actionRow = document.createElement('div');
    actionRow.className = 'row';
    let editDiv = document.createElement('div');
    editDiv.className = 'col-md-3';
    statusBtn = document.createElement('button');
    statusBtn.className = 'btn btn-success';
    statusBtn.textContent = 'Edit';

    statusBtn.addEventListener('click', function(){
        title.value = todo.title;
        description.value = todo.description;
        editLock(todo.id);

    });
    editDiv.appendChild(statusBtn);
    actionRow.appendChild(editDiv);

    let deleteDiv = document.createElement('div');
    deleteDiv.className = 'col-md-3';
    statusBtn = document.createElement('button');
    statusBtn.className = 'btn btn-danger';
    statusBtn.textContent = 'Delete';

    statusBtn.addEventListener('click', () =>{
        console.log(todo.id);

        //mutable way

        // immutable way

        var newTodos = todos.filter(t => t.id != todo.id);
        todos = newTodos;
        render(newTodos);

    });

    deleteDiv.appendChild(statusBtn);
    actionRow.appendChild(deleteDiv);

    actionDiv.appendChild(actionRow); 

    console.log(mainRow);





    mainRow.appendChild(titleDiv);
    mainRow.appendChild(descriptionDiv);
    mainRow.appendChild(statusDiv);
    mainRow.appendChild(markCompletedDiv);
    mainRow.appendChild(actionDiv);

    return mainRow;

}

render(todos);



// Also an another way

// function makeItem(title, description, status){
//     const outerRow = document.createElement('div');
//     outerRow.classList.add(['row','jumbotron','section']);

//     const titleDiv = document.createElement('div');
//     titleDiv.classList.add('col-md-2');
//     titleDiv.textContent = title;

//     outerRow.appendChild(titleDiv);

// }
