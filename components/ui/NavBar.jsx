"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { DropDown } from "./DropDown";

const NavBar = () => {
  return (
    <nav className="w-full bg-purple-600 py-4 shadow-md sticky top-0 z-50">
      <div className="flex justify-between items-center px-6">
        {/* Logo & App Name */}
        <div className="flex items-center space-x-3">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <span className="text-white text-lg font-bold">MyApp</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-white font-semibold">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/blog">Blog</Link>
          </li>
          <li>
            <Link href="/events">Events</Link>
          </li>
          <li>
            <Link href="/members">Members</Link>
          </li>
        </ul>

        {/* Profile Section */}
        <DropDown />
      </div>
    </nav>
  );
};

export default NavBar;
