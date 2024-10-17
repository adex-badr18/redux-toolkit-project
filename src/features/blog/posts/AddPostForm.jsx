import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addPost, addNewPost } from "./postsSlice";
import { selectAllUsers } from "../../users/usersSlice";

const AddPostForm = () => {
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({
        userId: "",
        title: "",
        body: "",
        date: new Date().toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        },
    });
    const [addRequestStatus, setAddRequestStatus] = useState("idle");
    // const canSave = Object.values(postData).some((value) => value === "");
    const canSave =
        [postData.title, postData.body, postData.userId].every(Boolean) &&
        addRequestStatus === "idle";
    console.log(canSave)

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        setPostData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    console.log(postData)

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus("pending");
                dispatch(addNewPost(postData)).unwrap();
                setPostData({ title: "", body: "", userId: "" });
            } catch (error) {
                console.log("Failed to save the post", error);
            } finally {
                setAddRequestStatus("idle");
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
                    Add a new post
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
                        Save Post
                    </button>
                </form>
            </div>
        </section>
    );
};

export default AddPostForm;
