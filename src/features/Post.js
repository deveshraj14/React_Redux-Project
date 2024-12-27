import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedPost } from '../Redux/postSlice';

function Post({ title, body, postId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleReadMore = () => {
    dispatch(setSelectedPost({ title, body }));
    navigate(`/postdetails/${postId}`);
  };

  return (
    <li className="border border-gray-300 rounded-lg p-6 shadow-md bg-blue-50">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-700">
        {body.slice(0, 140)}...
        <button
          onClick={handleReadMore}
          className="ml-2 text-blue-500 hover:text-blue-700"
        >
          Read More
        </button>
      </p>
    </li>
  );
}

export default Post;
