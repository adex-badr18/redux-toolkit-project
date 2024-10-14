import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
    selectAllPosts,
    getPostsError,
    getPostsStatus,
    fetchPosts,
} from "./postsSlice";

import Post from "./Post";

const PostsList = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    useEffect(() => {
        if (postsStatus === "idle") {
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch]);

    let content;
    if (postsStatus === "loading") {
        content = <p className="text-white">Loading...</p>;
    } else if (postsStatus === "succeeded") {
        const uniquePosts = posts.filter(
            (post, index, self) =>
                index === self.findIndex((t) => post.id === t.id)
        );
        // make a shallow copy of the array first, to prevent sorting the original data.
        const orderedPosts = uniquePosts
            .slice()
            .sort((a, b) => b.date.localeCompare(a.date));
        content = orderedPosts.map((post, index) => (
            <Post key={index} post={post} />
        ));
    } else if (postsStatus === "failed") {
        content = <p className="text-white">{error}</p>;
    }

    return (
        <section className="space-y-6 p-10">
            <h2 className="text-white text-4xl font-bold">Posts</h2>
            <div className="grid grid-cols-1 justify-between md:grid-cols-2 gap-6 md:gap-10">
                {content}
            </div>
        </section>
    );
};

export default PostsList;
