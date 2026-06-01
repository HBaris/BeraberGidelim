"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePremium } from "@/lib/usePremium";

const NAV_ITEMS = [
  { href: "/", label: "Keşfet", icon: "🔍" },
  { href: "/etkinlikler", label: "Etkinlikler", icon: "🎟️" },
  { href: "/olustur", label: "Oluştur", icon: "➕" },
  { href: "/profil", label: "Profil", icon: "👤" },
];

export default function Navigation() {
  const pathname = usePathname();
  const { isPremium } = usePremium();

  return (
    <>
      {/* Top header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl">🎵</span>
            <span className="font-bold text-white text-lg tracking-tight">BeraberGidelim</span>
            {isPremium && (
              <span className="text-[10px] font-bold bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 px-1.5 py-0.5 rounded-full">
                ✦
              </span>
            )}
          </Link>
          <div className="flex items-center gap-2">
            {!isPremium && (
              <Link href="/premium">
                <button className="text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/30 text-amber-400 px-3 py-1.5 rounded-full hover:from-amber-500/30 transition-all">
                  ✦ Premium
                </button>
              </Link>
            )}
            <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm">
              🔔
            </button>
          </div>
        </div>
      </header>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-t border-slate-800">
        <div className="max-w-md mx-auto px-2 h-16 flex items-center justify-around">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-all ${
                  isActive ? "text-emerald-400" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {item.href === "/olustur" ? (
                  <span
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg transition-all ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
                        : "bg-emerald-700/80 text-white"
                    }`}
                  >
                    {item.icon}
                  </span>
                ) : (
                  <>
                    <span className="text-xl">{item.icon}</span>
                    <span className={`text-[10px] font-medium ${isActive ? "text-emerald-400" : "text-slate-500"}`}>
                      {item.label}
                    </span>
                  </>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
