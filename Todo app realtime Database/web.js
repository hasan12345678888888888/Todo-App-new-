const firebaseConfig = {
    apiKey: "AIzaSyDsCpop1j0BmtrghlDEw63pTQuvMXxU0TY",
    authDomain: "todoapp-bb3df.firebaseapp.com",
    databaseURL: "https://todoapp-bb3df-default-rtdb.firebaseio.com",
    projectId: "todoapp-bb3df",
    storageBucket: "todoapp-bb3df.firebasestorage.app",
    messagingSenderId: "1732079236",
    appId: "1:1732079236:web:d967bfbfbf89332fa61cd1"
  };

const frb = firebase.initializeApp(firebaseConfig);
console.log(frb.database);

// Listen for new items added to Firebase
firebase.database().ref("todos").on("child_added", (data) => {
    var liElement = document.createElement('li');
    var liText = document.createTextNode(data.val().value);
    liElement.appendChild(liText);

    // Delete button
    var delBtn = document.createElement('button');
    var delbtnText = document.createTextNode('Delete');
    delBtn.appendChild(delbtnText);
    delBtn.setAttribute("id", data.val().key);
    delBtn.setAttribute("onclick", "deleteItem(this)");

    // Edit button
    var editBtn = document.createElement('button');
    var editbtnText = document.createTextNode('Edit');
    editBtn.appendChild(editbtnText);
    editBtn.setAttribute("onclick", "editItem(this)");
    editBtn.setAttribute("id", data.val().key);

    // Append buttons to liElement
    liElement.appendChild(delBtn);
    liElement.appendChild(editBtn);

    // Add liElement to the list
    var list = document.getElementById('list');
    list.appendChild(liElement);
});

// Function to add a new todo
function addTodo() {
    var input = document.getElementById('inputField');
    var key = firebase.database().ref("todos").push().key;
    var obj = {
        value: input.value,
        key: key
    };
    firebase.database().ref("todos").child(key).set(obj);
    input.value = ""; // Clear the input field after adding
}

// Function to delete all todos
function deleteAll() {
    firebase.database().ref("todos").remove(); // Remove all items from Firebase
    var list = document.getElementById('list');
    list.innerHTML = ""; // Clear the list on the frontend
}

// Function to delete a single todo
function deleteItem(a) {
    console.log(a.id);
    firebase.database().ref("todos").child(a.id).remove();
    a.parentNode.remove();
}

// Function to edit a todo
function editItem(b) {
    var val = b.parentNode.firstChild.nodeValue;
    var userInput = prompt("Enter updated value", val); // Default to current value
    if (userInput) {
        var editTodo = {
            value: userInput,
            key: b.id
        };
        firebase.database().ref("todos").child(b.id).set(editTodo);
        b.parentNode.firstChild.nodeValue = userInput;
    }
}
