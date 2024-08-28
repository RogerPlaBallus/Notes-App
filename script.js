const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

// show notes from local storage when page loads for the first time or when the "Show Notes" button is clicked again
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

// retrieve notes from local storage
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// create new note when button is clicked
createBtn.addEventListener("click", ()=>{
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    notesContainer.appendChild(inputBox).appendChild(img);
})

// delete note when delete icon is clicked
notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    }
    else if (e.target.tagName === "P"){ // update storage when  "p" is edited
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function(){
                updateStorage();
            }
        })
    }
})

// prevent page from refreshing when pressing Enter while editing a note
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
})


