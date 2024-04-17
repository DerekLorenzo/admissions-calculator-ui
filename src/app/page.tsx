'use client';
import React from "react";
import Header from "@/app/common/Header";
import Footer from "@/app/common/Footer";
import CombinedRateCalculator from "@/app/combined-rate-calculator/CombinedRateCalculator";

export default function Home() {
    if (typeof window !== "undefined") if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    return (
        <main className="flex-initial max-w-full min-h-screen flex-col justify-between p-2 dark:bg-slate-800">
            <div>
                <Header/>
            </div>
            <div>
                <CombinedRateCalculator/>
            </div>
            <div className="flex justify-center">
                <Footer/>
            </div>
        </main>
    );
}
