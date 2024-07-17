"use client";
import React from "react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
    return (
        <button
            onClick={() => {
                signOut();
            }}
            className="p-2 px-5 -mt-1 bg-blue-800 rounded-full"
        >
            Logout
        </button>
    );
};

export default LogoutButton;
