"use client";

import { useState, useMemo } from "react";
import { getOpenMatches, venues, DISTRICTS } from "@/lib/data";
import MatchCard from "@/components/MatchCard";

type Level = "all" | "principiante" | "intermedio" | "avanzado" | "pro";
type MatchType = "all" | "competitivo" | "amistoso";

export default function MatchesPage() {
  const [filterLevel, setFilterLevel] = useState<Level>("all");
  const [filterType, setFilterType] = useState<MatchType>("all");
  const [filterDistrict, setFilterDistrict] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [joinedMatch, setJoinedMatch] = useState<string | null>(null);

  const allMatches = getOpenMatches();

  const filteredMatches = useMemo(() => {
    let result = [...allMatches];

    if (filterLevel !== "all") {
      result = result.filter((m) => m.level === filterLevel);
    }
    if (filterType !== "all") {
      result = result.filter((m) => m.type === filterType);
    }
    if (filterDistrict !== "all") {
      result = result.filter((m) => m.district === filterDistrict);
    }

    return result;
  }, [allMatches, filterLevel, filterType, filterDistrict]);

  const handleJoin = (matchId: string) => {
    setJoinedMatch(matchId);
    setTimeout(() => setJoinedMatch(null), 3000);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Partidos Abiertos</h1>
              <p className="mt-2 text-gray-500">Encuentra jugadores y únete a un partido en Lima</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Crear Partido
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value as Level)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <option value="all">Todos los Niveles</option>
              <option value="principiante">Principiante</option>
              <option value="intermedio">Intermedio</option>
              <option value="avanzado">Avanzado</option>
              <option value="pro">Pro</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as MatchType)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <option value="all">Todos los Tipos</option>
              <option value="amistoso">Amistoso</option>
              <option value="competitivo">Competitivo</option>
            </select>
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            >
              <option value="all">Todos los Distritos</option>
              {DISTRICTS.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {joinedMatch && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00b894" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="text-sm font-medium text-green-800">
              ¡Te uniste al partido! Revisa tu perfil para ver los detalles.
            </span>
          </div>
        )}

        <p className="text-sm text-gray-500 mb-6">
          {filteredMatches.length} partido{filteredMatches.length !== 1 ? "s" : ""} disponible{filteredMatches.length !== 1 ? "s" : ""}
        </p>

        {filteredMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => (
              <MatchCard key={match.id} match={match} onJoin={handleJoin} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h3 className="text-lg font-medium text-gray-600">No hay partidos disponibles</h3>
            <p className="text-sm text-gray-400 mt-1">Ajusta los filtros o crea un partido nuevo</p>
          </div>
        )}
      </div>

      {/* Create Match Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Crear Partido</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-1 hover:bg-gray-100 rounded-lg">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Sede</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                  {venues.map((venue) => (
                    <option key={venue.id} value={venue.id}>{venue.name} - {venue.district}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Fecha</label>
                  <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Hora</label>
                  <input type="time" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nivel</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    <option value="principiante">Principiante</option>
                    <option value="intermedio">Intermedio</option>
                    <option value="avanzado">Avanzado</option>
                    <option value="pro">Pro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipo</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    <option value="amistoso">Amistoso</option>
                    <option value="competitivo">Competitivo</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Género</label>
                  <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                    <option value="mixto">Mixto</option>
                    <option value="varones">Solo Varones</option>
                    <option value="damas">Solo Damas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Precio por Jugador (S/)</label>
                  <input type="number" placeholder="25" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
                <textarea
                  rows={3}
                  placeholder="Describe tu partido..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
                />
              </div>
            </div>
            <div className="px-6 pb-6 flex gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setJoinedMatch("new");
                }}
                className="flex-1 py-3 bg-primary rounded-xl text-sm font-medium text-white hover:bg-primary-dark transition-colors"
              >
                Crear Partido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
