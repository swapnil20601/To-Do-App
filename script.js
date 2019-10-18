    //get form id from DOM
    const form = document.getElementById('add-form');

    //grab ordered list from DOM
    const itemList = document.getElementById('ordered-list');
    
    //grab clear button from DOM
    const clear = document.getElementById('button');
    
    //Initially clear button is disabled since there are no to-do items added
    clear.disabled = true;
    
    //Fire submit event to submit form
    form.addEventListener('submit', addToDoItem);
    
    //Fire click event to remove to-do item
    itemList.addEventListener('click', removeToDoItem);
    
    //Fire click event to clear to-do list
    clear.addEventListener('click', clearList);

    const names = [];


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

    //Adding each li node to class'to-do'
    li.className = 'to-do';

    //create delete button
    let btn = document.createElement('button');

    //Adding id for each delete button when to-do item is added
    btn.id = 'delete-button';

    //create text node for button
    let btnText = document.createTextNode('Delete');

    //append btnText to delete button
    btn.appendChild(btnText);

    //append button to li node
    li.appendChild(btn)

    
    Array.from(document.getElementsByTagName('li')).forEach(function(x) {
        console.log(x);
    });
    
    //append li to ordered-list in DOM
    let swapnil = itemList.appendChild(li);

    swapnil.addEventListener('click', function(e) {
        let trimedText = e.target.firstChild.data.trim();
        if(names.includes(e.target.firstChild.data)) {
            console.log('ok');
        } else {
            console.log('no');
        }
        
    })

    //reset form to clear input field
    form.reset();

    //enable clear button because at least 1 to-do item is added
    clear.disabled = false;
}

//Function to remove to-do item
function removeToDoItem(e) {
    if(e.target.id === 'delete-button') {
        if(confirm('Are you sure?')) {
            e.target.parentElement.remove();
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
    //ask for confirmation before clearing the list
    if(confirm('Do you want to clear whole list?')) {
        const todos = Array.from(document.getElementsByClassName('to-do'));
        todos.forEach(function(todo) {
            todo.remove();
         });       
    }

    //disable clear button again because we have cleared whole to-do list
    clear.disabled = true;
}


// //Function to mark to-do item as complete
// function markAsComplete(e) {
//     console.log('hi')
//     if(names.includes(e.target.firstChild.data)) {
//         console.log(e.target.firstChild.data);
//     }
    
// }