"use client";

import { useState, useMemo } from "react";
import { clubs } from "@/lib/data";
import ClubCard from "@/components/ClubCard";
import SearchBar from "@/components/SearchBar";

export default function ClubsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"rating" | "price" | "name">("rating");

  const cities = useMemo(() => {
    const unique = [...new Set(clubs.map((c) => c.city))];
    return unique.sort();
  }, []);

  const filteredClubs = useMemo(() => {
    let result = [...clubs];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.city.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q)
      );
    }

    if (selectedCity !== "all") {
      result = result.filter((c) => c.city === selectedCity);
    }

    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price":
        result.sort(
          (a, b) =>
            Math.min(...a.courts.map((c) => c.pricePerHour)) -
            Math.min(...b.courts.map((c) => c.pricePerHour))
        );
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [searchQuery, selectedCity, sortBy]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Find a Padel Club</h1>
          <p className="mt-2 text-gray-500">Browse and book courts at the best clubs</p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar onSearch={setSearchQuery} placeholder="Search clubs by name or location..." />
            </div>
            <div className="flex gap-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="all">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "rating" | "price" | "name")}
                className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              >
                <option value="rating">Top Rated</option>
                <option value="price">Lowest Price</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-sm text-gray-500 mb-6">
          {filteredClubs.length} club{filteredClubs.length !== 1 ? "s" : ""} found
        </p>

        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club, i) => (
              <ClubCard key={club.id} club={club} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <h3 className="text-lg font-medium text-gray-600">No clubs found</h3>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
