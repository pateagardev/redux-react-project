// import { createSlice, nanoid, createAsyncThunk  } from "@reduxjs/toolkit";
// import { sub } from "date-fns";
// import axios from "axios";
// import { PayloadAction } from "@reduxjs/toolkit";

// const POST_URL = "https://jsonplaceholder.typicode.com/posts"

// type Initialstatetype = {
//   posts: postType[],
//   status: "idle" | "loading" | "succeded" | "failed",
//   error: string | undefined
// }

// type postType = {
//   id: string,
//   title: string,
//   body: string,
//   date: string,
//   reactions: {
//     thumbsUp: number,
//     wow: number,
//     heart: number,
//     coffee: number,
//     rocket: number,
//   }
// }


// const initialState: Initialstatetype = {
//     posts: [],
//     status: "idle", // idle || loading || succeded || failed
//     error: undefined
//   }

//   export const postSlice = createSlice({
//     name: "post",
//     initialState,
//     reducers: {
//       postAdded: {
//         reducer(state, action:PayloadAction<postType>) {
//           state.posts.unshift(action.payload); // Use unshift to add the post to the beginning of the array
//         },
//         prepare(title: string, body: string, userId: number) {
//           return {
//             payload: {
//               id: nanoid(),  // Generate a unique ID
//               title,
//               body,
//               date: new Date().toISOString(),
//               reactions: {
//                 thumbsUp:0,
//                 wow:0,
//                 heart:0,
//                 coffee: 0,
//                 rocket: 0,
//               },
//               userId,  // Include userId in the payload
//             },
//           };
//         },
//       },
//       reactionAdded(state, action: PayloadAction<{ postID: string; reaction: keyof postType["reactions"] }>) {
//         const { postID, reaction } = action.payload;
//         const existingPost = state.posts.find((post) => post.id === postID);
//         if (existingPost) {
//           existingPost.reactions[reaction]++;
//         }
//       },
//     },
//     extraReducers(builder) {
//       builder.addCase(fetchPosts.pending, (state, action)=>{
//         state.status="loading"
//       })
//         .addCase(fetchPosts.fulfilled, (state, action) => {
//           state.status = "succeded"
//           let min = 1
//           const loadedPosts = action.payload.map(post => {
//             post.date = sub(new Date(), { minutes: min }).toISOString()
//             post.reactions =  {
//               thumbsUp: 0,
//                 wow: 0,
//                 heart: 0,
//                 coffee: 0,
//                 rocket: 0,
//       }
//         return post 
//           })
//           state.posts = state.posts.concat(loadedPosts)
//         })
//         .addCase(fetchPosts.rejected, (state, action) => {
//           state.status = "failed"
//           state.error = action.error.message
//         })
//         .addCase(newPosts.fulfilled, (state, action) => {
//           action.payload.userId = Number(action.payload.userId)
//           action.payload.date = new Date().toISOString()
//           action.payload.reactions =  {
//             thumbsUp: 0,
//               wow: 0,
//               heart: 0,
//               coffee: 0,
//               rocket: 0,
//           }
//           state.posts.push(action.payload)
//         })
//         .addCase(updatePosts.fulfilled, (state, action) => {
//           if (!action.payload?.id) {
//             console.log("updated")
//             console.log(action.payload)
//             return 
//           }
//           const { id } = action.payload
//           console.log("id",id)
//           action.payload.date = new Date().toISOString()
//           const posts = state.posts.filter(
//             post => post.id !== id)
//           console.log("array newposts",[...posts, action.payload])
//           console.log("new post", action.payload)

//           state.posts = [...posts, action.payload]
//           console.log("Array state",state.posts)
//         })
//         .addCase(removePost.fulfilled, (state, action) => {
//          if(!action.payload?.id) {
//            console.log("delete couldnt not be remove")
//            console.log(action.payload)
//            return
//          }
//           const {id} = action.payload
//           const posts = state.posts.filter(
//             post => post.id !== id)
//             state.posts = posts
//         })
//     }
//   });

// export const newPosts = createAsyncThunk("post/newPosts", async ( post ) => {
//   try {
//     const responce = await axios.post(POST_URL,post)
//     return responce.data

//   } catch (error) {
//     return error.message
//   }
// })

// export const fetchPosts = createAsyncThunk("post/fetchPosts", async () => {
//   try {
//     const responce = await axios(POST_URL)
//     return ([...responce.data])

//   } catch (error) {
//     return error.message
//   }
// }) 

// export const updatePosts = createAsyncThunk("post/updatePosts", async (initialPost: postType) => {
//   const {id} = initialPost
//   try {
//     const responce = await axios.put(`${POST_URL}/${id}`, initialPost)
//     return responce.data

//   } catch (error) {
//     return initialPost
//   }
// }) 

// export const removePost = createAsyncThunk("post/removePost", async (initialPost: postType) => {
//   const {id} = initialPost
//   try {
//     const responce = await axios.delete(`${POST_URL}/${id}`)
//     if(responce?.status === 200){
//       return initialPost
//     } 
//     return `${responce?.status}:${responce?.statusText}`

//   } catch (error) {
//     return error.message
//   }
// }) 

// // export const getPost = state => state.post
// export const getAllPost = state => state.post.posts
// export const getAllStatus = state => state.post.status
// export const getAllError = state => state.post.error
// export const selectPostbyId = (state, postid) =>
//   state.post.posts.find(post => post.id === postid)
// export const { postAdded, reactionAdded} = postSlice.actions
// export default postSlice.reducer

