const library = document.querySelector('.book-library');
const bookForm = document.querySelector('[name="book-form"]');
const readOn = document.getElementById('read');
const unreadOn = document.getElementById('unread');
const readButton = document.querySelector('.test-class');
const bookCount = document.getElementById('book-count');
const readCount = document.getElementById('read-count');
const unreadCount = document.getElementById('unread-count');
const totalPageCount = document.getElementById('total-pages');

let bookLibrary = [];

/* book class */
class book {

    constructor(title, author, pageCount, haveRead) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount
        this.haveRead = haveRead
    }
}

/* Function to add books to bookLibrary */

function addBooks(book) {
    bookLibrary.push(book);
}

/* function to update 'Library Catalog' section based upon books in the bookLibrary array */

function updateCatalog() {
    bookCount.textContent = bookLibrary.length;

    /* iterate through bookLibrary and add up how many 'haveRead' keys are true*/
    readCount.textContent = bookLibrary.reduce((total, book) => book.haveRead ? ++total : total, 0);

    /* iterate through bookLibrary and add up how many 'haveRead' keys are false*/
    unreadCount.textContent = bookLibrary.reduce((total, book) => !book.haveRead ? ++total : total, 0);

    /* count total pages of all books */
    totalPageCount.textContent = bookLibrary.reduce((total, book) => total += Number(book.pageCount) , 0)
}

/* function to iterate through Library array and create book object from the last book object in the array */

function createBookObject() {
    for (let i = (bookLibrary.length)-1; i < bookLibrary.length; i++) {
        const book = document.createElement('div');
        book.classList.add('book');

        library.appendChild(book);

        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');
        book.append(bookInfo);

        const title = document.createElement('div');
        title.classList.add('book-title');
        title.textContent = `${bookLibrary[i].title}`;
        /* set variable that we will use in eventlistener below to check the title against bookLibrary object titles */
        const titleCheck = title.textContent
        bookInfo.appendChild(title);

        const author = document.createElement('div');
        author.classList.add('book-author');
        author.textContent = `${bookLibrary[i].author}`;
        bookInfo.appendChild(author);

        const pageCount = document.createElement('div')
        pageCount.classList.add('book-pageCount');
        pageCount.textContent = `Pages: ${bookLibrary[i].pageCount}`;
        bookInfo.appendChild(pageCount);

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container');
        book.append(btnContainer);

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
                this.textContent="Not Read";
                
                /* Make button press update the related array object 'haveRead' key value to false*/
                const titleMatch = bookLibrary.find(function(book) {
                    if(book.title === titleCheck) {
                        book.haveRead = false
                    }
                })

                /* update Library Catalog counts*/
                readCount.textContent = Number(readCount.textContent) - 1;
                unreadCount.textContent = Number(unreadCount.textContent) + 1;

            } else if (this.classList.contains('book-unread')) {
                this.classList.remove('book-unread');
                this.classList.add('book-read');
                this.textContent="Read";
                
                /* Make button press update the related array object 'haveRead' key value to true*/
                const titleMatch = bookLibrary.find(function(book) {
                    if(book.title === titleCheck) {
                        book.haveRead = true
                    }
                })

                /* update Library Catalog counts*/
                readCount.textContent = Number(readCount.textContent) + 1;
                unreadCount.textContent = Number(unreadCount.textContent) - 1;
            }
        })
        btnContainer.appendChild(haveRead);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.textContent = 'Delete';
        /* Add delete functionality to button */
        deleteButton.addEventListener('click', function() {
            /* find and remove book array element */
            bookIndex = bookLibrary.findIndex(books => books.title === titleCheck);
            bookLibrary.splice(bookIndex, 1);

            /*remove book HTML elements */
            book.remove();

            /*update Library Catalog to reflect changes*/
            updateCatalog();
        })
        btnContainer.appendChild(deleteButton);
    }
}

/* Default Books */

const testBook1 = new book('Fear and Loathing in Las Vegas','Hunter S. Thompson', 204, true );
const testBook2 = new book('Dark Matter: A Novel', 'Blake Crouch', 352, false);
const testBook3 = new book('The Fellowship of the Ring','J.R.R. Tolkien', 423, true);
const testBook4 = new book('Fahrenheit 451', 'Ray Bradbury', 249, false);

/* Add default books to bookLibrary array - Add book objects to page - update Library Catalog*/
addBooks(testBook1); createBookObject();
addBooks(testBook2); createBookObject();
addBooks(testBook3); createBookObject();
addBooks(testBook4); createBookObject();
updateCatalog();

/* Form button book add logic */

bookForm.addEventListener("submit", function(event) {
    let title = document.querySelector('[name="title"]').value;
    let author = document.querySelector('[name="author"]').value;
    let pages = document.querySelector('[name="pages"]').value;
    let readStatus = readOn.checked;
    let newBook = new book(title, author, pages, readStatus);

    /* variable we'll use to check for duplicate books */
    const duplicateCheck = bookLibrary.find(books => books.title === title);
    console.log(duplicateCheck);

    /* Determine if book already exists (trigger error alert), or if not then add the book and update the page accordingly*/
    if (duplicateCheck) {
        alert("This book already exists, please enter a new book");
        event.preventDefault();
    }
    else {
        addBooks(newBook);
    
        createBookObject();

        updateCatalog();

        /*prevent form from trying to submit results and refresh page. Reset form manually so form fields clear*/
        event.preventDefault();
        bookForm.reset();
    }
})



