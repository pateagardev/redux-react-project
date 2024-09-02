import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  console.log("Header")
  return (
   <div>
     <Link to="/" >Home</Link>
     <Link to="/post" >Posts</Link>
     <Link to="/users">Users</Link>
   </div>
  )
}
