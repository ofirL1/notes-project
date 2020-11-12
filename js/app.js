//select elements
let messageEl = document.querySelector("#message");
let dateEl = document.querySelector("#date");
let timeEl = document.querySelector("#time");
let pError = document.querySelector(".error");
let saveNote = document.querySelector("#save");


// vaild funcition check that all information insert
saveNote.addEventListener('click', validationForm);

function validationForm() {
    let str = "";

    if (!messageEl.value) {
        str += "Must enter message to note <br>"
    } else {
        str.replace("Must enter message to note <br>", "")
    }
    if (!dateEl.value) {
        str += "Must enter date to note <br>"
    } else {
        str.replace("Must enter date to note <br>", "")
    }
    if (!timeEl.value) {
        str += "Must enter time to note <br>"
    } else {
        str.replace("Must enter time to note <br>", "")
    }
    pError.style.color = "#ff0000"
    pError.innerHTML = str;
    if (!str) {}
};