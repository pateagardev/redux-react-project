import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import CounterSlice from './Future/Counter/CounterSlice'
import postSlice from './Future/Post/PostSlice'


export const store = configureStore({
    reducer: {
        counter: CounterSlice,
        post: postSlice,
    
}})