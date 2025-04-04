import { Book } from "./types";
import { booksContainer } from "./main";

export async function fetchBooks() {
  const response = await fetch("http://localhost:3000/books");
  const books: Book[] = await response.json();
  booksContainer.innerHTML = books.map(book =>
    `<div><h3>${book.title}</h3><p>${book.genreId}</p></div>`
  ).join("");
}

export async function createBook() {
  const book: Book = { title: "Test", genreId: 1 };
  await fetch("http://localhost:3000/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book),
  });
  await fetchBooks();
}

export async function deleteBook(id: number) {
  await fetch(`http://localhost:3000/books/${id}`, { method: "DELETE" });
  await fetchBooks();
}
