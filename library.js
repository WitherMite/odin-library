const SHELF = document.querySelector(".library-container");
const NEW_BOOK_BTN = document.querySelector(".new-book-btn");
const MODAL = document.querySelector("#new-book-modal");
const FORM = document.querySelector("#new-book-form");
const CLOSE_BTN = document.querySelector(".close-btn");
const SUBMIT_BTN = document.querySelector(".submit-btn");

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.toggleRead = function() {
        this.haveRead = !this.haveRead;
    };
}

const library = [
    new Book("The Hobbit","J.R.R. Tolkien", 366, true),
    new Book("Harry Potter and  the Sorcerer's Stone","J.K. Rowling", 333, true),
    new Book("The Hunger Games","Suzanne Collins", 374, true),
    new Book("Artemis Fowl","Eoin Colfer", 396, false)
];

NEW_BOOK_BTN.addEventListener("click", () => MODAL.showModal());
CLOSE_BTN.addEventListener("click", () => MODAL.close());
SUBMIT_BTN.addEventListener("click", addBookToLibrary);

updateLibraryShelf();

function addBookToLibrary(e) {
    e.preventDefault();
    if (!FORM.reportValidity()) return;

    const title = FORM.querySelector("#book-title").value;
    const author = FORM.querySelector("#book-author").value;
    const pages = FORM.querySelector("#book-pages").value;
    const haveRead = FORM.querySelector("#book-read").value;

    library.push(new Book (title, author, pages, haveRead));
    updateLibraryShelf();
    FORM.reset();
    MODAL.close();
}

function updateLibraryShelf() {
    while (SHELF.firstChild) {
        SHELF.removeChild(SHELF.firstChild);
    }

    library.forEach(addBooktoShelf);
}

function addBooktoShelf(book, index) {
    const bookCard = createBookCard();
    
    bookCard.delBtn.dataset["libraryIndex"] = index;
    bookCard.delBtn.addEventListener("click", deleteBook);
    bookCard.readBtn.dataset["libraryIndex"] = index;
    bookCard.readBtn.addEventListener("click", readBook);

    bookCard.title.textContent = book.title;
    bookCard.author.textContent = book.author;
    bookCard.pages.textContent += book.pages;
    if (book.haveRead) {
        bookCard.read.textContent += "Yes";
    } else bookCard.read.textContent += "No";

    SHELF.appendChild(bookCard.card);
}

function deleteBook() {
    const libraryIndex = Number(this.dataset["libraryIndex"]);
    library.splice(libraryIndex, 1);
    updateLibraryShelf();
}

function readBook() {
    const libraryIndex = Number(this.dataset["libraryIndex"]);
    library[libraryIndex].toggleRead();
    updateLibraryShelf();
}

function createBookCard() {
    const template = document.querySelector("#card-template");
    const card = template.content.cloneNode(true);

    return {
        card,
        delBtn: card.querySelector(".delete-btn"),
        title: card.querySelector(".title"),
        author: card.querySelector(".author"),
        pages: card.querySelector(".pages"),
        read: card.querySelector(".read"),
        readBtn: card.querySelector(".read-btn")
    };
}