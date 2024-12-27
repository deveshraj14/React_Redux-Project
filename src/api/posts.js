import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// export const fetchPosts = async () => {
//   const response = await axios.get(API_URL);
//   return response.data;
// };

export const fetchPosts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching posts:", error);
    throw new Error('Failed to fetch posts. Please try again later.');
  }
};