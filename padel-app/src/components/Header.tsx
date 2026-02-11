"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2C12 2 8 6 8 12s4 10 4 10" />
                <path d="M12 2c0 0 4 4 4 10s-4 10-4 10" />
                <line x1="2" y1="12" x2="22" y2="12" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Padel<span className="text-primary">Play</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/matches" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Partidos
            </Link>
            <Link href="/community" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Comunidad
            </Link>
            <Link href="/venues" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Sedes
            </Link>
            <Link href="/profile" className="text-sm font-medium text-gray-600 hover:text-primary transition-colors">
              Mi Perfil
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/profile" className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors">
              <div className="w-8 h-8 rounded-full avatar-placeholder text-xs">CM</div>
              <span>Carlos M.</span>
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-1">
            <Link href="/matches" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">
              Partidos
            </Link>
            <Link href="/community" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">
              Comunidad
            </Link>
            <Link href="/venues" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">
              Sedes
            </Link>
            <Link href="/profile" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary">
              Mi Perfil
            </Link>
            <div className="border-t border-gray-100 pt-2 mt-2">
              <Link href="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700">
                <div className="w-8 h-8 rounded-full avatar-placeholder text-xs">CM</div>
                <span>Carlos Mendoza</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
