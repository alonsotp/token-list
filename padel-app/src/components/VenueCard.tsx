import Link from "next/link";
import { Venue } from "@/lib/types";

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
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
        {rating} ({reviewCount})
      </span>
    </div>
  );
}

export default function VenueCard({ venue, index }: { venue: Venue; index: number }) {
  const imgClass = `club-img-${(index % 6) + 1}`;

  return (
    <Link href={`/venues/${venue.id}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <div className={`${imgClass} h-44 relative flex items-end`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="relative p-4 w-full">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium bg-primary/90 text-white px-2 py-0.5 rounded-full">
                {venue.courtCount} canchas
              </span>
              <span className="text-xs font-medium bg-white/90 text-gray-700 px-2 py-0.5 rounded-full">
                {venue.district}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
            {venue.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {venue.address}, {venue.district}
          </p>

          <div className="mt-3">
            <StarRating rating={venue.rating} reviewCount={venue.reviewCount} />
          </div>

          <div className="flex flex-wrap gap-1.5 mt-3">
            {venue.amenities.slice(0, 3).map((amenity) => (
              <span key={amenity} className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
                {amenity}
              </span>
            ))}
            {venue.amenities.length > 3 && (
              <span className="text-xs text-gray-400">+{venue.amenities.length - 3} más</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
