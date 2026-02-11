import { Player } from "@/lib/types";

export default function PlayerCard({ player, rank }: { player: Player; rank?: number }) {
  const winRate = player.matchesPlayed > 0
    ? ((player.wins / player.matchesPlayed) * 100).toFixed(0)
    : "0";

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-4">
      <div className="flex items-center gap-3">
        {rank !== undefined && (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
            rank === 1 ? "bg-yellow-100 text-yellow-700" :
            rank === 2 ? "bg-gray-100 text-gray-600" :
            rank === 3 ? "bg-orange-100 text-orange-700" :
            "bg-gray-50 text-gray-500"
          }`}>
            {rank}
          </div>
        )}
        <div className="w-10 h-10 rounded-full avatar-placeholder text-sm flex-shrink-0">
          {player.name.split(" ").map(n => n[0]).join("")}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 text-sm truncate">{player.name}</h4>
          <p className="text-xs text-gray-500">{player.district}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-sm font-bold text-primary">Nv. {player.level}</div>
          <div className="text-xs text-gray-400">{winRate}% victorias</div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-50">
        <div className="text-center flex-1">
          <div className="text-sm font-semibold text-gray-900">{player.matchesPlayed}</div>
          <div className="text-xs text-gray-400">Partidos</div>
        </div>
        <div className="text-center flex-1">
          <div className="text-sm font-semibold text-primary">{player.wins}</div>
          <div className="text-xs text-gray-400">Victorias</div>
        </div>
        <div className="text-center flex-1">
          <div className="text-sm font-semibold text-gray-900">{winRate}%</div>
          <div className="text-xs text-gray-400">Win Rate</div>
        </div>
      </div>
    </div>
  );
}
