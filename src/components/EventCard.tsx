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
  konser: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  festival: "bg-pink-500/20 text-pink-300 border-pink-500/30",
  workshop: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  gastronomi: "bg-orange-500/20 text-orange-300 border-orange-500/30",
  seyahat: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  müze: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  spor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  diger: "bg-slate-500/20 text-slate-300 border-slate-500/30",
};

export default function EventCard({ listing, showCompatibility = true, variant = "feed" }: Props) {
  const spots = listing.totalSpots - listing.spotsAvailable;
  const fillPercent = (spots / listing.totalSpots) * 100;

  return (
    <Link href={`/etkinlik/${listing.id}`}>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-violet-500/40 transition-all hover:shadow-lg hover:shadow-violet-500/10 active:scale-[0.98]">
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

          {/* Bottom overlay info */}
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
              {/* Organizer avatar (small, anti-dating) */}
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
                  {1 + listing.groupMembers.length} kişi gidiyor
                </span>
                {listing.organizer.isVerified && (
                  <span className="ml-1 text-xs text-violet-400">✓</span>
                )}
              </div>
            </div>

            {/* Spots */}
            <div className="text-right">
              <div className="text-xs font-semibold text-white">
                {listing.spotsAvailable} yer açık
              </div>
              <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-violet-500 rounded-full"
                  style={{ width: `${fillPercent}%` }}
                />
              </div>
            </div>
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
