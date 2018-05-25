# README

Setting up guide:

Create new rails app in API mode
```
$ rails new bookshelf --api
```

Create "Book" scaffold
```
$ rails g scaffold Book title description:text isbn
```

Migrate and seed database (create some books with title, description and isbn to be seeded)
```
$ rails db:migrate
$ rails db:seed
```
Create a file `test/http/book.http` folder and input below code mainly to test use **REST Client**
```
@uri = http://localhost:3000


###
# Get all books
GET {{uri}}/books

###
# Get 1 book 
GET {{uri}}/books/3

###
# Add a book
POST {{uri}}/books
Content-Type: application/json

{
    "title": "Hello JS",
    "description": "Everything about JavaScript you need to know",
    "isbn": "0724681012"
}
```