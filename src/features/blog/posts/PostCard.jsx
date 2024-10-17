import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostCard = ({ post }) => {
    return (
        <article className="text-white w-full max-w-lg px-6 py-10 border border-white mb-5 rounded space-y-3">
            <div className="">
                <h3 className="text-2xl font-medium">{post.title}</h3>
                <p className="">{post.body.substring(0, 100)}</p>
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

export default PostCard;
