// 1 way

// const titleField = document.querySelector('#title');
// const desField = document.querySelector('#description');
// const btn = document.querySelector('#btn');

// btn.addEventListener('click', function(){
//     console.log(titleField.value);
//     console.log(desField.value);

// });

// 2 way FormDATA

const todoForm = document.querySelector('#todoForm');
const btn = document.querySelector('#btn');

btn.addEventListener('click', function(){
    const form = new FormData(todoForm);
    
    for(var key of form.keys()){
        console.log(form.get(key));
    }

});
