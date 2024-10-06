import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./features/counter/Counter";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import PostsList from "./features/blog/posts/PostsList";
import AddPostForm from "./features/blog/posts/AddPostForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            { index: true, element: <Counter /> },
            { path: "posts", element: <PostsList /> },
            { path: "posts/add", element: <AddPostForm /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
