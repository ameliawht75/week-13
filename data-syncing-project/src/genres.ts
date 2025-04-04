import { Genre } from "./types";
import { genresContainer } from "./main";

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

const genreIdTextbox = document.getElementById("genre-id-textbox") as HTMLInputElement | null;

async function onDeleteGenreClick(): Promise<void> {
  if (!genreIdTextbox) {
    console.error("Genre ID textbox not found in the DOM.");
    return;
  }
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