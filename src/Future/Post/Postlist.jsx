import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostExerpt from './PostExerpt';
import { getAllPost, getAllStatus } from './PostSlice';
import { fetchPosts } from './PostSlice';

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getAllPost);
  const postsStatus = useSelector(getAllStatus);
  const [visiblePosts, setVisiblePosts] = useState(6); // Display 6 posts

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts());
    }
  }, [dispatch, postsStatus]);

  const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date)); // Sort posts by date

  const filteredPosts = orderedPosts.slice(0, visiblePosts).map((post) => (
    <PostExerpt key={post.id} post={post} />
  ));

  const handleLoadMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 12); // Load 12 more posts
  };

  return (
    <div className="article-wrapper">
      <div className="article-grid">
        {filteredPosts} {/* Render the filtered posts directly */}
      </div>
      {visiblePosts < posts.length && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}
    </div>
  );
};

export default PostList;
