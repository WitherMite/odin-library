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
}

const library = [
    new Book("The Hobbit","J.R.R. Tolkien", 366, true),
    new Book("Harry Potter and  the Sorcerer's Stone","J.K. Rowling", 333, true),
    new Book("The Hunger Games","Suzanne Collins", 374, true),
    new Book("Artemis Fowl","Eoin Colfer", 396, false)
];

NEW_BOOK_BTN.addEventListener("click", () => {
    MODAL.showModal();
});

CLOSE_BTN.addEventListener("click", () => {
    MODAL.close();
});

SUBMIT_BTN.addEventListener("click", addBookToLibrary);

updateLibraryShelf();

function addBookToLibrary(e) {
    e.preventDefault();
    
    const title = prompt("Title of book");
    const author = prompt("Author of book");
    const pages = Number(prompt("Number of pages"));
    const haveRead = confirm("Have you read the book?");

    const book = new Book (title, author, pages, haveRead);
    library.push(book);
    updateLibraryShelf();
    FORM.reset();
}

function updateLibraryShelf() {
    while (SHELF.firstChild) {
        SHELF.removeChild(SHELF.firstChild);
    }

    library.forEach(addBooktoShelf);
}

function addBooktoShelf(book) {
    const bookCard = createBookCard();

    bookCard.title.textContent = book.title;
    bookCard.author.textContent = book.author;
    bookCard.pages.textContent += book.pages;
    if (book.haveRead) {
        bookCard.read.textContent += "Yes";
    } else bookCard.read.textContent += "No";

    SHELF.appendChild(bookCard.card);
}

function createBookCard() {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = document.createElement("h1");
    title.classList.add("title");
    card.appendChild(title);

    const author = document.createElement("h2");
    author.classList.add("author");
    card.appendChild(author);

    const pages = document.createElement("p");
    pages.classList.add("pages");
    pages.textContent = "Pages: ";
    card.appendChild(pages);

    const read = document.createElement("p");
    read.classList.add("read");
    read.textContent = "Have read before: ";
    card.appendChild(read);

    const bookCard = {
        card: card,
        title: title,
        author: author,
        pages: pages,
        read: read
    }
    return bookCard;
}