# Lab 05: Basic Web API with Express

## Goal

In this lab, students will build a small HTTP Web API using the **Express** framework. The focus is on:

- creating an Express application and defining routes (`app.get`, `app.post`, `app.put`, `app.delete`);
- using route parameters (`req.params`), query strings (`req.query`) and JSON request bodies (`req.body`);
- sending JSON responses with the appropriate HTTP status codes;
- validating input and reporting errors;
- testing an API with the Rest Client extension of VS Code.

Reference material: wiki page [Express Framework](https://github.com/isel-leic-ipw/2627i-APW-LEIC33D-34D/wiki/12-Express-Framework).

## General instructions

1. Work in a new directory `lab05/` inside your private repository.
2. Use ECMAScript modules (`.mjs` files or `"type": "module"` in `package.json`).
3. Implement the API step by step and test each step before moving to the next one.
4. All data is kept **in memory**; no database is used.
5. Commit your work at the end of each part.

### Initial commands

```bash
mkdir lab05 && cd lab05
npm init -y
npm install express
```

### Package configuration

In `package.json`, add:

```json
{
  "type": "module",
  "scripts": {
    "start": "node server.mjs",
    "dev": "node --watch server.mjs"
  }
}
```

Run the server in development mode (it restarts when a file changes):

```bash
npm run dev
```

### Example project structure

```text
lab05/
├── requests/
│   └── books.http
├── server.mjs
├── package.json
└── node_modules/
```

---

## Part A: Exercise 1 – Simple Book Management API

Using the **Express** framework in Node.js, create a **Web API** to manage a collection of books stored in memory (using an array). Each book must have the following properties:

- `id` – automatically generated unique identifier
- `name` – string representing the book's name
- `authors` – array of strings representing the authors' names
- `pages` – number of pages

### Requirements

The API must support the following operations:

| HTTP Method | Path Template    | Description                                                                                      |
|-------------|------------------|--------------------------------------------------------------------------------------------------|
| GET         | `/books`         | Returns all books. Supports a **query string** parameter `limit` to restrict the number of books returned. |
| GET         | `/books/{id}`    | Returns the book with the specified id.                                                          |
| POST        | `/books`         | Creates a new book. Requires a JSON body with name and authors (pages is optional).              |
| DELETE      | `/books/{id}`    | Deletes a book with the specified id.                                                            |
| PUT         | `/books/{id}`    | Replaces a book with the specified id.                                                           |


### Additional Notes

- All responses must be in JSON format.
- The API should handle errors properly, returning meaningful error messages (*e.g.* "Book not found", "Invalid data").
    - The server must run on port 8000.
- Books must be stored in memory (not in a database), using an array.

### Example

- Request **body** for creating a book:

```json
{
    "name": "A História Interminável",
    "authors": ["Michael Ende"],
    "pages": 348
}
```

- Example response **body**:

```json
{
    "id": 1,
    "name": "A História Interminável",
    "authors": ["Michael Ende"],
    "pages": 348
}
```

### Suggested steps

#### Step 1: Application skeleton

1. Create `server.mjs`, import `express`, and create the application.
2. Add the middleware `app.use(express.json())` to parse JSON request bodies.
3. Define the array `BOOKS` (can start with one or two books) and a variable `currentId` for generating ids.
4. Start the server on port 8000 with `app.listen()`.

```javascript
import express from 'express';

const PORT = 8000;
const BOOKS = [];
let currentId = 1;

const app = express();
app.use(express.json());

// TODO: routes

app.listen(PORT, () => console.log(`Books API listening on port ${PORT}!`));
```

#### Step 2: Read operations

1. Implement `GET /books` returning `{ "books": [...] }`.
2. Add support for the query string `limit` (*e.g.* `/books?limit=2`).
    - `req.query.limit` is a **string**; convert it to a number before using it.
    - If `limit` is not a positive integer, respond with status `400`.
3. Implement `GET /books/:id`.
    - Route parameters are **strings**; convert or compare carefully.
    - If the book does not exist, respond with status `404`.

#### Step 3: Create a book

1. Implement `POST /books`.
2. Validate the body:
    - `name` is a non-empty string;
    - `authors` is a non-empty array of strings;
    - `pages`, if present, is a positive integer.
3. Generate the `id` on the server, add the book to the array, and respond with status `201` and the created book.

#### Step 4: Replace and delete

1. Implement `PUT /books/:id`, which **replaces** the book (the same validation as in `POST`; the `id` must not change).
2. Implement `DELETE /books/:id`, responding with the deleted book.
3. In both operations, respond with `404` if the book does not exist.

#### Step 5: Test the API

Create the file `requests/books.http` and write at least one request for each of the following cases:

- list all books, and list with `limit`;
- get an existing book, and a non-existing book;
- create a valid book, and invalid books (missing `name`, empty `authors`, invalid `pages`);
- replace and delete an existing book, and a non-existing one;
- a request with an invalid `limit` (*e.g.* `limit=abc`, `limit=-1`).

Example of a request:

```http
### Create a book
POST http://localhost:8000/books HTTP/1.1
Content-Type: application/json

{
  "name": "A História Interminável",
  "authors": ["Michael Ende"],
  "pages": 348
}
```

### Status codes

| Situation                                   | Status code |
|---------------------------------------------|-------------|
| Successful read, replace, or delete         | `200`       |
| Successful creation                         | `201`       |
| Invalid body or query string                | `400`       |
| Book id does not exist                      | `404`       |

Errors must also be sent as JSON, *e.g.*:

```json
{ "error": "Book not found" }
```

### Common mistakes

- `req.body` is `undefined`: the middleware `express.json()` is missing or the request has no `Content-Type: application/json`.
- A response is sent twice (*e.g.* `res.send(...)` followed by `res.status(201).end()`): the second call fails. Send once and use `return` after an error response.
- Comparing `book.id === req.params.id` always fails, because `req.params.id` is a string.

---

## Part B: Exercise 2 – Extensions (optional)

Extend the Books API with the following features:

1. `GET /books?author=<name>` returns only the books written by the given author (case-insensitive). It must be combinable with `limit`.
2. `PATCH /books/:id` partially updates a book: only the properties present in the body are changed and validated.
3. `POST /books/:id/authors` adds an author to an existing book and does not allow duplicates (status `409` if the author already exists).

Add the corresponding requests to `requests/books.http`.

---

## Deliverables

At the end of the lab, the repository must contain:

- `server.mjs` with the Books API;
- `requests/books.http` with the test requests;
- `package.json` with the `start` and `dev` scripts.

## Checklist

- [ ] The server starts with `npm start` on port 8000.
- [ ] All five operations work and return JSON.
- [ ] `limit` is validated.
- [ ] Status codes `200`, `201`, `400`, and `404` are used correctly.
- [ ] Ids are generated by the server and never reused after a delete.
- [ ] The `.http` file covers success and error cases.

## Discussion questions

1. Why is `POST` used to create a book instead of `PUT`?
2. What is the difference between `PUT` and `PATCH`?
3. What happens to the data when the server restarts? What would be needed to avoid it?
4. Why are `GET /books/:id` and `GET /books?limit=2` handled by different routes, even though both use `GET`?
