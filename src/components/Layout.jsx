import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCount, incrementCount } from "../features/blog/posts/postsSlice";

const Layout = ({ title, links }) => {
    const dispatch = useDispatch();
    const count = useSelector(getCount);

    return (
        <div className="min-h-screen grid grid-rows-[64px_1fr]">
            <header className="bg-purple-950 text-white w-full flex items-center justify-between gap-4 px-4 py-4 md:px-10 place-self-center">
                <h1 className="text-2xl font-bold">{title}</h1>
                <nav className="flex items-center justify-center gap-6">
                    {links.map((link) => (
                        <Link key={link.id} to={link.path} className="">
                            {link.name}
                        </Link>
                    ))}

                    <button
                        className=""
                        onClick={() => dispatch(incrementCount())}
                    >
                        {count}
                    </button>
                </nav>
            </header>

            <main className="bg-neutral-800">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
