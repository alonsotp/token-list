"use client";

interface BookingConfirmationProps {
  clubName: string;
  courtName: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function BookingConfirmation({
  clubName,
  courtName,
  date,
  time,
  duration,
  price,
  onConfirm,
  onCancel,
}: BookingConfirmationProps) {
  const dateObj = new Date(date + "T00:00:00");
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="bg-primary rounded-t-2xl px-6 py-5 text-white text-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <h2 className="text-xl font-bold">Confirm Booking</h2>
        </div>

        {/* Details */}
        <div className="px-6 py-5 space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Club</span>
            <span className="text-sm font-medium text-gray-900">{clubName}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Court</span>
            <span className="text-sm font-medium text-gray-900">{courtName}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Date</span>
            <span className="text-sm font-medium text-gray-900">{formattedDate}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Time</span>
            <span className="text-sm font-medium text-gray-900">{time}</span>
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-100">
            <span className="text-sm text-gray-500">Duration</span>
            <span className="text-sm font-medium text-gray-900">{duration} min</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-semibold text-gray-700">Total Price</span>
            <span className="text-xl font-bold text-primary">{"\u20AC"}{price.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-primary rounded-xl text-sm font-medium text-white hover:bg-primary-dark transition-colors"
          >
            Confirm & Pay
          </button>
        </div>
      </div>
    </div>
  );
}
