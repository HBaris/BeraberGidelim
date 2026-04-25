import Link from "next/link";
import type { FeedItem } from "@/lib/types";
import { getCategoryLabel, formatDate } from "@/lib/mockData";
import MusicCompatibilityBar from "./MusicCompatibilityBar";

interface Props {
  item: FeedItem;
}

const TYPE_COLORS = {
  event_created: "border-l-emerald-500",
  trending: "border-l-blue-500",
  icebreaker: "border-l-amber-500",
  nearby: "border-l-cyan-500",
};

const TYPE_LABELS = {
  event_created: "Yeni etkinlik",
  trending: "Popüler",
  icebreaker: "Ortak geçmiş",
  nearby: "Yakınında",
};

export default function FeedCard({ item }: Props) {
  const { listing, feedText, timeAgo, type } = item;

  return (
    <Link href={`/etkinlik/${listing.id}`}>
      <div
        className={`bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden border-l-4 ${TYPE_COLORS[type]} hover:border-emerald-500/30 transition-all active:scale-[0.98]`}
      >
        <div className="p-4 space-y-3">
          {/* Type label + time */}
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                type === "icebreaker"
                  ? "bg-amber-500/20 text-amber-400"
                  : type === "trending"
                  ? "bg-blue-500/20 text-blue-400"
                  : type === "nearby"
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "bg-emerald-500/20 text-emerald-400"
              }`}
            >
              {TYPE_LABELS[type]}
            </span>
            <span className="text-xs text-slate-500">{timeAgo}</span>
          </div>

          {/* Feed text (anonymous) */}
          <p className="text-sm font-medium text-slate-200 leading-snug">{feedText}</p>

          {/* Event snippet */}
          <div className="flex gap-3 items-center">
            <img
              src={listing.imageUrl}
              alt={listing.title}
              className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs text-slate-400 mb-0.5">
                {listing.emoji} {getCategoryLabel(listing.category)}
              </div>
              <div className="text-sm font-semibold text-white line-clamp-2 leading-snug">
                {listing.title}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {listing.venue} · {formatDate(listing.date)}
              </div>
            </div>
          </div>

          {/* Music compatibility */}
          {listing.musicCompatibility !== undefined && listing.musicCompatibility > 0 && (
            <MusicCompatibilityBar score={listing.musicCompatibility} compact />
          )}

          {/* Attendee count + chat */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">
              👥 {listing.attendeeCount} kişi gidiyor
            </span>
            <div className="flex items-center gap-3">
              {listing.chatMessages.length > 0 && (
                <span className="text-slate-400">💬 {listing.chatMessages.length} mesaj</span>
              )}
              {listing.ticketPrice && (
                <span className="text-slate-300 font-medium">🎟️ {listing.ticketPrice}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
