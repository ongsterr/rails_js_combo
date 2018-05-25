
// 3. add a submit event listener to form
// 4. submitBook or submitForm (tip: reset form if successful)
// 5. postBook async function
// 6. prepend new book to bookList
// Another tip: don’t submit data if any form field is empty

const uri = 'http://localhost:3000'
const booksCollection = document.querySelector('.collection')
const form = document.querySelector('form')

form.addEventListener('submit', submitBook, false)
booksCollection.addEventListener('click', deleteBook)

fetchBooks()
    .then(addBookToList)
    .catch(error => console.log(error.message))

async function fetchBooks() {
    // What does "await" do? It waits for asynchronous function to run before moving to the next code
    const response = await fetch(uri + '/books')
    const books = response.json()
    console.log(books)
    return books
}

function addBookToList(books) {
    for (i = 0; i < books.length; i++) {
        // const newBooks = books.concat().reverse()[i] // Reverse arrangement to show latest book added first
        createBookItem(books)
    }
}

function createBookItem(book) {
    // Create an li
    // Add a "collection-item" class to the li
    // Create a p tag, with title and append to li
    // Create a p tag with description and append to li
    // Create a p tag with isbn and append to li
    // Return li
    
    let li = document.createElement('li')
    li.classList.add('collection-item')
    li.classList.add('avatar')
    li.dataset.id = book.id

    let thumb = document.createElement('IMG')
    thumb.classList.add('circle')
    thumb.src = 'https://media.bloomsbury.com/rep/bj/9781408805725.jpg'
    li.appendChild(thumb)

    let title = document.createElement('span')
    title.classList.add('title')
    title.textContent = book.title
    title.style = "font-weight: 600"
    li.appendChild(title)

    let desc = document.createElement('p')
    desc.textContent = `Description: "${book.description}"`
    desc.style = "text-indent: 10px"
    li.appendChild(desc)

    let isbn = document.createElement('p')
    isbn.textContent = `ISBN: ${book.isbn}`
    isbn.style = "text-indent: 10px"
    li.appendChild(isbn)

    let button = document.createElement('button')
    button.textContent = 'Delete Book'
    button.classList.add('btn-flat')
    li.appendChild(button)

    booksCollection.appendChild(li)
}

function submitBook(e) {
    e.preventDefault()
    const form = e.target
    const title = form.title.value
    const description = form.description.value
    const isbn = form.isbn.value
    const book = {
        title, description, isbn
    }
    
    if(validateForm()) {
        postBook(book)
            .then(book => {
                return createBookItem(book),
                console.log(book),
                form.reset()
            })
            .then(list => {
                addBookToList(list),
                alert('Form submitted')
            })
            .catch(error => console.log('Error:', error.message))
            .then(response => console.log('Success:', response))
    }
}

async function postBook(book) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }
    const response = await fetch(uri + '/books', options) //promise, async
    const newBook = response.json()
    return newBook
}

function validateForm() {
    if(form.title.value == "") {
        alert('Please fill in the blank')
        form.title.focus()
        return false
    }

    if (form.description.value == "") {
        alert('Please fill in the blank')
        form.description.focus()
        return false
    }

    if (form.isbn.value == "") {
        alert('Please fill in the blank')
        form.isbn.focus()
        return false
    }
    return true;
}

// Add a delete button for each book

function deleteBook(e) {
    if(e.target.tagName === 'BUTTON') {
        const li = e.target.parentNode
        const {id} = li.dataset
        deleteRecord(id)
            .then(bookID => {
                booksCollection.removeChild(li)
            })
            .catch(error => console.log(error))
    }
}

async function deleteRecord(bookID) {
    const url = `http://localhost:3000/books/${bookID}`
    const options = {
        method: 'DELETE'
    }
    await fetch(url, options)
    return bookID
}
