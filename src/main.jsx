import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice.js";
import { fetchPosts } from "./features/blog/posts/postsSlice.js";

// Fetch all users on app initial load
store.dispatch(fetchUsers());

// Fetch all posts on app initial load
store.dispatch(fetchPosts());

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
