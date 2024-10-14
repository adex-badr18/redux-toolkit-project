import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

// const initialState = [
//     {
//         id: 1,
//         title: "Redux Toolkit Tutorial",
//         content:
//             "Redux has not been this easier. It's really getting interesting.",
// date: sub(new Date(), { minutes: 10 }).toISOString(),
// reactions: {
//     thumbsUp: 0,
//     wow: 0,
//     heart: 0,
//     rocket: 0,
//     coffee: 0,
// },
//     },
//     {
//         id: 2,
//         title: "Redux Slice",
//         content:
//             "A slice contains all the states related to a single specific feature in the app.",
//         date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0,
//         },
//     },
// ];

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
    posts: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
});

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: {
            reducer: (state, action) => {
                state.posts.push(action.payload);
            },
            prepare: (postData) => {
                return {
                    payload: {
                        id: nanoid(),
                        ...postData,
                    },
                };
            },
        },
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded";

                // Add date and reactions
                let min = 1;
                const loadedPosts = action.payload.map((post) => {
                    post.date = sub(new Date(), {
                        minutes: min++,
                    }).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    };

                    return post;
                });

                // Add fetched posts to the state array
                state.posts = state.posts.concat(loadedPosts);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;

export const { addPost, addReaction } = postsSlice.actions;

export default postsSlice.reducer;
