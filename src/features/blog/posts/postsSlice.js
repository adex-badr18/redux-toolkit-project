import { createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

const initialState = [
    {
        id: 1,
        title: "Redux Toolkit Tutorial",
        content:
            "Redux has not been this easier. It's really getting interesting.",
        date: sub(new Date(), {minutes: 10}).toISOString()
    },
    {
        id: 2,
        title: "Redux Slice",
        content:
            "A slice contains all the states related to a single specific feature in the app.",
        date: sub(new Date(), {minutes: 5}).toISOString()
    },
];

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: {
            reducer: (state, action) => {
                state.push(action.payload);
            },
            prepare: (postData) => {
                return {
                    payload: {
                        id: nanoid(),
                        ...postData
                    }
                }
            }
        },
    },
});

export const selectAllPosts = (state) => state.posts;

export const { addPost } = postsSlice.actions;

export default postsSlice.reducer;
