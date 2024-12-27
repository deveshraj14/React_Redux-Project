import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsThunk } from '../Redux/postSlice';  

const PostDetailPage = () => {
  const { postId } = useParams();  
  const dispatch = useDispatch();
  const posts = useSelector(state => state.post.posts);  
  const [post, setPost] = useState(null);
  const error = useSelector(state => state.post.error);

  useEffect(() => {
    
    if (posts.length === 0) {
      dispatch(fetchPostsThunk());
    } else {
     
      const currentPost = posts.find(post => post.id === parseInt(postId));
      setPost(currentPost);
    }
  }, [dispatch, posts, postId]);
  if (error) {
    return <div className="error-message text-center text-red-500">{error}</div>;
  }
  if (!post) return <div>Loading...</div>;

  return (
    <div className="post-detail">
      <div className="mt-8 ">
<div className="p-6 max-w-6xl mx-auto bg-blue-100 shadow-md rounded-lg">
  <h2 className="text-2xl font-bold text-center mb-4">{post.title}</h2>
  <p className="text-gray-700 text-base">{post.body}</p>
</div>
</div>
    </div>
  );
};

export default PostDetailPage;











