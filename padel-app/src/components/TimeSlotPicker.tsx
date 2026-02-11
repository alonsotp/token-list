"use client";

import { TimeSlot } from "@/lib/types";

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSelect: (time: string) => void;
}

export default function TimeSlotPicker({ slots, selectedSlot, onSelect }: TimeSlotPickerProps) {
  // Group by morning, afternoon, evening
  const morning = slots.filter((s) => {
    const hour = parseInt(s.time.split(":")[0]);
    return hour >= 7 && hour < 12;
  });
  const afternoon = slots.filter((s) => {
    const hour = parseInt(s.time.split(":")[0]);
    return hour >= 12 && hour < 17;
  });
  const evening = slots.filter((s) => {
    const hour = parseInt(s.time.split(":")[0]);
    return hour >= 17;
  });

  const renderGroup = (label: string, icon: string, groupSlots: TimeSlot[]) => (
    <div className="mb-6">
      <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center gap-2">
        <span>{icon}</span> {label}
      </h4>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {groupSlots.map((slot) => (
          <button
            key={slot.time}
            onClick={() => slot.available && onSelect(slot.time)}
            disabled={!slot.available}
            className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              !slot.available
                ? "bg-gray-50 text-gray-300 cursor-not-allowed line-through"
                : selectedSlot === slot.time
                ? "bg-primary text-white shadow-md ring-2 ring-primary/30"
                : "bg-white border border-gray-200 text-gray-700 hover:border-primary hover:text-primary"
            }`}
          >
            <div>{slot.time}</div>
            {slot.available && (
              <div className={`text-xs mt-0.5 ${selectedSlot === slot.time ? "text-white/80" : "text-gray-400"}`}>
                {"\u20AC"}{slot.price}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      {morning.length > 0 && renderGroup("Morning", "\u2600\uFE0F", morning)}
      {afternoon.length > 0 && renderGroup("Afternoon", "\u26C5", afternoon)}
      {evening.length > 0 && renderGroup("Evening", "\uD83C\uDF19", evening)}
    </div>
  );
}
