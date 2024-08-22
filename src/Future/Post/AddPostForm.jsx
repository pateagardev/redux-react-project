import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { postAdded, newPosts } from './PostSlice'
import { getUsersAll } from '../Users/UserSlice'
import PostExerpt from './PostExerpt';

export default function AddPostForm() {
    const dispatch = useDispatch()
    const [postTitle, setPostTitle] = useState("")
    const [postContent, setPostContent] = useState("")
    const [userId, setUserId] = useState()


    const users = useSelector(getUsersAll)
    
    const usersOptions = users.map((user) => 
     (  <option key={user.id} value={user.id}  >
          {user.name}
        </option>
    ))

    const onAuthorChange = (e) => {
      setUserId(e.target.value)
    }

    // const onSave = [postTitle, postContent, userId].every(Boolean) &&  

    const onSave = Boolean(postTitle) && Boolean(postContent) && Boolean(userId)

    const onSavePost= () => {
     try {
       if (onSave) {
         // dispatch(postAdded(postTitle, postContent, userId))
         dispatch(newPosts({ title: postTitle, body: postContent, userId })).unwrap()
         setPostTitle("")
         setPostContent("")
         setUserId("")
       }
     } catch(err) {
      console.log("error", err)
     }
    }
    return (
      <div> 
        <h2>Submit a Post</h2>
        <form>
            <label htmlFor="PostAuthor">Author</label>
            <select id="PostAuthor" value={userId} onChange={onAuthorChange}>
                <option value="">Select an Author</option>
                {usersOptions}
            </select>
            <label htmlFor="Title">Title</label>
            <input 
                type='text' 
                id="Title" 
                value={postTitle} 
                onChange={(e) => setPostTitle(e.target.value)} 
            />
            <label htmlFor="Content">Content</label>
            <input 
                type='text' 
                id="Content" 
                value={postContent} 
                onChange={(e) => setPostContent(e.target.value)} 
            /> 
            <button type='button' disabled={!onSave} onClick={onSavePost} >Submit</button>
        </form>
    </div>
  )
}