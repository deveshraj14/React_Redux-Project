import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommentsThunk, nextPage, prevPage } from '../Redux/postSlice';  
import Comment from '../features/Comments';  

function Commentdata() {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.post.comments);  
  const { currentPage, postsPerPage, loading } = useSelector((state) => state.post);
  const totalPages = Math.ceil(comments.length / postsPerPage);

  useEffect(() => {
    dispatch(fetchCommentsThunk());  
  }, [dispatch]);

  if (loading) {
    return (
      <p className="text-center text-gray-600 mt-4 text-lg">Loading...</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
     
      <h1 className='text-3xl font-bold text-white text-center bg-blue-500 p-4'>Comment-Data</h1>
      
      <ul className="space-y-4 mt-8 bg-blue-50">
        
        {comments.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((comment) => (
          <Comment key={comment.id} name={comment.name} body={comment.body} />
        ))}
      </ul>
      

      
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

export default Commentdata;
