import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './PostSlice'

const reactionEmojis = {
  thumbsUp:"👍",
  wow:"😯",
  heart:"❤️",
  coffee: "☕️",
  rocket: "🚀",
}

export default function ReactionButtons({post}) {
  const dispatch = useDispatch()


    const reactionButton = Object.entries(reactionEmojis).map(([name, emoji]) =>
    {
        return (
            <button key={name} type='button' onClick={() => dispatch(reactionAdded({ postID: post.id, reaction: name }))}>
              {emoji} {post.reactions[name]}
            </button>
        )
    }
    )
  return (
    <div>
      {reactionButton}
    </div>
  )
}
