"use client";

import { useState } from "react";
import Link from "next/link";
import { currentUser, DISTRICTS } from "@/lib/data";
import MatchCard from "@/components/MatchCard";

type Tab = "upcoming" | "stats" | "settings";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("upcoming");
  const user = currentUser;

  const winRate = user.matchesPlayed > 0 ? ((user.wins / user.matchesPlayed) * 100).toFixed(1) : "0";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Profile Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-full avatar-placeholder text-2xl flex-shrink-0">
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {user.district}, Lima
                </span>
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Miembro desde {new Date(user.memberSince).toLocaleDateString("es-PE", { month: "long", year: "numeric" })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 px-4 py-2 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary">{user.level}</div>
                <div className="text-xs text-gray-500 mt-0.5">Nivel</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-1 border-b border-gray-100 -mb-px">
            {[
              { key: "upcoming" as Tab, label: "Mis Partidos" },
              { key: "stats" as Tab, label: "Estadísticas" },
              { key: "settings" as Tab, label: "Configuración" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "upcoming" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Próximos Partidos</h2>
              {user.upcomingMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.upcomingMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-600">No tienes partidos próximos</h3>
                  <p className="text-sm text-gray-400 mt-1 mb-4">Busca un partido o crea uno nuevo</p>
                  <Link href="/matches" className="text-sm font-medium text-primary hover:text-primary-dark">
                    Buscar Partidos &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "stats" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-gray-900">{user.matchesPlayed}</p>
              <p className="text-sm text-gray-500 mt-1">Partidos Jugados</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-primary">{user.wins}</p>
              <p className="text-sm text-gray-500 mt-1">Victorias</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-gray-900">{winRate}%</p>
              <p className="text-sm text-gray-500 mt-1">Win Rate</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-primary">{user.level}</p>
              <p className="text-sm text-gray-500 mt-1">Nivel Actual</p>
            </div>

            <div className="sm:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Perfil de Jugador</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Mano Preferida</span>
                  <span className="font-medium text-gray-900 capitalize">{user.preferredHand}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Posición Preferida</span>
                  <span className="font-medium text-gray-900 capitalize">{user.preferredPosition}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Derrotas</span>
                  <span className="font-medium text-gray-900">{user.matchesPlayed - user.wins}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Distrito</span>
                  <span className="font-medium text-gray-900">{user.district}</span>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Progreso de Nivel</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Actual: {user.level}</span>
                  <span className="text-gray-500">Siguiente: {(Math.ceil(user.level * 10) / 10 + 0.1).toFixed(1)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-primary rounded-full h-3 transition-all"
                    style={{ width: `${(user.level % 1) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Juega más partidos para subir de nivel
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Personal</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre Completo</label>
                    <input type="text" defaultValue={user.name} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input type="email" defaultValue={user.email} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
                    <input type="tel" defaultValue={user.phone} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Distrito</label>
                    <select defaultValue={user.district} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferencias de Juego</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Mano Preferida</label>
                    <select defaultValue={user.preferredHand} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                      <option value="derecha">Derecha</option>
                      <option value="izquierda">Izquierda</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Posición Preferida</label>
                    <select defaultValue={user.preferredPosition} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
                      <option value="drive">Drive (Derecha)</option>
                      <option value="revés">Revés (Izquierda)</option>
                      <option value="ambos">Ambos</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button className="px-8 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors">
              Guardar Cambios
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
