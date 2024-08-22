import React, { useState, useEffect } from 'react'
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';
import ReactionButtons from './ReactionButtons';
export default function PostExerpt({post, index}) {
  return (
    <article key={`${post.id}-${index}`}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      {/* Pass userId to PostAuthor */}
      <PostAuthor userId={post.userId } />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </article>
  )
}
