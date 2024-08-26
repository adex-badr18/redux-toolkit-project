import React from "react";
import { Outlet, Link } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="min-h-screen grid grid-rows-[64px_1fr]">
            <header className="py-4 place-self-center">
                <nav className="flex items-center justify-center gap-4">
                    <Link to="/" className="">
                        Counter
                    </Link>
                    <Link to="/blog" className="">
                        Blog
                    </Link>
                </nav>
            </header>

            <main className="bg-green-400">
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;
