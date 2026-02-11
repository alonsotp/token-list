"use client";

import { useState, useMemo } from "react";
import { players, DISTRICTS, getTopPlayers } from "@/lib/data";
import PlayerCard from "@/components/PlayerCard";
import SearchBar from "@/components/SearchBar";

type SortBy = "level" | "winrate" | "matches";

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("all");
  const [sortBy, setSortBy] = useState<SortBy>("winrate");
  const [activeTab, setActiveTab] = useState<"ranking" | "districts">("ranking");

  const topPlayers = getTopPlayers(12);

  const filteredPlayers = useMemo(() => {
    let result = [...players];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.district.toLowerCase().includes(q)
      );
    }

    if (selectedDistrict !== "all") {
      result = result.filter((p) => p.district === selectedDistrict);
    }

    switch (sortBy) {
      case "level":
        result.sort((a, b) => b.level - a.level);
        break;
      case "winrate":
        result.sort((a, b) => {
          const aWr = a.matchesPlayed > 0 ? a.wins / a.matchesPlayed : 0;
          const bWr = b.matchesPlayed > 0 ? b.wins / b.matchesPlayed : 0;
          return bWr - aWr;
        });
        break;
      case "matches":
        result.sort((a, b) => b.matchesPlayed - a.matchesPlayed);
        break;
    }

    return result;
  }, [searchQuery, selectedDistrict, sortBy]);

  const districtStats = useMemo(() => {
    const stats: Record<string, { count: number; avgLevel: number }> = {};
    for (const player of players) {
      if (!stats[player.district]) {
        stats[player.district] = { count: 0, avgLevel: 0 };
      }
      stats[player.district].count++;
      stats[player.district].avgLevel += player.level;
    }
    for (const key in stats) {
      stats[key].avgLevel = Math.round((stats[key].avgLevel / stats[key].count) * 10) / 10;
    }
    return Object.entries(stats).sort((a, b) => b[1].count - a[1].count);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Comunidad</h1>
          <p className="mt-2 text-gray-500">Conoce a los jugadores de pádel de Lima</p>

          {/* Tabs */}
          <div className="mt-6 flex gap-1">
            <button
              onClick={() => setActiveTab("ranking")}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "ranking"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Ranking de Jugadores
            </button>
            <button
              onClick={() => setActiveTab("districts")}
              className={`px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === "districts"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Por Distrito
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "ranking" && (
          <>
            {/* Podium */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Top 3 Jugadores</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topPlayers.slice(0, 3).map((player, i) => {
                  const winRate = player.matchesPlayed > 0
                    ? ((player.wins / player.matchesPlayed) * 100).toFixed(0)
                    : "0";
                  const colors = [
                    "from-yellow-400 to-yellow-600",
                    "from-gray-300 to-gray-500",
                    "from-orange-400 to-orange-600",
                  ];
                  return (
                    <div key={player.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                      <div className={`bg-gradient-to-r ${colors[i]} px-4 py-3 flex items-center gap-3`}>
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {i + 1}
                        </div>
                        <div className="text-white">
                          <div className="font-semibold">{player.name}</div>
                          <div className="text-xs opacity-80">{player.district}</div>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-around">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{player.level}</div>
                          <div className="text-xs text-gray-400">Nivel</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{player.matchesPlayed}</div>
                          <div className="text-xs text-gray-400">Partidos</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{winRate}%</div>
                          <div className="text-xs text-gray-400">Victorias</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <SearchBar onSearch={setSearchQuery} placeholder="Buscar jugadores por nombre o distrito..." />
              </div>
              <div className="flex gap-3">
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  <option value="all">Todos los Distritos</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                >
                  <option value="winrate">Mejor Win Rate</option>
                  <option value="level">Mayor Nivel</option>
                  <option value="matches">Más Partidos</option>
                </select>
              </div>
            </div>

            {/* Player List */}
            <p className="text-sm text-gray-500 mb-4">
              {filteredPlayers.length} jugador{filteredPlayers.length !== 1 ? "es" : ""}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredPlayers.map((player, i) => (
                <PlayerCard key={player.id} player={player} rank={i + 1} />
              ))}
            </div>
          </>
        )}

        {activeTab === "districts" && (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Jugadores por Distrito</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {districtStats.map(([district, stats], i) => (
                <div key={district} className={`bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden`}>
                  <div className={`club-img-${(i % 6) + 1} h-20 relative flex items-end`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="relative p-3 w-full">
                      <h3 className="font-semibold text-white">{district}</h3>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-around">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">{stats.count}</div>
                      <div className="text-xs text-gray-400">Jugadores</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-primary">{stats.avgLevel}</div>
                      <div className="text-xs text-gray-400">Nivel Promedio</div>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <h4 className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wider">Jugadores</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {players
                        .filter((p) => p.district === district)
                        .map((p) => (
                          <div key={p.id} className="flex items-center gap-1 bg-gray-50 rounded-full pr-2 pl-0.5 py-0.5">
                            <div className="w-5 h-5 rounded-full avatar-placeholder text-[8px]">
                              {p.name.split(" ").map(n => n[0]).join("")}
                            </div>
                            <span className="text-xs text-gray-600">{p.name.split(" ")[0]}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
