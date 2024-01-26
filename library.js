const SHELF = document.querySelector(".library-container");

function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

const theHobbit = new Book("The Hobbit","J.R.R. Tolkien", 366, true);
const hpAndSorcStone = new Book("Harry Potter and  the Sorcerer's Stone","J.K. Rowling", 333, true);
const theHungerGames = new Book("The Hunger Games","Suzanne Collins", 374, true);
const artemisFowl = new Book("Artemis Fowl","Eoin Colfer", 396, false);

const library = [
    theHobbit,
    hpAndSorcStone,
    theHungerGames,
    artemisFowl
];

updateLibraryShelf();

function addBookToLibrary() {
    const title = prompt("Title of book");
    const author = prompt("Author of book");
    const pages = Number(prompt("Number of pages"));
    const haveRead = confirm("Have you read the book?");

    const book = new Book (title, author, pages, haveRead);
    library.push(book);
}

function updateLibraryShelf() {
    while (SHELF.firstChild) {
        SHELF.removeChild(SHELF.firstChild);
    }

    library.forEach(book => {
        const bookCard = createBookCard();

        bookCard.title.textContent = book.title;
        bookCard.author.textContent = book.author;
        bookCard.pages.textContent += book.pages;
        if (book.haveRead) {
            bookCard.read.textContent += "Yes";
        } else bookCard.read.textContent += "No";

        SHELF.appendChild(bookCard.card);
    });
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