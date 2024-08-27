import React from 'react'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import PostAuthor from './PostAuthor'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostbyId } from './PostSlice'

export default function SinglePost() {

  const {postid} = useParams();

  const post = useSelector(state => selectPostbyId(state,Number(postid)))

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      {/* Pass userId to PostAuthor */}
      <Link to={`/post/edit/${post.id}`}  >
       Edit Posts
      </Link>
      <PostAuthor userId={post.userId } />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post} />
    </article>
  )
}

// useNavigate

// useParams