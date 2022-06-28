const library = document.querySelector('.book-library');
const bookForm = document.querySelector('[name="book-form"]');
const readOn = document.getElementById('read');
const unreadOn = document.getElementById('unread');
const readButton = document.querySelector('.test-class');

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

        const haveRead = document.createElement('button');
        if (bookLibrary[i].haveRead) {
            haveRead.classList.add('book-read');
            haveRead.textContent = "Read";
            
        } else {
            haveRead.classList.add('book-unread');
            haveRead.textContent = "Not Read";
        }

        haveRead.addEventListener('click', function() {
            if (this.classList.contains('book-read')) {
                this.classList.remove('book-read');
                this.classList.add('book-unread');
                this.textContent="Not read";
            } else if (this.classList.contains('book-unread')) {
                this.classList.remove('book-unread');
                this.classList.add('book-read');
                this.textContent="Read";
            }
        })

        book.appendChild(haveRead);
    }
}

bookForm.addEventListener("submit", function(event) {
    let title = document.querySelector('[name="title"]').value;
    let author = document.querySelector('[name="author"]').value;
    let pages = document.querySelector('[name="pages"]').value;
    let readStatus = readOn.checked;
    let newBook = new book(title, author, pages, readStatus);

    addBooks(newBook);
    
    createBookObject();

    /*prevent form from trying to submit results and refresh page. Reset form manually so form fields clear*/
    event.preventDefault();
    bookForm.reset();
})

readButton.addEventListener('click', function() {
    if (this.classList.contains('book-read')) {
        this.classList.remove('book-read');
        this.classList.add('book-unread');
        this.textContent="Not read";
    } else if (this.classList.contains('book-unread')) {
        this.classList.remove('book-unread');
        this.classList.add('book-read');
        this.textContent="Read";
    }
})

/*
unreadButton.addEventListener('click', function() {
    this.classList.remove('book-unread');
    this.classList.add('book-read');
    this.textContent="Read";
})
*/