import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    { id: "0", name: "Dude Lebowski" },
    { id: "1", name: "John Lewis" },
    { id: "2", name: "Dave gray" },
];

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
});

export const selectAllUsers = (state) => state.users;

export default usersSlice.reducer;
