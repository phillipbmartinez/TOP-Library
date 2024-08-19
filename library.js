const addButton = document.getElementById("addButton");
const libraryBookCardsContainer = document.getElementById("libraryBookCardsContainer");

addButton.addEventListener("click", function (event) {
    event.preventDefault();
    addBookToLibrary();
});

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, has ${pages} pages, read = ${this.read}`
    }
    this.sayHello = function () {
        return "Hello!"
    }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, "no");
const savageSon = new Book("Savage Son", "Jack Carr", 400, "yes");
const onlyTheDead = new Book("Only The Dead", "Jack Carr", 350, "yes");
const redSkyMourning = new Book("Red Sky Mourning", "Jack Carr", 450, "yes");

let myLibrary = [theHobbit, savageSon, onlyTheDead, redSkyMourning];

// Function to add existing books to the library
function initializeLibrary() {
    libraryBookCardsContainer.innerHTML = "";
    myLibrary.forEach(book => {
        const existingBookCard = createBookCard(book);
        libraryBookCardsContainer.appendChild(existingBookCard);
    });
}

// Add book to library
function addBookToLibrary() {
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");
    const readInput = document.getElementById("read");

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = readInput.value.toLowerCase();

    if (title === "" || author === "" || pages === "" || read === "") {
        alert("All fields required.")
    } else {
        const newBook = new Book(title, author, pages, read);
        myLibrary.push(newBook);
    
        // Create and add the book card
        const newBookCard = createBookCard(newBook);
        libraryBookCardsContainer.appendChild(newBookCard);
    
        // Clear input fields
        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        readInput.value = "";
    }
}

function createBookCard(book) {
    const card = document.createElement("div");
    card.classList.add("bookCard");

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.innerHTML = "<strong>X</strong>";

    // Create read button
    const checkIcon = document.createElement("img");
    checkIcon.src = "check.svg"
    const readButton = document.createElement("button");
    readButton.classList.add("readButton");
    readButton.appendChild(checkIcon);

    card.innerHTML = `
        <p class="bookTitles"><strong>Title:</strong> ${book.title}</p>
        <p class="bookAuthors"><strong>Author:</strong> ${book.author}</p>
        <p class="bookPages"><strong>Pages:</strong> ${book.pages}</p>
        <p class="bookRead"><strong>Read:</strong> ${book.read}</p>
    `;

    // Attach event listener to the delete button
    deleteButton.addEventListener("click", function () {
        card.remove(); // Remove the card from the DOM
        myLibrary = myLibrary.filter(b => b.title !== book.title || b.author !== book.author); // Remove book from the array
    });

    readButton.addEventListener("click", function () {
        if (book.read === "no") {
            book.read = "yes";
            card.innerHTML = `
            <p class="bookTitles"><strong>Title:</strong> ${book.title}</p>
            <p class="bookAuthors"><strong>Author:</strong> ${book.author}</p>
            <p class="bookPages"><strong>Pages:</strong> ${book.pages}</p>
            <p class="bookRead"><strong>Read:</strong> ${book.read}</p>
        `;
            card.appendChild(deleteButton);
            card.appendChild(readButton);
        } else {
            card.innerHTML = `
            <p class="bookTitles"><strong>Title:</strong> ${book.title}</p>
            <p class="bookAuthors"><strong>Author:</strong> ${book.author}</p>
            <p class="bookPages"><strong>Pages:</strong> ${book.pages}</p>
            <p class="bookRead"><strong>Read:</strong> ${book.read}</p>
        `;
            card.appendChild(deleteButton);
            card.appendChild(readButton);
        }
    });

    // Append delete button to the new card
    card.appendChild(deleteButton);
    card.appendChild(readButton);

    return card;
}

function printLibrary() {
    console.log("The books in your library are: ")
    for (i = 0; i < myLibrary.length; i++) {
        console.log(`Book #${i + 1}: ${myLibrary[i].info()}`);
    }
}

initializeLibrary();