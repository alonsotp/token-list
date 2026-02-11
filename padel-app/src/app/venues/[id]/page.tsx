"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { getVenueById, getMatchesByVenue } from "@/lib/data";
import MatchCard from "@/components/MatchCard";

export default function VenueDetailPage() {
  const params = useParams();
  const venueId = params.id as string;
  const venue = getVenueById(venueId);
  const venueMatches = getMatchesByVenue(venueId);

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sede no encontrada</h1>
          <p className="text-gray-500 mb-4">La sede que buscas no existe.</p>
          <Link href="/venues" className="text-primary hover:text-primary-dark font-medium">
            &larr; Volver a sedes
          </Link>
        </div>
      </div>
    );
  }

  const imgIndex = parseInt(venue.id.split("-")[1]) || 1;
  const imgClass = `club-img-${((imgIndex - 1) % 6) + 1}`;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className={`${imgClass} h-64 sm:h-80 relative`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 max-w-7xl mx-auto">
          <Link href="/venues" className="text-white/80 text-sm hover:text-white mb-3 inline-flex items-center gap-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Volver a sedes
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{venue.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-white/90 text-sm">
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {venue.address}, {venue.district}
            </span>
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fdcb6e" stroke="#fdcb6e" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {venue.rating} ({venue.reviewCount} reseñas)
            </span>
            <span className="flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {venue.openTime} - {venue.closeTime}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Acerca de</h2>
              <p className="text-sm text-gray-600 leading-relaxed">{venue.description}</p>
            </section>

            {venueMatches.length > 0 && (
              <section>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Partidos en esta sede ({venueMatches.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {venueMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </section>
            )}

            {venueMatches.length === 0 && (
              <section className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm text-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <h3 className="font-medium text-gray-600">No hay partidos programados</h3>
                <p className="text-sm text-gray-400 mt-1 mb-4">Sé el primero en crear un partido aquí</p>
                <Link href="/matches" className="text-sm font-medium text-primary hover:text-primary-dark">
                  Crear Partido &rarr;
                </Link>
              </section>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#636e72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className="text-gray-600">{venue.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#636e72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span className="text-gray-600">{venue.openTime} - {venue.closeTime}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#636e72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span className="text-gray-600">{venue.district}, Lima</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Servicios</h3>
              <div className="flex flex-wrap gap-2">
                {venue.amenities.map((amenity) => (
                  <span key={amenity} className="text-xs font-medium bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full border border-gray-100">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Info Rápida</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Canchas</span>
                  <span className="font-medium text-gray-900">{venue.courtCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Valoración</span>
                  <span className="font-medium text-primary">{venue.rating}/5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Reseñas</span>
                  <span className="font-medium text-gray-900">{venue.reviewCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
