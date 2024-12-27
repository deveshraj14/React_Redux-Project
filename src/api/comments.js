import axios from 'axios';
const API_URL = 'https://jsonplaceholder.typicode.com/comments';

export const fetchPostsComments = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching comments:", error);
    throw new Error('Failed to fetch comments. Please try again later.');
  }
};
