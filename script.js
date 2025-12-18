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
        console.log(event.target.checked);
    }
});

function displayBooks() {
    library.innerHTML = myLibrary.reduce((acc, val) =>
        acc + `
            <tr id="${val.id}">
                <td>${val.title}</td>
                <td>${val.author}</td>
                <td>${val.pages}</td>
                <td><input type="checkbox" ${val.read ? "checked" : ""}></td>
            </tr>
        `
    , "");
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayBooks();
}

addBookToLibrary("g", "b", 23, true);

