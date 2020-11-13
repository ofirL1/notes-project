//select elements
const messageEl = document.querySelector("#message");
const dateEl = document.querySelector("#date");
const timeEl = document.querySelector("#time");
const pErrorEl = document.querySelector(".error");
const saveNote = document.querySelector("#save");
const noteContainer = document.querySelector("#note-display");
const removeNotes = document.querySelector("#clear");



saveNote.addEventListener('click', validationForm);
removeNotes.addEventListener('click', clearNotes);

// vaild funcition check that all information insert. if no give error message. else create note 
function validationForm() {
    let str = "";

    if (!messageEl.value) {
        str = "Must enter message to note <br>"
    } else if (!dateEl.value) {
        str = "Must enter date to note <br>"
    } else if (!timeEl.value) {
        str = "Must enter time to note <br>"
    }
    pErrorEl.style.color = "#ff0000"
    pErrorEl.innerHTML = str;
    if (!str) {
        createNote(messageEl.value, dateEl.value, timeEl.value);
    }
};

//create object note that have this keys
let note = {
    text: "",
    date: "",
    time: ""
}
//array to store all note we create
let noteArray = [];

//create note , insert new note to the container, create elments with classes we build before
function createNote(message, date, time) {

    //insert note object the values for keys
    note = {
        text: message,
        date: date,
        time: time
    }
    //insert to array note object 
    noteArray.push(note);
    console.log(note);
    let div = document.createElement('div');
    let textArea = document.createElement('textarea');
    let removeBtn = document.createElement('span');
    let iconCreate = document.createElement('i');
    let pDate = document.createElement('p');
    let pTime = document.createElement('p');

    div.className = 'note fade-in';
    textArea.innerHTML = note.text;
    removeBtn.className = 'remove-container';
    iconCreate.className = 'fa fa-remove';
    pDate.innerHTML = note.date;
    pTime.innerHTML = note.time;




    noteContainer.appendChild(div);
    removeBtn.appendChild(iconCreate);
    div.appendChild(removeBtn);
    div.appendChild(textArea);
    div.appendChild(pDate);
    div.appendChild(pTime);

    removeBtn.addEventListener('click',removeNote);
  

};


//remove note
function removeNote(){
    let parentEl = this.parentElement;
    parentEl.remove();
};

//remove all notes from display
function clearNotes() {
    let confirm = window.confirm("Deletion will cause all information to be deleted Are you sure?");
    let notesEl = document.querySelectorAll('.note');
    console.log(notesEl)
    if (confirm === true)
        for (let i = 0; i < notesEl.length; i++) {
            notesEl[i].remove();
            console.log(i)

        }
}