import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
    const posts = useSelector(selectAllPosts);

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map((post) => (
        <article key={post.id} className="text-white w-full max-w-lg px-6 py-10 border border-white mb-5 rounded">
            <h3 className="text-2xl font-medium">{post.title}</h3>
            <p className="">{post.content.substring(0, 100)}</p>
            <p className="mt-1 space-x-3 text-sm">
                <PostAuthor userId={post.postAuthor} />
                <TimeAgo timestamp={post.date} />
            </p>
        </article>
    ));

    return (
        <section className="space-y-6 p-10">
            <h2 className="text-white text-4xl font-bold">Posts</h2>
            {renderedPosts}
        </section>
    );
};

export default PostsList;
