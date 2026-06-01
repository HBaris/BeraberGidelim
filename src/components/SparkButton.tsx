"use client";

import { useState } from "react";
import Link from "next/link";

interface Props {
  isPremium: boolean;
  targetName: string;
}

export default function SparkButton({ isPremium, targetName }: Props) {
  const [sparked, setSparked] = useState(false);
  const [showMatch, setShowMatch] = useState(false);

  if (!isPremium) {
    return (
      <Link href="/premium">
        <button className="w-full py-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm font-semibold flex items-center justify-center gap-2 hover:bg-amber-500/20 transition-all">
          <span>✨</span>
          <span>Spark Gönder</span>
          <span className="text-[10px] bg-amber-500/20 border border-amber-500/30 px-1.5 py-0.5 rounded-full ml-1">
            ✦ Premium
          </span>
        </button>
      </Link>
    );
  }

  if (showMatch) {
    return (
      <div className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border border-amber-500/40 text-center space-y-1">
        <p className="text-2xl">🔥</p>
        <p className="text-sm font-bold text-amber-300">Karşılıklı Spark!</p>
        <p className="text-xs text-slate-400">{targetName} da sana spark gönderdi.</p>
      </div>
    );
  }

  if (sparked) {
    return (
      <div className="w-full py-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold text-center">
        ✨ Spark gönderildi — karşılık bekleniyor
      </div>
    );
  }

  return (
    <button
      onClick={() => {
        setSparked(true);
        // Simulate 50% match for demo
        setTimeout(() => {
          if (Math.random() > 0.5) setShowMatch(true);
        }, 2000);
      }}
      className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-lg shadow-amber-500/20"
    >
      ✨ Spark Gönder
    </button>
  );
}
