import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./features/counter/Counter";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import CounterLayout from "./components/CounterLayout";
import BlogLayout from "./components/BlogLayout";
import PostsList from "./features/blog/posts/PostsList";
import AddPostForm from "./features/blog/posts/AddPostForm";
import Post from "./features/blog/posts/Post";

const router = createBrowserRouter([
    {
        path: "/",
        element: <BlogLayout />,
        children: [
            { index: true, element: <PostsList /> },
            {
                path: "post",
                element: <section>{<Outlet />}</section>,
                children: [
                    { index: true, element: <AddPostForm /> },
                    { path: ":postId", element: <Post /> },
                ],
            },
        ],
    },
    {
        path: "/counter",
        element: <CounterLayout />,
        children: [{ index: true, element: <Counter /> }],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
