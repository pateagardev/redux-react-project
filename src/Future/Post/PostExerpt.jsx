import React, { useState, useEffect } from 'react'
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
import { Link } from 'react-router-dom';
export default function PostExerpt({post, index}) {
  return (
    <article key={`${post.id}-${index}`}>
      {/* <h3>{post.id}</h3> */}
      <div className='postdata'>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <div>
          <Link to={`/post/${post.id}`}>
            Read More
          </Link>
        </div>
        <PostAuthor userId={post.userId } />
        <TimeAgo timestamp={post.date} />
      </div>
      <ReactionButtons post={post} />
    </article>
  )
}
