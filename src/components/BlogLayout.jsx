import React from "react";
import { Outlet, Link } from "react-router-dom";

const BlogLayout = () => {
    return (
        <div className="min-h-screen grid grid-rows-[64px_1fr]">
            <header className="py-4 place-self-center">
                <nav className="flex items-center justify-center gap-6">
                    <Link to="/" className="">
                        Posts
                    </Link>
                    <Link to="/post" className="">
                        Create Post
                    </Link>
                    <Link to="/counter" className="">
                        Counter
                    </Link>
                </nav>
            </header>

            <main className="bg-neutral-800">
                <Outlet />
            </main>
        </div>
    );
};

export default BlogLayout;
