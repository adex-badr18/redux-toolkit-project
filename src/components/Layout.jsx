import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = ({ title, links }) => {
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
                </nav>
            </header>

            <main className="bg-neutral-800">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
