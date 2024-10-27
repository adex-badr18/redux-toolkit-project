import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { selectAllPosts, selectPostsByUser } from "../blog/posts/postsSlice";
import { useParams, Link } from "react-router-dom";

const User = () => {
    const { userId } = useParams();

    const user = useSelector((state) => selectUserById(state, Number(userId)));

    // const userPosts = useSelector((state) => {
    //     const allPosts = selectAllPosts(state);
    //     return allPosts.filter((post) => post.userId === Number(userId));
    // });

    const userPosts = useSelector((state) => selectPostsByUser(state, Number(userId)));

    const postList = userPosts.map((post) => (
        <li key={post.id} className="py-2">
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section className="space-y-6 p-10 text-white">
            <h2 className="text-2xl font-bold">{user?.name}</h2>

            <ol className="divide-y-2">{postList}</ol>
        </section>
    );
};

export default User;
