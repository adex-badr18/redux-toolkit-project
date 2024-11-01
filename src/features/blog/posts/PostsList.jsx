import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
    selectAllPosts,
    selectPostIds,
    getPostsError,
    getPostsStatus,
    fetchPosts,
} from "./postsSlice";

import PostCard from "./PostCard";

const PostsList = () => {
    // const dispatch = useDispatch();

    const orderedPostIds = useSelector((state) => selectPostIds(state));
    const postsStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

    // This is commented out because
    // we have already fetched all posts on initial app load,
    // Code can be found in main.jsx
    // useEffect(() => {
    //     if (postsStatus === "idle") {
    //         dispatch(fetchPosts());
    //     }
    // }, [postsStatus, dispatch]);

    let content;
    if (postsStatus === "loading") {
        content = <p className="text-white">Loading...</p>;
    } else if (postsStatus === "succeeded") {
        // Get distinct posts
        // const uniquePosts = posts.filter(
        //     (post, index, self) =>
        //         index === self.findIndex((t) => post.id === t.id)
        // );

        // Sort array by the most recent posts,
        // make a shallow copy of the array first,
        // to prevent sorting the original data.
        // const orderedPosts = uniquePosts
        //     .slice()
        //     .sort((a, b) => b.date.localeCompare(a.date));

        content = orderedPostIds.map((postId) => (
            <PostCard key={postId} postId={postId} />
        ));
    } else if (postsStatus === "failed") {
        content = <p className="text-white">{error}</p>;
    }

    return (
        <section className="space-y-6 p-10">
            <div className="grid grid-cols-1 justify-between md:grid-cols-2 gap-6 md:gap-10">
                {content}
            </div>
        </section>
    );
};

export default PostsList;
