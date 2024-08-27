import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatePosts, selectPostbyId, removePost } from './PostSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { getUsersAll } from '../Users/UserSlice'

export default function EditPostForm() {


const {postid} = useParams()
const navigate = useNavigate()
const post = useSelector(state => selectPostbyId(state,Number(postid)))
const users = useSelector(getUsersAll)
const dispatch = useDispatch()
const [postTitle, setPostTitle] = useState(post?.title)
const [postContent, setPostContent] = useState(post?.body)
const [userId, setUserId] = useState(post?.userId)
const [requestStatus, setRequestStatus]  = useState("idle")
const onSave = [postTitle, postContent, userId].every(Boolean) && requestStatus==="idle"

  if (!post) {

    <section>
      <h2>Post Not Found</h2>
    </section>
  }


  const onTitleChange = (e) => {
    setPostTitle( e.target.value)
  }
  
  const onContentChange = (e) => {
    setPostContent( e.target.value)
  }
    
  const onSavePost = () => {
    console.log("save")
    if (onSave) {
    
      try {
        setRequestStatus("pending")
        dispatch(updatePosts({ title: postTitle, body: postContent, id: userId, reactions: post.reactions })).unwrap(
          setPostTitle(""),
          setPostContent(""),
          setUserId(""),
          navigate(`/post/${postid}`)
        )
      }catch(error){
        console.error("failed", error)
      } finally {
        setRequestStatus("idle")
      }
    }
  }

  const OnAuthorChange = (e) => {
    setUserId(e.target.value)
  }

  const deletePost = () => {
    console.log("ids",post.id)
    dispatch(removePost({id:post.id}))
  }
      
  const usersOptions = users.map((user) => 
    (  <option key={user.id} value={user.id}  >
         {user.name}
       </option>
   ))

  return (
    <div>
      <section >
        <form>
          <label htmlFor='postTitle'> </label>
          <input type='text' id="postTitle" name="postTitle" value={postTitle} onChange={onTitleChange} />
          <label htmlFor='postAuthor' > Select Author</label>
          <select id="postAuthor" value={userId} onChange={OnAuthorChange} >
            <option value="" ></option>
            {usersOptions}
          </select>
          <textarea id="postContent" name="postContent" value={postContent} onChange={onContentChange} />
          <button disabled={!onSave} type='button' onClick={onSavePost} >Submit</button>
          <button type='button' onClick={deletePost} > Delete Post</button>
        </form>
      </section>
    </div>
  )
}
