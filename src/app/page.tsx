'use client';
import React from "react";

export default function Home() {
    if (typeof window !== "undefined") if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    return (
        <div className="flex justify-center">
            Home
        </div>
    );
}
