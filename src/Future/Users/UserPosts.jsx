import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserbyId } from './UserSlice'
import { getAllPost } from '../Post/PostSlice'
import { Link, useParams } from 'react-router-dom'

export default function UserPosts() {
  const {userId} = useParams()
  const user = useSelector(state => selectUserbyId(state, Number(userId)) )
  const postForUser = useSelector(state => {
      const allPost = getAllPost(state)
    return allPost.filter(post => post.userId === Number(userId))
  })
    console.log("pusts user",postForUser)
    
    const postTitles = postForUser.map(post => <li key={post.id}><Link to={`/post/${post.id}`}>{post.title}</Link></li>)
    console.log("pusts titles",postTitles)
  return (
      <div>
      <h1>Users Post</h1>
      <ul>
        {postTitles}
      </ul>
    </div>
  )
}


// type apirespose = typeof object
