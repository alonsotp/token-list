import Link from "next/link";
import { Court } from "@/lib/types";

export default function CourtCard({ court }: { court: Court }) {
  const isIndoor = court.type === "indoor";

  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
      {/* Court image placeholder */}
      <div className={`${isIndoor ? "court-indoor" : "court-outdoor"} h-32 relative flex items-center justify-center`}>
        <div className="text-center text-white">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1 opacity-80">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="2" y1="12" x2="22" y2="12" />
          </svg>
          <span className="text-xs font-medium opacity-80">{isIndoor ? "Indoor" : "Outdoor"}</span>
        </div>
        <div className="absolute top-2 right-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${isIndoor ? "bg-gray-700 text-gray-200" : "bg-green-600 text-white"}`}>
            {court.surface === "artificial-grass" ? "Artificial Grass" : court.surface}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold text-gray-900">{court.name}</h4>
            <p className="text-xs text-gray-500 mt-0.5 capitalize">{court.type} Court</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary">{"\u20AC"}{court.pricePerHour}</p>
            <p className="text-xs text-gray-400">/hour</p>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {court.features.map((feature) => (
            <span key={feature} className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
              {feature}
            </span>
          ))}
        </div>

        {/* Book button */}
        <Link
          href={`/book/${court.id}`}
          className="mt-4 block w-full text-center py-2.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
