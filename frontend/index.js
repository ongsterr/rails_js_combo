/* From Materialise CSS
<li class="collection-item avatar">
    <img src="images/yuna.jpg" alt="" class="circle">
    <span class="title">Title</span>
    <p>Description
        <br> ISBN
    </p>
    <a href="#!" class="secondary-content">
        <i class="material-icons"></i>
    </a>
</li>
*/

/* Method #1
const uri = 'http://localhost:3000'
const request = await fetch(uri + '/books')

console.log(request) // "books" is a promise fetched

request
.then(res => {
    // console.log(res)
    // console.log(res.body)
    return res.json()
})
.then(books => {
    // console.log(books)
    for(i=0; i<books.length; i++) {
        createBookItem(books[i])
    }
})
*/

const books_collection = document.querySelector('.collection')

// Method #2: async function use promises (new to ES6)
const uri = 'http://localhost:3000'

async function fetchBooks() {
    // What does "await" do? It waits for asynchronous function to run before moving to the next code
    const response = await fetch(uri + '/books')
    const books = response.json()
    return books
}

fetchBooks()
    .then(addBookToList)
    .catch(err => console.log(err.message))

function addBookToList(books) {
    for (i = 0; i < books.length; i++) {
        createBookItem(books[i])
    }
}

// function createBookItem({id, title, description:desc, isbn})

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
    // thumb.width = '100'
    li.appendChild(thumb)

    let title = document.createElement('span')
    thumb.classList.add('title')
    title.textContent = book.title
    title.style = "font-weight: 600"
    li.appendChild(title)

    let description = document.createElement('p')
    description.textContent = `Description: "${book.description}"`
    description.style = "text-indent: 10px"
    li.appendChild(description)

    let isbn = document.createElement('p')
    isbn.textContent = `ISBN: ${book.isbn}`
    isbn.style = "text-indent: 10px"
    li.appendChild(isbn)

    books_collection.appendChild(li)
}

// 3. add a submit event listener to form 
// 4. submitBook or submitForm (tip: reset form if successful)
// 5. postBook async function
// 6. prepend new book to bookList
// Another tip: don’t submit data if any form field is empty

const form = document.querySelector('form')
const event = form.addEventListener('submit', submitBook)

function submitBook(e) {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value
    const isbn = e.target.isbn.value
    const book = {
        title: title,
        description: description,
        isbn: isbn
    }

    if(validateForm()) {
        postBook(book)
            .then(
                alert('Form submitted'),
                form.reset(),
                books_collection.prepend(createBookItem(book)),
                console.log(book)
            )
            .catch(err => console.log(err.message))
    }
}

async function postBook(book) {
    const url = 'http://localhost:3000/books'
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(book)
    }
    const responsePost = await fetch(url, options) //promise, async
    const bookJson = await responsePost.json()
    return bookJson
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