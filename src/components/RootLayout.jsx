import React from "react";
import { Outlet, Link } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="min-h-screen grid grid-rows-[64px_1fr]">
            <header className="py-4 place-self-center">
                <nav className="flex items-center justify-center gap-6">
                    <Link to="/" className="">
                        Counter
                    </Link>
                    <Link to="/posts" className="">
                        Posts
                    </Link>
                    <Link to="/posts/add" className="">
                        Create Post
                    </Link>
                </nav>
            </header>

            <main className="bg-neutral-800">
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;
