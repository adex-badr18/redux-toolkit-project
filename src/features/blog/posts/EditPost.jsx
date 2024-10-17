import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams, useNavigate } from "react-router-dom";

import { updatePost, selectPostById } from "./postsSlice";
import { selectAllUsers } from "../../users/usersSlice";

const EditPost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const post = useSelector((state) => selectPostById(state, Number(postId)));
    const users = useSelector(selectAllUsers);
    
    const [requestStatus, setRequestStatus] = useState("idle");
    const [postData, setPostData] = useState({
        id: post.id ?? "",
        userId: post.userId ?? "",
        title: post.title ?? "",
        body: post.body ?? "",
        date: new Date().toISOString(),
        reactions: post.reactions,
    });

    if (!post) {
        return (
            <section>
                <h2 className="">Post not found!</h2>
            </section>
        );
    }

    const canSave =
        [postData.title, postData.body, postData.userId].every(Boolean) && requestStatus === "idle";

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setPostData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus("pending");
                dispatch(updatePost(postData)).unwrap();
                setPostData({ id: "", title: "", body: "", userId: "" });
                navigate(`/post/${post.id}`)
            } catch (error) {
                console.log("Failed to save the post", error);
            } finally {
                setRequestStatus("idle");
            }
        }
    };

    const usersOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));

    return (
        <section className="space-y-6 p-10">
            <div className="w-full max-w-[578px] mx-auto px-6 py-4 md:px-10 md:py-6 space-y-10">
                <h2 className="text-white text-4xl font-bold">
                    Edit Post
                </h2>

                <form action="" className="grid gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title" className="text-white">
                            Post Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={postData.title}
                            onChange={handleFormChange}
                            className="px-3 py-2 rounded "
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="userId" className="text-white">
                            Author
                        </label>
                        <select
                            type="text"
                            id="userId"
                            name="userId"
                            value={postData.userId}
                            onChange={handleFormChange}
                            className="px-3 py-2 rounded "
                        >
                            <option value=""></option>
                            {usersOptions}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="body" className="text-white">
                            Post Body
                        </label>
                        <textarea
                            type="text"
                            id="body"
                            name="body"
                            value={postData.body}
                            onChange={handleFormChange}
                            rows={3}
                            className="px-3 py-2 rounded "
                        />
                    </div>

                    <button
                        onClick={onSavePostClicked}
                        type="button"
                        className="bg-gray-950 text-white rounded px-3 py-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!canSave}
                    >
                        Update Post
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditPost;
