"use client";

import { Match } from "@/lib/types";

const levelColors: Record<string, string> = {
  principiante: "level-beginner",
  intermedio: "level-intermediate",
  avanzado: "level-advanced",
  pro: "level-pro",
};

const levelLabels: Record<string, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
  pro: "Pro",
};

export default function MatchCard({ match, onJoin }: { match: Match; onJoin?: (matchId: string) => void }) {
  const spotsLeft = match.maxPlayers - match.currentPlayers.length;
  const isFull = spotsLeft === 0;

  const dateObj = new Date(match.date + "T00:00:00");
  const formattedDate = dateObj.toLocaleDateString("es-PE", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${levelColors[match.level]}`}>
              {levelLabels[match.level]}
            </span>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${match.type === "competitivo" ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"}`}>
              {match.type === "competitivo" ? "Competitivo" : "Amistoso"}
            </span>
            {match.gender !== "mixto" && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-purple-50 text-purple-600">
                {match.gender === "varones" ? "Varones" : "Damas"}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900">{match.venueName}</h3>
          <p className="text-sm text-gray-500">{match.district}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-lg font-bold text-primary">S/{match.pricePerPlayer}</p>
          <p className="text-xs text-gray-400">/jugador</p>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          {formattedDate}
        </span>
        <span className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {match.time} ({match.duration} min)
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">{match.description}</p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Jugadores</span>
          <span className={`text-xs font-semibold ${isFull ? "text-red-500" : "text-primary"}`}>
            {match.currentPlayers.length}/{match.maxPlayers}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {match.currentPlayers.map((player) => (
            <div key={player.id} className="flex items-center gap-1.5 bg-gray-50 rounded-full pr-2.5 pl-0.5 py-0.5">
              <div className="w-6 h-6 rounded-full avatar-placeholder text-[10px]">
                {player.name.split(" ").map(n => n[0]).join("")}
              </div>
              <span className="text-xs font-medium text-gray-700">{player.name.split(" ")[0]}</span>
              <span className="text-xs text-gray-400">Nv.{player.level}</span>
            </div>
          ))}
          {Array.from({ length: spotsLeft }).map((_, i) => (
            <div key={`empty-${i}`} className="w-6 h-6 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="3">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onJoin?.(match.id)}
        disabled={isFull}
        className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
          isFull
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-primary text-white hover:bg-primary-dark"
        }`}
      >
        {isFull ? "Partido Lleno" : `Unirme (${spotsLeft} lugar${spotsLeft > 1 ? "es" : ""})`}
      </button>
    </div>
  );
}
