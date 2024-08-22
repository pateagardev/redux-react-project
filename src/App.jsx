import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Postlist from './Future/Post/Postlist'
import Layouts from './Future/Layouts'
import AddPostForm from './Future/Post/AddPostForm'
import { store } from './Store'
import { fetchUsers } from './Future/Users/UserSlice'
import { fetchPosts } from './Future/Post/PostSlice'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


store.dispatch(fetchUsers())
store.dispatch(fetchPosts())

function App() {

  return (
    
    <Routes> 
      <Route path="/" element={<Layouts />} />
      <Route index element={<Postlist />} />
      <Route path="post">
        <Route index element={<AddPostForm />} />
        {/* <Route /> */}
       </Route>
    </Routes>
    
  )
}

export default App



