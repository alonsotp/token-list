"use client";

import Link from "next/link";
import { clubs, getOpenMatches } from "@/lib/data";
import ClubCard from "@/components/ClubCard";
import MatchCard from "@/components/MatchCard";

export default function Home() {
  const openMatches = getOpenMatches().slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full filter blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-secondary rounded-full filter blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Book your next
              <span className="text-primary"> padel </span>
              match
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-lg">
              Find the best padel clubs near you, book courts instantly, and join matches with players at your level.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/clubs"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors text-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                Find Clubs
              </Link>
              <Link
                href="/matches"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 backdrop-blur-sm transition-colors text-sm border border-white/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Join a Match
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-sm text-gray-400 mt-1">Clubs</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">2,000+</p>
              <p className="text-sm text-gray-400 mt-1">Courts</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">50K+</p>
              <p className="text-sm text-gray-400 mt-1">Players</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
            <p className="mt-2 text-gray-500">Book a court in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                ),
                title: "Find a Club",
                description: "Search for padel clubs in your area. Filter by location, price, and amenities.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                ),
                title: "Pick a Time",
                description: "Choose your preferred date and time slot. See real-time availability and pricing.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
                title: "Book & Play",
                description: "Confirm your booking and pay securely. Show up and enjoy your game!",
              },
            ].map((step, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-primary">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Clubs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Popular Clubs</h2>
              <p className="mt-1 text-sm text-gray-500">Top-rated padel clubs near you</p>
            </div>
            <Link href="/clubs" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.slice(0, 3).map((club, i) => (
              <ClubCard key={club.id} club={club} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Open Matches */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Open Matches</h2>
              <p className="mt-1 text-sm text-gray-500">Find players and join a game</p>
            </div>
            <Link href="/matches" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to play?</h2>
          <p className="mt-3 text-lg text-white/80 max-w-md mx-auto">
            Join thousands of padel players. Book a court or find a match today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/clubs"
              className="px-8 py-3.5 bg-white text-primary font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Browse Clubs
            </Link>
            <Link
              href="/matches"
              className="px-8 py-3.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors text-sm border border-white/30"
            >
              Find a Match
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
