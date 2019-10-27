
 window.onload = function retrieveTodosFromLocalStorage() {    
    //Function to retrieve todos from localStorage to display on UI
    //get 'todos' from localStorage first which is in string form and then convert it into Object 
    let str = localStorage.getItem('todos');

    let toDoObject = JSON.parse(str);

    if(toDoObject !== null) {
        toDoObject.forEach(item => addLiElement(item));
    }

    //fire event to mark/unmark to-do item as complete
    markAsComplete();

    //enable clear button if localStorage contains todo items else disable it
    toDoObject.length > 0 ||  toDoObject !== null ? clear.disabled = false : clear.disabled = true;
}

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

    //array to store todo items in localStorage
    const toDos =  []


    //function to create to-do item object
    function createToDoItem(inputItem) {
        return {
            id: new Date().getUTCMilliseconds(),
            text: inputItem,
            isComplete: false 
        }
    }
    
    //Function to create li element under ordered-list  
    function addLiElement(toDoItem) {
        //Create li element
        let li = document.createElement('li');

        //Adding each li node to class'to-do'
        li.className = 'to-do';

        //Adding unique id for each li node using UTC milliseconds of a Date object
        li.id = toDoItem.id;

        //push toDoObject to toDos[] to save in local Storage
        toDos.push(toDoItem);

        //add input value as text to each LI
        li.textContent = toDoItem.text;
        li.innerHTML = `${toDoItem.text} &nbsp; &nbsp;`;

        //create delete button
        let btn = document.createElement('button');

        //Adding id for each delete button when to-do item is added
        btn.id = 'delete-button';

        //add text to button
        btn.textContent = 'Delete';

        //append button to li node
        li.appendChild(btn);

        //append li to ordered-list in DOM
        itemList.appendChild(li);
    }

    //Function fired on submit form  to create a new to-do item
    function addToDoItem(e) {
        e.preventDefault();

        //grab input value from text field
        let inputItem = document.getElementById('add-input').value;

        let toDoObject = createToDoItem(inputItem);

        //
        addLiElement(toDoObject);

        ////fire event to mark/unmark to-do item as complete
        markAsComplete();

        //save to localStorage
        saveToLocalStorage();

        //reset form to clear input field
        form.reset();

        //enable clear button because at least 1 to-do item is added
        clear.disabled = false;
    }

    //Function to remove to-do item
    function removeToDoItem(e) {
            if(e.target.id === 'delete-button' && confirm('Are you sure?')) {
                //remove specific Li along with to-do from DOM
                e.target.parentElement.remove();

                let index = toDos.findIndex(item => item.id == e.target.parentElement.id);

                //removes the specific item from toDos[] array
                toDos.splice(index, 1);
            }
        
        //save and update the localStorage once the specific item is deleted from localStorage
        saveToLocalStorage();

        //Checks for no. of li elements after deleting each to-do item and
        //if there is no single to-do item, then disable's clear button
        if(document.querySelectorAll('.to-do').length === 0) {
            clear.disabled = true;
        }
    }

    //Function to clear to-do list
    function clearList(e) {
        //ask for confirmation before clearing the list and remove all todo's with LI's from DOM alongwith clearing localStorage
        //ONLY IF confirm("'Do you want to clear whole list?") is true
        if(confirm('Do you want to clear whole list?')) {
            document.querySelectorAll('.to-do').forEach(toDoitem =>  toDoitem.remove());

            //Empty the toDos[] since localStorage is empty after clearing it
            toDos.length = 0;

            //disable clear button again because we have cleared whole to-do list
            clear.disabled = true;
        } 

        //save and update the localStorage once whole list is cleared by deleting all of the to-dos
        saveToLocalStorage();   
    }

    //Function to mark a to-do item as completed or undo it if you wish to have it back on the list
    function markAsComplete() {
        for(let toDo of toDos) {
            //Fire event to mark to-do item as complete 
            document.getElementById(toDo.id).addEventListener('click', function(e) {
                if(e.target.id == toDo.id) {
                    if(toDo.isComplete === false) {
                        toDo.isComplete = true;
                        e.target.style.textDecoration = "line-through";
                    } else if(toDo.isComplete === true) {
                        toDo.isComplete = false;
                        e.target.style.textDecoration = "none";
                    }     
                }
            });
        } 
    }


    //Function to save todos to localStorage
    function saveToLocalStorage() {
        //convert toDos[] array to string first because localStorage only supports strings as values
        let toString = JSON.stringify(toDos);

        //save key = 'todos' and string form of toDos[] to localStorage
        localStorage.setItem('todos', toString);
    }

