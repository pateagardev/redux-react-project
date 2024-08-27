import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers, getUsersAll, getUsersStatus } from '../Users/UserSlice'

export default function PostAuthor({ userId }) {
    const dispatch = useDispatch()
    const users = useSelector(getUsersAll);
    const userStatus = useSelector(getUsersStatus)
  
    useEffect(
      () => {
        if (userStatus === "idle") {
          
         dispatch(fetchUsers())
        }
      },
      [dispatch, userStatus]
    )

    // Find the author using user.id, not user.name
    const authors = users.find(user => 
        user.id === +userId
    );

    return (
        <span className='author-name'>
            by {authors ? authors.name : "Unknown Author"}
        </span>
    );
}
