// Define interfaces for books, genres, and reviews
export interface Book {
    title: string;
    genreId: number;
    id?: number; 
  }
  
export interface Genre {
    title: string;
    id: number;
  }
  
export interface Review {
    author: string;
    text: string;
    stars: number;
    bookId: number;
    id?: number; 
  }