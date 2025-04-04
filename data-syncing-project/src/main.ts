import "bootstrap/dist/css/bootstrap.min.css";
import { Book } from "./types";
import { Genre } from "./types";
import { Review } from "./types";

// DOM elements with proper type assertions
export const booksContainer = document.getElementById("books-container") as HTMLElement;
export const genresContainer = document.getElementById("genres-container") as HTMLElement;
export const reviewsContainer = document.getElementById("reviews-container") as HTMLElement;

export const genreIdTextbox = document.getElementById("genre-id-textbox") as HTMLInputElement;
export const reviewIdTextbox = document.getElementById("review-id-textbox") as HTMLInputElement;


/*****Books*****/
async function onFetchBooksClick(): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/books");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const bookList: Book[] = await response.json();

    booksContainer.innerHTML = bookList
      .map(
        (book) => `<div class="bg-light rounded mt-5">
          <h3>${book.title}</h3>
          <p>${book.genreId}</p>
        </div>`
      )
      .join("");
  } catch (error) {
    console.error("Error fetching books:", error);
    alert("Failed to fetch books. Please check the console for details.");
  }
}

let lastCreatedItem: Book | null = null;

async function onCreateBookClick(): Promise<void> {
  const testBook: Book = { title: "Test", genreId: 1 };
  try {
    const response = await fetch("http://localhost:3000/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testBook),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newlyCreatedItem: Book = await response.json();
    lastCreatedItem = newlyCreatedItem;
    onFetchBooksClick();
  } catch (error) {
    console.error("Error creating book:", error);
    alert("Failed to create book. Please check the console for details.");
  }
}

//Attach the function to a button click event
const createBookButton = document.getElementById("create-book-button");
if (createBookButton) {
  createBookButton.addEventListener("click", onCreateBookClick);
}

async function onDeleteBookClick(): Promise<void> {
  const bookId = prompt("Enter the ID of the book you want to delete:");

  if (!bookId) {
    alert("Please enter a valid Book ID.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/books/${bookId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert(`Book with ID ${bookId} deleted successfully!`);
      onFetchBooksClick();
    } else {
      alert("Failed to delete the book. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting the book:", error);
    alert("An error occurred while deleting the book.");
  }
}

//Attach the function to a button click event
const deleteBookButton = document.getElementById("delete-book-button");
if (deleteBookButton) {
  deleteBookButton.addEventListener("click", onDeleteBookClick);
}

/***** GENRES *****/

async function onFetchGenresClick(): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/genres");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const genreList: Genre[] = await response.json();

    genresContainer.innerHTML = genreList
      .map(
        (genre) => `<div class="bg-light rounded mt-5">
          <h3>${genre.title}</h3>
          <p>id: ${genre.id}</p>
        </div>`
      )
      .join("");
  } catch (error) {
    console.error("Error fetching genres:", error);
    alert("Failed to fetch genres. Please check the console for details.");
  }
}

async function onCreateGenreClick(): Promise<void> {
  const newGenre: Genre = { title: "New Genre", id: 0 }; // id 0 for now, backend will assign.
  try {
    const response = await fetch("http://localhost:3000/genres", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGenre),
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const createdGenre: Genre = await response.json();
    console.log("Created Genre:", createdGenre);
    onFetchGenresClick();
  } catch (error) {
    console.error("Error creating genre:", error);
    alert("Failed to create genre. Please check the console for details.");
  }
}

//Attach the function to a button click event
const createGenreButton = document.getElementById("create-genre-button");
if (createGenreButton) {
  createGenreButton.addEventListener("click", onCreateGenreClick);
}

const deleteGenreButton = document.getElementById("delete-genre-button");
if (deleteGenreButton) {
  deleteGenreButton.addEventListener("click", onDeleteGenreClick);
}

async function onDeleteGenreClick(): Promise<void> {
  const idToDelete = genreIdTextbox.value;
  if (!idToDelete) {
    console.log("Enter a genre ID to delete");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/genres/${idToDelete}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert(`Genre with ID ${idToDelete} deleted successfully!`);
      onFetchGenresClick();
    } else {
      alert("Failed to delete genre. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting genre:", error);
    alert("An error occurred while deleting the genre.");
  }

  genreIdTextbox.value = "";
}

/***** Reviews *****/

async function onFetchReviewsClick(): Promise<void> {
  try {
    const response = await fetch("http://localhost:3000/reviews");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const reviewsList: Review[] = await response.json();

    console.log("Fetched Reviews:", reviewsList);

    reviewsContainer.innerHTML = reviewsList
      .map(
        (review) => `
          <div class="card p-3 shadow-sm mt-3">
            <h4>⭐ ${review.stars}/5</h4>
            <p><strong>${review.author} says:</strong> ${review.text}</p>
            <p><small>Book ID: ${review.bookId}</small></p>
          </div>
        `
      )
      .join("");
  } catch (error) {
    console.error("Error fetching reviews:", error);
    alert("Failed to fetch reviews. Please check the console for details.");
  }
}



async function onCreateReviewsClick(): Promise<void> {
  const newReview: Review = {
    author: "Test User",
    text: "This is a test review.",
    stars: 4,
    bookId: 1,
  };

  try {
    const response = await fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    if (!response.ok) {
      throw new Error("Failed to create review");
    }

    const createdReview: Review = await response.json();
    console.log("Created Review:", createdReview);

    onFetchReviewsClick();
  } catch (error) {
    console.error("Error creating review:", error);
    alert("Failed to create review. Please check the console for details.");
  }
}

//Attach the function to a button click event
const createReviewButton = document.getElementById("create-review-button");
if (createReviewButton) {
  createReviewButton.addEventListener("click", onCreateReviewsClick);
}



async function onDeleteReviewClick(): Promise<void> {
  const reviewId = reviewIdTextbox.value;

  if (!reviewId) {
    alert("Please enter a Review ID.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert(`Review with ID ${reviewId} deleted successfully!`);
      onFetchReviewsClick();
    } else {
      alert("Failed to delete the review. Please try again.");
    }
  } catch (error) {
    console.error("Error deleting the review:", error);
    alert("An error occurred while deleting the review.");
  }
  reviewIdTextbox.value = "";
}

//Attach the function to a button click event
const deleteReviewButton = document.getElementById("delete-review-button");
if (deleteReviewButton) {
  deleteReviewButton.addEventListener("click", onDeleteReviewClick);
}