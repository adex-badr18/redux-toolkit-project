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
    count: 0,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(POSTS_URL);
    return response.data;
});

export const addNewPost = createAsyncThunk("posts/addNewPost", async (post) => {
    const response = await axios.post(POSTS_URL, post);
    return response.data;
});

export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
    const { id } = post;

    try {
        const response = await axios.put(`${POSTS_URL}/${id}`, post);
        return response.data;
    } catch (error) {
        // return error.message;
        return post; // Only for testing Redux!
    }
});

export const deletePost = createAsyncThunk("posts/delete", async (post) => {
    const { id } = post;

    try {
        const response = await axios.delete(`${POSTS_URL}/${id}`);

        if (response?.status === 200) return post;
        return `${response?.status}: ${response?.statusText}`;
    } catch (error) {
        return error.message;
    }
});

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // This reducer has been replaced with addNewPost in extraReducers below
        // addPost: {
        //     reducer: (state, action) => {
        //         state.posts.push(action.payload);
        //     },
        //     prepare: (postData) => {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 ...postData,
        //             },
        //         };
        //     },
        // },
        addReaction: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
        incrementCount: (state, action) => {
            state.count = state.count + 1;
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
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                const { userId, date, reactions } = action.payload;
                action.payload.userId = Number(action.payload.userId);
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    wow: 0,
                    heart: 0,
                    rocket: 0,
                    coffee: 0,
                };

                state.posts.push(action.payload);
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Failed to update post!");
                    console.log(action.payload);
                    return;
                }

                const { id } = action.payload;
                const posts = state.posts.filter((post) => post.id != id);
                state.posts = [...posts, action.payload];
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log("Failed to delete post!");
                    return;
                }

                const { id } = action.payload;
                const posts = state.posts.filter((post) => post.id != id);
                state.posts = posts;
            });
    },
});

export const selectAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsError = (state) => state.posts.error;
export const getCount = (state) => state.posts.count;

export const selectPostById = (state, postId) =>
    state.posts.posts.find((post) => post.id === postId);

export const { addPost, addReaction, incrementCount } = postsSlice.actions;

export default postsSlice.reducer;
