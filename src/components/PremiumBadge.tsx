interface Props {
  size?: "sm" | "md";
}

export default function PremiumBadge({ size = "sm" }: Props) {
  if (size === "md") {
    return (
      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 text-xs font-bold px-2.5 py-1 rounded-full">
        ✦ Premium
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
      ✦
    </span>
  );
}
