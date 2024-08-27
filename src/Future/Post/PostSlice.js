import { createSlice, nanoid, createAsyncThunk  } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POST_URL = "https://jsonplaceholder.typicode.com/posts"

const initialState = 
  {
    posts: [],
    status: "idle", // idle || loading || succeded || failed
    error: null
  }

  export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      postAdded: {
        reducer(state, action) {
          state.posts.unshift(action.payload); // Use unshift to add the post to the beginning of the array
        },
        prepare(title, body, userId) {
          return {
            payload: {
              id: nanoid(),  // Generate a unique ID
              title,
              body,
              date: new Date().toISOString(),
              reactions: {
                thumbsUp:0,
                wow:0,
                heart:0,
                coffee: 0,
                rocket: 0,
              },
              userId,  // Include userId in the payload
            },
          };
        },
      },
      reactionAdded(state, action) {
        const {postID, reaction} = action.payload
        const exsitingPost = state.posts.find((post) => post.id === postID)
        if(exsitingPost){
          exsitingPost.reactions[reaction]++
        }
      }
    },
    extraReducers(builder) {
      builder.addCase(fetchPosts.pending, (state, action)=>{
        state.status="loading"
      })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = "succeed"
          let min = 1
          const loadedPosts = action.payload.map(post => {
            post.date = sub(new Date(), { minutes: min }).toISOString()
            post.reactions =  {
              thumbsUp: 0,
                wow: 0,
                heart: 0,
                coffee: 0,
                rocket: 0,
      }
        return post 
          })
          state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = "fail"
          state.error = action.error.message
        })
        .addCase(newPosts.fulfilled, (state, action) => {
          action.payload.userId = Number(action.payload.userId)
          action.payload.date = new Date().toISOString()
          action.payload.reactions =  {
            thumbsUp: 0,
              wow: 0,
              heart: 0,
              coffee: 0,
              rocket: 0,
          }
          state.posts.push(action.payload)
        })
        .addCase(updatePosts.fulfilled, (state, action) => {
          if (!action.payload?.id) {
            console.log("updated")
            console.log(action.payload)
            return 
          }
          const { id } = action.payload
          console.log("id",id)
          action.payload.date = new Date().toISOString()
          const posts = state.posts.filter(
            post => post.id !== id)
          state.posts = [...posts, action.payload]
        })
        .addCase(removePost.fulfilled, (state, action) => {
         if(!action.payload?.id) {
           console.log("delete couldnt not be remove")
           console.log(action.payload)
           return
         }
          const {id} = action.payload
          const posts = state.posts.filter(
            post => post.id !== id)
            state.posts = posts
        })
    }
  });

export const newPosts = createAsyncThunk("post/newPosts", async ( post ) => {
  try {
    const responce = await axios.post(POST_URL,post)
    return responce.data

  } catch (error) {
    return error.message
  }
})

export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
  try {
    const responce = await axios(POST_URL)
    return ([...responce.data])

  } catch (error) {
    return error.message
  }
}) 

export const updatePosts = createAsyncThunk("post/updatePosts", async (initialPost) => {
  const {id} = initialPost
  try {
    const responce = await axios.put(`${POST_URL}/${id}`, initialPost)
    return responce.data

  } catch (error) {
    return initialPost
  }
}) 

export const removePost = createAsyncThunk("post/removePost", async (initialPost) => {
  const {id} = initialPost
  try {
    const responce = await axios.delete(`${POST_URL}/${id}`)
    if(responce?.status === 200){
      return initialPost
    } 
    return `${responce?.status}:${responce?.statusText}`

  } catch (error) {
    return error.message
  }
}) 

// export const getPost = state => state.post
export const getAllPost = state => state.post.posts
export const getAllStatus = state => state.post.status
export const getAllError = state => state.post.error
export const selectPostbyId = (state, postid) =>
  state.post.posts.find(post => post.id === postid)
export const { postAdded, reactionAdded} = postSlice.actions
export default postSlice.reducer

