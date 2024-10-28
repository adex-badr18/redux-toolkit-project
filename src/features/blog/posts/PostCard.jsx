import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectPostById } from "./postsSlice";

const PostCard = ({ postId }) => {
    const post = useSelector((state) => selectPostById(state, postId));
    
    return (
        <article className="text-white w-full max-w-lg px-6 py-8 border border-white mb-5 rounded space-y-3">
            <div className="space-y-3">
                <h2 className="text-2xl font-medium">{post.title}</h2>
                <p className="">
                    {post.body.substring(0, 75)}
                    {post.body.length > 75 ? "..." : ""}
                </p>
            </div>
            <div className="space-y-2">
                <p className="mt-1 space-x-3 text-sm">
                    <Link to={`post/${post.id}`} className="underline">
                        View Post
                    </Link>
                    <PostAuthor userId={post.userId} />
                    <TimeAgo timestamp={post.date} />
                </p>
                <ReactionButtons post={post} />
            </div>
        </article>
    );
};

export default PostCard;
