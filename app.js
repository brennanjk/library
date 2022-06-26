const library = document.querySelector('.book-library');
const bookForm = document.querySelector('[name="book-form"]');
const readButton = document.getElementById('read');
const unreadButton = document.getElementById('unread');

let bookLibrary = [];

/* book constructor */
function book(title, author, pageCount, haveRead) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount
    this.haveRead = haveRead
}

/* test book */

let testBook = new book('Fear and Loathing in Las Vegas','Hunter S. Thompson', 204, true )

/* Add book to bookLibrary */

function addBooks(book) {
    bookLibrary.push(book);
}

addBooks(testBook);

/* function to iterate through Library and create page objects for books */

function createBookObject() {
    for (let i = (bookLibrary.length)-1; i < bookLibrary.length; i++) {
        const book = document.createElement('div');
        book.classList.add('book');

        library.appendChild(book);

        const title = document.createElement('div');
        title.classList.add('book-title');
        title.textContent = `Title: ${bookLibrary[i].title}`;
        book.appendChild(title);

        const author = document.createElement('div');
        author.classList.add('book-author');
        author.textContent = `Author: ${bookLibrary[i].author}`;
        book.appendChild(author);

        const pageCount = document.createElement('div')
        pageCount.classList.add('book-pageCount');
        pageCount.textContent = `Page Count: ${bookLibrary[i].pageCount}`;
        book.appendChild(pageCount);

        const haveRead = document.createElement('div');
        haveRead.classList.add('book-read');
        haveRead.textContent = `Read: ${bookLibrary[i].haveRead}`;
        book.appendChild(haveRead);
    }
}

bookForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let title = document.querySelector('[name="title"]').value;
    let author = document.querySelector('[name="author"]').value;
    let pages = document.querySelector('[name="pages"]').value;
    let readStatus = readButton.checked;
    let newBook = new book(title, author, pages, readStatus);

    addBooks(newBook);
    
    createBookObject();
    /*prevent form from trying to submit results and refresh page. Reset form manually so form fields clear*/
    bookForm.reset();
})