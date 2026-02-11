import Link from "next/link";
import { Club } from "@/lib/types";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "#fdcb6e" : "none"}
          stroke={star <= Math.round(rating) ? "#fdcb6e" : "#ddd"}
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span className="text-sm text-gray-500 ml-1">
        {rating} ({(Math.random() * 200 + 50).toFixed(0)})
      </span>
    </div>
  );
}

export default function ClubCard({ club, index }: { club: Club; index: number }) {
  const imgClass = `club-img-${(index % 6) + 1}`;

  return (
    <Link href={`/clubs/${club.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Image placeholder */}
        <div className={`${imgClass} h-48 relative flex items-end`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="relative p-4 w-full">
            <div className="flex items-center gap-2">
              {club.courts.some(c => c.type === "indoor") && (
                <span className="text-xs font-medium bg-white/90 text-gray-700 px-2 py-0.5 rounded-full">Indoor</span>
              )}
              {club.courts.some(c => c.type === "outdoor") && (
                <span className="text-xs font-medium bg-white/90 text-gray-700 px-2 py-0.5 rounded-full">Outdoor</span>
              )}
              <span className="text-xs font-medium bg-primary/90 text-white px-2 py-0.5 rounded-full">
                {club.courts.length} courts
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {club.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {club.address}, {club.city}
          </p>

          <div className="flex items-center justify-between mt-3">
            <StarRating rating={club.rating} />
            <span className="text-sm font-semibold text-primary">
              From {"\u20AC"}{Math.min(...club.courts.map(c => c.pricePerHour))}/h
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {club.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
                {amenity}
              </span>
            ))}
            {club.amenities.length > 3 && (
              <span className="text-xs text-gray-400">+{club.amenities.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
