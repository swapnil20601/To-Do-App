//get form id from DOM
let form = document.getElementById('add-form');

//grab ordered list from DOM
let itemList = document.getElementById('ordered-list');

//grab clear button from DOM
let clear = document.getElementById('button');

//Initially clear button is disabled since there are no to-do items added
clear.disabled = true;

//Fire submit event to submit form
form.addEventListener('submit', addToDoItem);

//Fire click event to remove to-do item
itemList.addEventListener('click', removeToDoItem);

//Fire click event to clear to-do list
clear.addEventListener('click', clearList);



//Function to add to-do item
function addToDoItem(e) {
    e.preventDefault();

    //Get item from input
    let inputItem = document.getElementById('add-input').value;
   
    //Create li element
    let li = document.createElement('li');

    //Create text node
    let textNode = document.createTextNode(inputItem);

    //append textNode to li element and add space between li and button elements
    li.appendChild(textNode);
    li.innerHTML = `${inputItem} &nbsp; &nbsp;`;

    //create delete button
    let btn = document.createElement('button');

    //create text node for button
    let btnText = document.createTextNode('Delete');

    //append btnText to delete button
    btn.appendChild(btnText);

    //append button to li node
    li.appendChild(btn);
    
    //append li to ordered-list in DOM
    itemList.appendChild(li);

    //reset form to clear input field
    form.reset();

    //enable clear button because at least 1 to-do item is added
    clear.disabled = false;
}

//Function to remove to-do item
function removeToDoItem(e) {
    if(e.target.firstChild.data != 'Delete') {
       e.target.innerHTML = `<del>${e.target.firstChild.data}</del><button>Delete</button>`;
    }
    else {
        if(confirm('Are you sure?')) {
            var li = e.target.parentElement;
            li.remove();
        }
    }

    //Checks for no. of li elements after deleting each to-do item and
    //if there is no single to-do item, then disable's clear button
    if(document.querySelectorAll('li').length === 0) {
        clear.disabled = true;
    }
}

//Function to clear to-do list
function clearList(e) {
    if(confirm('Do you want to clear whole list?')) {
        itemList.remove();
    }

    //disable clear button again because we have cleared whole to-do list
    clear.disabled = true;
}
