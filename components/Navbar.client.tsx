"use client";
import Link from "next/link";

export default function Navbar({ onSearch }: { onSearch: () => void }) {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/90 border-b border-[var(--coffee-light)]/30 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="group flex items-center gap-3"
        >
          <div className="text-4xl transition-transform group-hover:rotate-12">☕</div>
          <div>
            <h1 className="font-['Crimson_Pro'] text-2xl font-bold text-[var(--coffee-dark)] tracking-tight">
              Coffee Connoisseur
            </h1>
            <p className="text-xs text-[var(--text-secondary)] font-semibold tracking-wide">
              DISCOVER · EXPLORE · SAVOR
            </p>
          </div>
        </Link>
        
        <button
          onClick={onSearch}
          className="group relative overflow-hidden rounded-full bg-[var(--coffee-dark)] px-7 py-3 text-sm font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find Coffee
          </span>
          <div className="absolute inset-0 bg-[var(--coffee-medium)] opacity-0 transition-opacity group-hover:opacity-100" />
        </button>
      </div>
    </nav>
  );
}