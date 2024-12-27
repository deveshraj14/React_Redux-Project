import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsThunk, nextPage, prevPage, selectPaginatedPosts } from '../Redux/postSlice';
import { useNavigate } from 'react-router-dom';
import Post from '../features/Post';

function Homepage() {
  const dispatch = useDispatch();
  const posts = useSelector(selectPaginatedPosts);
  const { currentPage, postsPerPage, loading } = useSelector((state) => state.post);
  const totalPages = useSelector((state) => Math.ceil(state.post.posts.length / postsPerPage));
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPostsThunk());
  }, [dispatch]);

  const handleImagedata = () => {
    navigate('/commentsdata');
  };

  const handlehome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <p className="text-center text-gray-600 mt-4 text-lg">Loading...</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Navigation Bar */}
      <div className="bg-blue-500 text-white p-4 mb-8 shadow-lg ">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Advanced State Management Webapp</h1>
          <div className="flex space-x-4">
            <button
              className="border-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md "
              onClick={handlehome}
            >
              HomeData
            </button>
            <button
              className="border-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
              onClick={handleImagedata}
            >
              CommentsData
            </button>
          </div>
        </div>
      </div>

     
      <ul className="space-y-4 mt-8">
        {posts.map((post) => (
          <Post key={post.id} title={post.title} body={post.body} postId={post.id} />
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
          onClick={() => dispatch(prevPage())}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md disabled:opacity-50"
          onClick={() => dispatch(nextPage())}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Homepage;
