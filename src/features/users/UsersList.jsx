import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";
import { Link } from "react-router-dom";

const UsersList = () => {
    const users = useSelector(selectAllUsers);

    const renderedUsers = users.map((user) => (
        <li key={user.id} className="py-2">
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
    ));

    return (
        <section className="space-y-6 p-10 text-white">
            <h2 className="">Users</h2>

            <ul className="divide-y-2">{renderedUsers}</ul>
        </section>
    );
};

export default UsersList;
