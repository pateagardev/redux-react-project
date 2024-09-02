import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Postlist from './Future/Post/Postlist';
import Layout from './Future/Layout';
import AddPostForm from './Future/Post/AddPostForm';
import { store } from './Store';
import { fetchUsers } from './Future/Users/UserSlice';
import { fetchPosts } from './Future/Post/PostSlice';
import { Routes, Route } from 'react-router-dom';
import SinglePost from './Future/Post/SinglePost';
import EditPostForm from './Future/Post/EditPostForm';
import UsersList from './Future/Users/UsersList';
import UserPosts from './Future/Users/UserPosts';

// Fetch initial data
store.dispatch(fetchUsers());
store.dispatch(fetchPosts());

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Nested routes under Layout */}
        <Route index element={<Postlist />} />
        <Route path="users">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPosts />} />
        </Route>
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postid" element={<SinglePost />} />
          <Route path="edit/:postid" element={<EditPostForm />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
