import { Review } from "./types";
import { reviewsContainer } from "./main";

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