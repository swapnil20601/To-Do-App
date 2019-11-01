window.onload = function() {
  const form = document.getElementById("add-form");

  const itemList = document.getElementById("ordered-list");

  const clear = document.getElementById("button");

  //array to store todo items in localStorage
  const toDos = [];

  //Initially clear button is disabled since there are no to-do items added
  clear.disabled = true;

  itemList.addEventListener("click", function(e) {
    removeToDoItem(e, toDos);
  });

  form.addEventListener("submit", function(e) {
    addToDoItem(e, form, itemList, clear, toDos);
  });

  clear.addEventListener("click", function(e) {
    clearList(e, clear, toDos);
  });

  //Function to retrieve todos from localStorage to display on UI
  //get 'todos' from localStorage first which is in string form and then convert it into Object
  let str = localStorage.getItem("todos");

  let toDoObject = fetchToDosFromLocalStorage();

  if (toDoObject !== null) {
    toDoObject.forEach(item => addLiElement(item, itemList, toDos));
  }

  toggleToDoItem(toDos);

  //enable clear button if localStorage contains todo items else disable it
  toDoObject.length > 0 || toDoObject !== null
    ? (clear.disabled = false)
    : (clear.disabled = true);
};

//Function to retrieve todos from localStorage to display on UI
//get 'todos' from localStorage first which is in string form and then convert it into Object
function fetchToDosFromLocalStorage() {
  let str = localStorage.getItem("todos");

  return JSON.parse(str);
}

//function to create to-do item object
function createToDoItem(inputItem) {
  return {
    id: new Date().getUTCMilliseconds(),
    text: inputItem,
    isComplete: false
  };
}

//Function to create li element under ordered-list
function addLiElement(toDoItem, itemList, toDos) {
  //Create li element
  let li = document.createElement("li");

  //Adding each li node to class'to-do'
  li.className = "to-do";

  //Adding unique id for each li node using UTC milliseconds of a Date object
  li.id = toDoItem.id;

  //push toDoObject to toDos[] to save in local Storage
  toDos.push(toDoItem);

  //add input value as text to each LI
  li.textContent = toDoItem.text;
  //li.innerHTML = `${toDoItem.text}`;

  //create delete button
  let btn = document.createElement("button");

  //Adding id for each delete button when to-do item is added
  btn.id = "delete-button";

  //add text to button
  btn.textContent = "Delete";

  //append button to li node
  li.appendChild(btn);

  //append li to ordered-list in DOM
  itemList.appendChild(li);
}

//Function fired on submit form  to create a new to-do item
function addToDoItem(e, form, itemList, clear, toDos) {
  e.preventDefault();

  let inputItem = document.getElementById("add-input").value;

  let toDoObject = createToDoItem(inputItem);

  addLiElement(toDoObject, itemList, toDos);

  toggleToDoItem(toDos);

  saveToLocalStorage(toDos);

  //reset form to clear input field
  form.reset();

  //enable clear button because at least 1 to-do item is added
  clear.disabled = false;
}

//Function to remove to-do item
function removeToDoItem(e, toDos) {
  if (e.target.id === "delete-button" && confirm("Are you sure?")) {
    //remove specific Li along with to-do from DOM
    e.target.parentElement.remove();

    let index = toDos.findIndex(item => item.id == e.target.parentElement.id);

    //removes the specific item from toDos[] array
    toDos.splice(index, 1);
  }

  saveToLocalStorage(toDos);

  //Checks for no. of li elements after deleting each to-do item and
  //if there is no single to-do item, then disable's clear button
  if (document.querySelectorAll(".to-do").length === 0) {
    clear.disabled = true;
  }
}

//Function to clear to-do list
function clearList(e, clear, toDos) {
  //ask for confirmation before clearing the list and remove all todo's with LI's from DOM alongwith clearing localStorage
  //ONLY IF confirm("'Do you want to clear whole list?") is true
  if (confirm("Do you want to clear whole list?")) {
    document.querySelectorAll(".to-do").forEach(toDoitem => toDoitem.remove());

    //Empty the toDos[] since localStorage is empty after clearing it
    toDos.length = 0;

    //disable clear button again because we have cleared whole to-do list
    clear.disabled = true;
  }

  saveToLocalStorage(toDos);
}

//Function to mark a to-do item as completed or undo it if you wish to have it back on the list
function toggleToDoItem(toDos) {
  for (let toDo of toDos) {
    document.getElementById(toDo.id).addEventListener("click", function(e) {
      if (e.target.id == toDo.id) {
        if (toDo.isComplete === false) {
          toDo.isComplete = true;
            e.target.classList.add('strikeout');
        } else if (toDo.isComplete === true) {
          toDo.isComplete = false;
          e.target.classList.remove('strikeout');
        }
      }
    });
  }

  saveToLocalStorage(toDos);
}

//Function to save todos to localStorage
function saveToLocalStorage(toDos) {
  //convert toDos[] array to string first because localStorage only supports strings as values
  let toString = JSON.stringify(toDos);

  //save key = 'todos' and string form of toDos[] to localStorage
  localStorage.setItem("todos", toString);
}
