"use client";

import { useState } from "react";
import Link from "next/link";
import { currentUser } from "@/lib/data";

type Tab = "bookings" | "stats" | "settings";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("bookings");
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
                  {user.city}
                </span>
                <span className="flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Member since {new Date(user.memberSince).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 px-4 py-2 rounded-xl text-center">
                <div className="text-2xl font-bold text-primary">{user.level}</div>
                <div className="text-xs text-gray-500 mt-0.5">Level</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex gap-1 border-b border-gray-100 -mb-px">
            {[
              { key: "bookings" as Tab, label: "My Bookings" },
              { key: "stats" as Tab, label: "Statistics" },
              { key: "settings" as Tab, label: "Settings" },
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

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "bookings" && (
          <div className="space-y-4">
            {user.bookings.length > 0 ? (
              user.bookings.map((booking) => {
                const dateObj = new Date(booking.date + "T00:00:00");
                const formattedDate = dateObj.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                });

                return (
                  <div key={booking.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            booking.status === "confirmed"
                              ? "bg-green-50 text-green-700"
                              : booking.status === "pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-700"
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900">{booking.clubName}</h3>
                        <p className="text-sm text-gray-500">{booking.courtName}</p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
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
                            {booking.time} ({booking.duration} min)
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {booking.players.map((player, i) => (
                            <span key={i} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded-full">
                              {player}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{"\u20AC"}{booking.totalPrice}</p>
                        <Link
                          href={`/clubs/${booking.clubId}`}
                          className="text-xs text-primary hover:text-primary-dark font-medium mt-1 inline-block"
                        >
                          View Club &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <h3 className="text-lg font-medium text-gray-600">No bookings yet</h3>
                <p className="text-sm text-gray-400 mt-1 mb-4">Book a court to get started!</p>
                <Link href="/clubs" className="text-sm font-medium text-primary hover:text-primary-dark">
                  Browse Clubs &rarr;
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === "stats" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-gray-900">{user.matchesPlayed}</p>
              <p className="text-sm text-gray-500 mt-1">Matches Played</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-primary">{user.wins}</p>
              <p className="text-sm text-gray-500 mt-1">Wins</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-gray-900">{winRate}%</p>
              <p className="text-sm text-gray-500 mt-1">Win Rate</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm text-center">
              <p className="text-3xl font-bold text-primary">{user.level}</p>
              <p className="text-sm text-gray-500 mt-1">Current Level</p>
            </div>

            {/* Additional Stats */}
            <div className="sm:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Player Profile</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Preferred Hand</span>
                  <span className="font-medium text-gray-900 capitalize">{user.preferredHand}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Preferred Position</span>
                  <span className="font-medium text-gray-900 capitalize">{user.preferredPosition}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Losses</span>
                  <span className="font-medium text-gray-900">{user.matchesPlayed - user.wins}</span>
                </div>
              </div>
            </div>

            <div className="sm:col-span-2 bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Level Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">Current: {user.level}</span>
                  <span className="text-gray-500">Next: {(Math.ceil(user.level * 10) / 10 + 0.1).toFixed(1)}</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-primary rounded-full h-3 transition-all"
                    style={{ width: `${(user.level % 1) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Play more matches to increase your level
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="max-w-2xl space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      defaultValue={user.phone}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                    <input
                      type="text"
                      defaultValue={user.city}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Playing Preferences</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Hand</label>
                    <select
                      defaultValue={user.preferredHand}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    >
                      <option value="right">Right</option>
                      <option value="left">Left</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Preferred Position</label>
                    <select
                      defaultValue={user.preferredPosition}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    >
                      <option value="drive">Drive (Right)</option>
                      <option value="backhand">Backhand (Left)</option>
                      <option value="both">Both</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <button className="px-8 py-3 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
