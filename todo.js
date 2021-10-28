// 1 way

// const titleField = document.querySelector('#title');
// const desField = document.querySelector('#description');
// const btn = document.querySelector('#btn');

// btn.addEventListener('click', function(){
//     console.log(titleField.value);
//     console.log(desField.value);

// });

// 2 way FormDATA

const todos = [{
    title: 'meeting',
    description : 'there is a meeting',
    createdAt : new Date().toString(),
    status : 'active'
}];


const todoForm = document.querySelector('#todoForm');
const btn = document.querySelector('#btn');

btn.addEventListener('click', function(){
    const form = new FormData(todoForm);
    
    for(var key of form.keys()){
        console.log(form.get(key));
    }

});

// Also an another way

// function makeItem(title, description, status){
//     const outerRow = document.createElement('div');
//     outerRow.classList.add(['row','jumbotron','section']);

//     const titleDiv = document.createElement('div');
//     titleDiv.classList.add('col-md-2');
//     titleDiv.textContent = title;

//     outerRow.appendChild(titleDiv);

// }
