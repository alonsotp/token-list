"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getClubById, getCourtsByClubId, getMatchesByClub } from "@/lib/data";
import CourtCard from "@/components/CourtCard";
import MatchCard from "@/components/MatchCard";

export default function ClubDetailPage() {
  const params = useParams();
  const clubId = params.id as string;
  const club = getClubById(clubId);
  const courts = getCourtsByClubId(clubId);
  const clubMatches = getMatchesByClub(clubId);

  if (!club) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Club not found</h1>
          <p className="text-gray-500 mb-4">The club you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/clubs" className="text-primary hover:text-primary-dark font-medium">
            &larr; Back to clubs
          </Link>
        </div>
      </div>
    );
  }

  const imgIndex = parseInt(club.id.split("-")[1]) || 1;
  const imgClass = `club-img-${((imgIndex - 1) % 6) + 1}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <div className={`${imgClass} h-64 sm:h-80 relative`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <Link href="/clubs" className="text-white/80 text-sm hover:text-white mb-3 inline-flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to clubs
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{club.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-white/90 text-sm">
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {club.address}, {club.city}
            </span>
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fdcb6e" stroke="#fdcb6e" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {club.rating} ({club.reviewCount} reviews)
            </span>
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {club.openTime} - {club.closeTime}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{club.description}</p>
            </section>

            {/* Courts */}
            <section>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Courts ({courts.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courts.map((court) => (
                  <CourtCard key={court.id} court={court} />
                ))}
              </div>
            </section>

            {/* Open Matches at this club */}
            {clubMatches.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Open Matches ({clubMatches.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {clubMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#636e72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-gray-600">{club.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#636e72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="text-gray-600">{club.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#636e72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-gray-600">{club.openTime} - {club.closeTime}</span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {club.amenities.map((amenity) => (
                  <span key={amenity} className="text-xs font-medium bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full border border-gray-100">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Total Courts</span>
                  <span className="font-medium text-gray-900">{courts.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Indoor Courts</span>
                  <span className="font-medium text-gray-900">{courts.filter(c => c.type === "indoor").length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Outdoor Courts</span>
                  <span className="font-medium text-gray-900">{courts.filter(c => c.type === "outdoor").length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price Range</span>
                  <span className="font-medium text-primary">
                    {"\u20AC"}{Math.min(...courts.map(c => c.pricePerHour))} - {"\u20AC"}{Math.max(...courts.map(c => c.pricePerHour))}/h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
