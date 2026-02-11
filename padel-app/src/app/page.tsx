"use client";

import Link from "next/link";
import { venues, getOpenMatches, getTopPlayers } from "@/lib/data";
import VenueCard from "@/components/VenueCard";
import MatchCard from "@/components/MatchCard";
import PlayerCard from "@/components/PlayerCard";

export default function Home() {
  const openMatches = getOpenMatches().slice(0, 3);
  const topPlayers = getTopPlayers(3);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full filter blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-secondary rounded-full filter blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm text-white/90 mb-6 border border-white/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              Lima, Perú
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Encuentra tu
              <span className="text-primary"> partido </span>
              de pádel
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-lg">
              Únete a partidos, conoce jugadores y sé parte de la comunidad de pádel más grande de Lima.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/matches"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors text-sm"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Buscar Partido
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 backdrop-blur-sm transition-colors text-sm border border-white/20"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                Ver Comunidad
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg">
            <div>
              <p className="text-3xl font-bold text-white">{venues.length}+</p>
              <p className="text-sm text-gray-400 mt-1">Sedes</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-sm text-gray-400 mt-1">Jugadores</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">100+</p>
              <p className="text-sm text-gray-400 mt-1">Partidos/semana</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">¿Cómo funciona?</h2>
            <p className="mt-2 text-gray-500">Encuentra un partido en 3 simples pasos</p>
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
                title: "Busca un Partido",
                description: "Explora partidos abiertos cerca de ti. Filtra por nivel, distrito y tipo de juego.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                ),
                title: "Únete o Crea",
                description: "Únete a un partido existente o crea uno nuevo e invita a otros jugadores.",
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                ),
                title: "¡A Jugar!",
                description: "Llega a la sede, conoce a tus compañeros y disfruta del pádel.",
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

      {/* Open Matches */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Partidos Abiertos</h2>
              <p className="mt-1 text-sm text-gray-500">Únete a un partido y juega hoy</p>
            </div>
            <Link href="/matches" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              Ver todos &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {openMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Players */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Top Jugadores</h2>
              <p className="mt-1 text-sm text-gray-500">Los mejores de la comunidad</p>
            </div>
            <Link href="/community" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              Ver ranking &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topPlayers.map((player, i) => (
              <PlayerCard key={player.id} player={player} rank={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Sedes en Lima</h2>
              <p className="mt-1 text-sm text-gray-500">Conoce dónde se juega</p>
            </div>
            <Link href="/venues" className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              Ver todas &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.slice(0, 3).map((venue, i) => (
              <VenueCard key={venue.id} venue={venue} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">¿Listo para jugar?</h2>
          <p className="mt-3 text-lg text-white/80 max-w-md mx-auto">
            Únete a la comunidad de pádel de Lima. Encuentra un partido o crea el tuyo.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/matches"
              className="px-8 py-3.5 bg-white text-primary font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              Buscar Partido
            </Link>
            <Link
              href="/community"
              className="px-8 py-3.5 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-colors text-sm border border-white/30"
            >
              Ver Comunidad
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
