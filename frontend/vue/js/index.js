
window.addEventListener('DOMContentLoaded', main)

function main() {

    Vue.component('book-card', {
        props: ['book', 'delete-book'], // Two things in props = element and function
        template: `<div class="col s12 m6">
            <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                    <span class="card-title"> {{book.title}} </span>
                    <p> {{book.description}} </p>
                </div>
                <div class="card-action">
                    <a on:click.prevent="deleteBook(book.id)">Delete Book</a>
                </div>
            </div>
        </div>`
    })

    // <slot></slot> allow other components to insert lines when using this component
    Vue.component('loader', {
        props: ['books'],
        template: `
            <div v-if="books.length > 0">
                <slot></slot>
            </div>
            <div v-else>
                <h2>Loading...</h2>
            </div>`
    })

    // Can insert components within a component
    Vue.component('books-list', {
        props: ['books', 'delete-book'], // Props are custom attributes you can register on a component.
        template: `
            <div class="row">
                <book-card v-for="book in books" :book="book" :key="book.id" :delete-book="deleteBook"></book-card> 
            </div>`
    })

    new Vue({
        el: '#app',
        data() {
            return {
                books: [],
                book: {
                    id: 1,
                    title: 'Hello Vue',
                    description: 'The ultimate guide to Vue.js',
                    isbn: '0123456789'
                }
            }
        },
        methods: {
            fetchBooks() {
                const url = 'http://localhost:3000/books'
                fetch(url)
                    .then(response => {
                        return response.json()
                    })
                    .then(json => {
                        json.map(x => this.books.push(x))
                    })
                    .catch(err => console.log(err.message))
            },
            async postBook(book) {
                const url = 'http://localhost:3000/books'
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(book)
                }
                const response = await fetch(url, options)
                const book = response.json()
                return book
            },
            deleteBook(id) {
                const url = `http://localhost:3000/books/${id}`
                const options = {
                    method: 'DELETE'
                }
                const response = fetch(url, options)
                response
                    .then(response => response.json())
                    .then(book => {
                        this.books = this.books.filter(b => b.id != book.id)
                    })
                    .catch(err => console.error(err.message))
            }
        },
        created() {
            this.fetchBooks()
        }

    })
}