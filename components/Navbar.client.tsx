"use client";

import Link from "next/link";

export default function Navbar({ onSearch }: { onSearch: () => void }) {
  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        
        <Link href="/" className="text-xl font-extrabold text-white">
          Coffee Connoisseur
        </Link>

        
        <button
          onClick={() => {
            console.log("SEARCH CLICKED");
            onSearch();
          }}
          className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-gray-400 hover:text-white active:scale-95"
        >
          Search
        </button>
      </div>
    </nav>
  );
}
