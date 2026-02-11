"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCourtById, getClubById, generateTimeSlots } from "@/lib/data";
import TimeSlotPicker from "@/components/TimeSlotPicker";
import BookingConfirmation from "@/components/BookingConfirmation";

export default function BookingPage() {
  const params = useParams();
  const courtId = params.courtId as string;
  const court = getCourtById(courtId);
  const club = court ? getClubById(court.clubId) : null;

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [duration, setDuration] = useState(90);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const timeSlots = useMemo(() => {
    if (!court) return [];
    return generateTimeSlots(court, selectedDate);
  }, [court, selectedDate]);

  const selectedSlotData = timeSlots.find((s) => s.time === selectedTime);
  const totalPrice = selectedSlotData
    ? (selectedSlotData.price * duration) / 60
    : 0;

  // Generate next 14 days for date picker
  const dates = useMemo(() => {
    const result = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      result.push({
        value: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        day: date.getDate(),
        month: date.toLocaleDateString("en-US", { month: "short" }),
        isToday: i === 0,
      });
    }
    return result;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!court || !club) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Court not found</h1>
          <p className="text-gray-500 mb-4">The court you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/clubs" className="text-primary hover:text-primary-dark font-medium">
            &larr; Browse clubs
          </Link>
        </div>
      </div>
    );
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00b894" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-500 mb-6">
            Your court has been reserved. You&apos;ll receive a confirmation email shortly.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Club</span>
              <span className="font-medium">{club.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Court</span>
              <span className="font-medium">{court.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">{new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Time</span>
              <span className="font-medium">{selectedTime}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Duration</span>
              <span className="font-medium">{duration} min</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
              <span className="font-semibold">Total</span>
              <span className="font-bold text-primary">{"\u20AC"}{totalPrice.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/profile" className="flex-1 py-3 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
              View My Bookings
            </Link>
            <Link href="/clubs" className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              Browse More
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/clubs" className="hover:text-primary">Clubs</Link>
            <span>/</span>
            <Link href={`/clubs/${club.id}`} className="hover:text-primary">{club.name}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{court.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main - Booking Flow */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Book {court.name}</h1>
              <p className="text-gray-500 text-sm">{club.name} &middot; {club.city}</p>
            </div>

            {/* Date Picker */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h2>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {dates.map((date) => (
                  <button
                    key={date.value}
                    onClick={() => {
                      setSelectedDate(date.value);
                      setSelectedTime(null);
                    }}
                    className={`flex-shrink-0 w-16 py-3 rounded-xl text-center transition-all ${
                      selectedDate === date.value
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <div className="text-xs font-medium opacity-80">{date.label}</div>
                    <div className="text-lg font-bold">{date.day}</div>
                    <div className="text-xs opacity-70">{date.month}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Duration</h2>
              <div className="flex gap-3">
                {[60, 90, 120].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                      duration === d
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {d} min
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Time</h2>
              <TimeSlotPicker
                slots={timeSlots}
                selectedSlot={selectedTime}
                onSelect={setSelectedTime}
              />
            </div>
          </div>

          {/* Sidebar - Booking Summary */}
          <div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>

              <div className={`${court.type === "indoor" ? "court-indoor" : "court-outdoor"} h-32 rounded-lg mb-4 flex items-center justify-center`}>
                <div className="text-center text-white">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-1 opacity-80">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <line x1="12" y1="4" x2="12" y2="20" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                  </svg>
                  <span className="text-sm font-medium">{court.name}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Club</span>
                  <span className="font-medium text-gray-900">{club.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Court</span>
                  <span className="font-medium text-gray-900">{court.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-900 capitalize">{court.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium text-gray-900">
                    {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium text-gray-900">{selectedTime || "Not selected"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-gray-900">{duration} min</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="font-semibold text-gray-700">Total</span>
                  <span className="text-xl font-bold text-primary">
                    {selectedTime ? `\u20AC${totalPrice.toFixed(2)}` : "--"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowConfirmation(true)}
                disabled={!selectedTime}
                className={`w-full py-3 rounded-xl text-sm font-medium transition-colors ${
                  selectedTime
                    ? "bg-primary text-white hover:bg-primary-dark"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                {selectedTime ? "Book Now" : "Select a time slot"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && selectedTime && (
        <BookingConfirmation
          clubName={club.name}
          courtName={court.name}
          date={selectedDate}
          time={selectedTime}
          duration={duration}
          price={totalPrice}
          onConfirm={() => {
            setShowConfirmation(false);
            setBookingConfirmed(true);
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
}
