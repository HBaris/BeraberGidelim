interface Props {
  score: number; // 0-100
  compact?: boolean;
}

export default function MusicCompatibilityBar({ score, compact = false }: Props) {
  const color =
    score >= 80
      ? "from-green-500 to-emerald-400"
      : score >= 60
      ? "from-violet-500 to-purple-400"
      : score >= 40
      ? "from-amber-500 to-yellow-400"
      : "from-slate-500 to-slate-400";

  const label =
    score >= 80
      ? "Harika uyum!"
      : score >= 60
      ? "İyi uyum"
      : score >= 40
      ? "Orta uyum"
      : "Farklı zevkler";

  if (compact) {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-xs">🎵</span>
        <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${color} transition-all`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-slate-300">%{score}</span>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span>🎵</span>
          <span className="text-sm font-medium text-slate-200">Müzik Uyumu</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-sm font-bold ${score >= 80 ? "text-green-400" : score >= 60 ? "text-violet-400" : "text-amber-400"}`}>
            %{score}
          </span>
          <span className="text-xs text-slate-400">{label}</span>
        </div>
      </div>
      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}
