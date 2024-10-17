import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import Counter from "./features/counter/Counter";
import PostsList from "./features/blog/posts/PostsList";
import AddPostForm from "./features/blog/posts/AddPostForm";
import Post from "./features/blog/posts/Post";

const blogLinks = [
    {id: 1, name: "Posts", path: "/"},
    {id: 2, name: "Create Post", path: "/post"},
    {id: 3, name: "Counter", path: "/counter"},
];

const counterLinks = [
    {id: 1, name: "Counter", path: "/counter"},
    {id: 2, name: "Blog", path: "/"},
];

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout title="Redux Blog" links={blogLinks} />,
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
        element: <Layout title="Redux Counter" links={counterLinks} />,
        children: [{ index: true, element: <Counter /> }],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
