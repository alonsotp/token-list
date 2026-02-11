"use client";

import { useState, useMemo } from "react";
import { venues, DISTRICTS } from "@/lib/data";
import VenueCard from "@/components/VenueCard";
import SearchBar from "@/components/SearchBar";

export default function VenuesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"rating" | "courts" | "name">("rating");

  const filteredVenues = useMemo(() => {
    let result = [...venues];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.district.toLowerCase().includes(q) ||
          v.address.toLowerCase().includes(q)
      );
    }

    if (selectedDistrict !== "all") {
      result = result.filter((v) => v.district === selectedDistrict);
    }

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "courts":
        result.sort((a, b) => b.courtCount - a.courtCount);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [searchQuery, selectedDistrict, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Sedes de Pádel</h1>
          <p className="mt-2 text-gray-500">Conoce las sedes donde se juega en Lima</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar onSearch={setSearchQuery} placeholder="Buscar sedes por nombre o distrito..." />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="all">Todos los Distritos</option>
                {DISTRICTS.map((district) => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "rating" | "courts" | "name")}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="rating">Mejor Valoradas</option>
                <option value="courts">Más Canchas</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-6">
          {filteredVenues.length} sede{filteredVenues.length !== 1 ? "s" : ""} encontrada{filteredVenues.length !== 1 ? "s" : ""}
        </p>

        {filteredVenues.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue, i) => (
              <VenueCard key={venue.id} venue={venue} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <h3 className="text-lg font-medium text-gray-600">No se encontraron sedes</h3>
            <p className="text-sm text-gray-400 mt-1">Intenta ajustar tu búsqueda o filtros</p>
          </div>
        )}
      </div>
    </div>
  );
}
