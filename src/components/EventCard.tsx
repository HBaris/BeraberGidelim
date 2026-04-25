import Link from "next/link";
import type { EventListing } from "@/lib/types";
import { formatDate, getCategoryLabel } from "@/lib/mockData";
import MusicCompatibilityBar from "./MusicCompatibilityBar";

interface Props {
  listing: EventListing;
  showCompatibility?: boolean;
  variant?: "feed" | "full";
}

const CATEGORY_COLORS: Record<string, string> = {
  konser: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  festival: "bg-green-500/20 text-green-300 border-green-500/30",
  workshop: "bg-teal-500/20 text-teal-300 border-teal-500/30",
  yemek: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  seyahat: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  müze: "bg-sky-500/20 text-sky-300 border-sky-500/30",
  spor: "bg-emerald-600/20 text-emerald-300 border-emerald-600/30",
  diger: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

export default function EventCard({ listing, showCompatibility = true, variant = "feed" }: Props) {
  const allCount = 1 + listing.groupMembers.length;

  return (
    <Link href={`/etkinlik/${listing.id}`}>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all hover:shadow-lg hover:shadow-emerald-500/10 active:scale-[0.98]">
        {/* Image area */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${CATEGORY_COLORS[listing.category] ?? CATEGORY_COLORS.diger}`}>
              {listing.emoji} {getCategoryLabel(listing.category)}
            </span>
          </div>

          {/* Icebreaker badge */}
          {listing.sharedPastEvents.length > 0 && (
            <div className="absolute top-3 right-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/90 text-amber-950 backdrop-blur-sm">
                🔥 Ortak geçmiş!
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="font-bold text-white text-sm leading-tight line-clamp-2">{listing.title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 space-y-3">
          {/* Location & date */}
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>📍 {listing.venue}, {listing.city}</span>
            <span>•</span>
            <span>📅 {formatDate(listing.date)}</span>
          </div>

          {/* Ticket price */}
          {listing.ticketPrice && (
            <div className="text-xs text-slate-300">
              🎟️ <span className="font-medium">{listing.ticketPrice}</span>
            </div>
          )}

          {/* Music compatibility */}
          {showCompatibility && listing.musicCompatibility !== undefined && (
            <MusicCompatibilityBar score={listing.musicCompatibility} compact />
          )}

          {/* Group info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <img
                  src={listing.organizer.avatarUrl}
                  alt=""
                  className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover"
                />
                {listing.groupMembers.slice(0, 2).map((m) => (
                  <img
                    key={m.id}
                    src={m.avatarUrl}
                    alt=""
                    className="w-7 h-7 rounded-full border-2 border-slate-900 object-cover"
                  />
                ))}
              </div>
              <div>
                <span className="text-xs text-slate-300 font-medium">
                  {allCount} kişi gidiyor
                </span>
                {listing.organizer.isVerified && (
                  <span className="ml-1 text-xs text-emerald-400">✓</span>
                )}
              </div>
            </div>

            {/* Chat indicator */}
            {listing.chatMessages.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span>💬</span>
                <span>{listing.chatMessages.length}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {variant === "full" && (
            <div className="flex flex-wrap gap-1.5">
              {listing.tags.map((tag) => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
