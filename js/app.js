//select elements
const messageEl = document.querySelector("#message");
const dateEl = document.querySelector("#date");
const timeEl = document.querySelector("#time");
const pErrorEl = document.querySelector(".error");
const saveNote = document.querySelector("#save");
const noteContainer = document.querySelector("#note-display");
const removeNotes = document.querySelector("#clear");

//eventlistners
saveNote.addEventListener('click', validationForm);
removeNotes.addEventListener('click', clearNotes);

//make input date cannot choose past date
let d = new Date();
console.log(d);
// let str = d.getFullYear-d.getMonth-d.getDay
dateEl.setAttribute("min", `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`);

//variable for count id;
let id = 0;

//create object note that have this keys
let note = {
    text: "",
    date: "",
    time: "",
    id: null
}

//array to store all note we create
let noteArray = [];

//check localstorage in the start of running this app
checkLocalStorage();

//check if we have in localStorage data of notes, if yes we display them on screen with createNote function
function checkLocalStorage() {
    let arr = JSON.parse(localStorage.getItem("notes"));
    if (arr) {
        console.log(arr);
        arr.forEach(element => {
            createNote(element.text, element.date, element.time);

        });


    }
};


// vaild funcition check that all information insert. if no give error message. else create note 
function validationForm() {
    let str = "";
    console.log(dateEl.value);
    if (!messageEl.value) {
        str = "Must enter message to note <br>"
    } else if (!dateEl.value) {
        str = "Must enter date to note <br>"
    } else if (!timeEl.value) {
        str = "Must enter time to note <br>"
    }
    pErrorEl.innerHTML = str;
    if (!str) {
        createNote(messageEl.value, dateEl.value, timeEl.value);
    }
};



//create note , insert new note to the container, create elments with classes we build before
function createNote(text, date, time) {

    //insert note object the values for keys
    note = {
        text: text,
        date: date,
        time: time,
        id: id
    }

    id++;
    //insert to array note object 
    noteArray.push(note);
    console.log(noteArray);
    //create elements for note, note = div with 4 childs (textArea,removeBtn that have icon ,p width date info + p with time info)
    let div = document.createElement('div');
    let textArea = document.createElement('textarea');
    let removeBtn = document.createElement('span');
    let iconCreate = document.createElement('i');
    let pDate = document.createElement('p');
    let pTime = document.createElement('p');

    //added classes name that we build in css
    div.className = 'note fade-in';
    removeBtn.className = 'remove-container';
    iconCreate.className = 'fa fa-remove';
    //insert relevant texts
    textArea.innerHTML = note.text;
    pDate.innerHTML = note.date;
    pTime.innerHTML = note.time;



    //add to the div we created all element we create , and insert this div to noteContainer
    removeBtn.appendChild(iconCreate);
    div.appendChild(removeBtn);
    div.appendChild(textArea);
    div.appendChild(pDate);
    div.appendChild(pTime);
    noteContainer.appendChild(div);

    //add listner to removeButton.
    removeBtn.addEventListener('click', removeNote);
    //send to function updateNote the textArea element to bo this , and the note  id of the current note clicked.
    textArea.addEventListener('change',updateNote.bind(textArea,note.id));
    //insert to localStorage the noteArray with objects of note
    localStorage.setItem("notes", JSON.stringify(noteArray));
    console.log(localStorage.getItem("notes"));


};

function updateNote(noteId){
    let text = this.value;
    noteArray.forEach(function(element){
        if(element.id === noteId){
            element.text = text;
        }
    });
    localStorage.setItem("notes", JSON.stringify(noteArray));
};

//remove note from cilent display + localStorage
function removeNote() {
    let parentEl = this.parentElement;
    let notesEl = document.querySelectorAll('.note');
    //store the current note to be remove
    let noteIndex;
    notesEl.forEach((element, index) => {
        if (element === parentEl) {
            noteIndex = index;
        }

    });
    //remove note from display
    parentEl.remove();
    //remove note from noteArray and after push it to local storage
    noteArray.splice(noteIndex, 1);
    localStorage.setItem("notes", JSON.stringify(noteArray));

};

//remove all notes from display
function clearNotes() {
    let confirm = window.confirm("Deletion will cause all information to be deleted Are you sure?");
    let notesEl = document.querySelectorAll('.note');
    console.log(notesEl)
    if (confirm === true) {
        for (let i = 0; i < notesEl.length; i++) {
            notesEl[i].remove();
        }
        localStorage.clear;
        noteArray = [];
    }
}