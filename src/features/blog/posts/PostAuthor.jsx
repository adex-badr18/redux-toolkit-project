import { useSelector } from "react-redux";
import { selectAllUsers } from "../../users/usersSlice";

const PostAuthor = ({ userId }) => {

    const users = useSelector(selectAllUsers);
    console.log(users)
    const author = users.find((user) => user.id === userId);

    return <span className="text-sm">{`by ${author ? author.name : "Unknown author"}`}</span>;
};

export default PostAuthor;
