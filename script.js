const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function findBookIndexById(id) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (id === myLibrary[i].id) {
            return i;
        }
    }
    return -1;
}

const library = document.getElementById("library");

library.addEventListener("click", event => {
    if (event.target.type === "checkbox") {
        const id = event.target.closest("tr").id;
        const index = findBookIndexById(id);
        myLibrary[index].read = event.target.checked;
    } else if (event.target.type === "button") {
        const tableRow = event.target.closest("tr")
        const index = findBookIndexById(tableRow.id);
        myLibrary.splice(index, 1);
        tableRow.remove();
    }
});

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    library.innerHTML += `
        <tr id="${newBook.id}">
            <td>${newBook.title}</td>
            <td>${newBook.author}</td>
            <td>${newBook.pages}</td>
            <td><input type="checkbox" ${newBook.read ? "checked" : ""}></td>
            <td><input type="button" value="Delete"></td>
        </tr>
    `;
}

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");
const newBookForm = document.getElementById("new-book-form");
newBookForm.hidden = true;

function resetForm() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    readInput.checked = false;
    newBookForm.hidden = true;
}

const addBookButton = document.getElementById("add-book");
addBookButton.addEventListener("click", () => {
    newBookForm.hidden = false;
});

const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
    addBookToLibrary(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.checked
    );
    resetForm();
});

const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", () => {
    resetForm();
});
