import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const Post = () => {
    // Todo: Retrieve postId
    const { postId } = useParams();

    const post = useSelector((state) => selectPostById(state, Number(postId)));

    if (!post) {
        return (
            <section className="">
                <h2 className="">Post not found!</h2>
            </section>
        );
    }

    return (
        <article className="text-white w-full max-w-lg px-6 py-10 border border-white mb-5 rounded space-y-3">
            <div className="">
                <h3 className="text-2xl font-medium">{post.title}</h3>
                <p className="">{post.body}</p>
            </div>
            <div className="space-y-1">
                <p className="mt-1 space-x-3 text-sm">
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButtons post={post} />
            </div>
        </article>
    );
};

export default Post;
