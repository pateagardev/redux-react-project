import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import CounterSlice from './Future/Counter/CounterSlice'
import postSlice from './Future/Post/PostSlice'
import userSlice from './Future/Users/UserSlice'

export const store = configureStore({
    reducer: {
        counter: CounterSlice,
        users: userSlice,
        post: postSlice,

}})