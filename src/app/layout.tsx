import type { Metadata } from 'next'
// These styles apply to every route in the application
import './globals.css'
import Header from "@/app/header";
import Footer from "@/app/footer";
import React from "react";

export const metadata: Metadata = {
  title: 'Admitted',
  description: 'Author: Enzo Tech™',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
      <body>
      <main className="flex-initial max-w-full min-h-screen flex-col justify-between p-2 dark:bg-slate-800">
          <Header/>
          {children}
          <Footer/>
      </main>
      </body>
      </html>
  )
}
