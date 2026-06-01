import Link from "next/link";

interface Props {
  children: React.ReactNode;
  label?: string;
  description?: string;
  blur?: boolean;
}

export default function LockedFeature({
  children,
  label = "Premium Özellik",
  description = "Bu özelliği kullanmak için Premium'a geç.",
  blur = true,
}: Props) {
  return (
    <div className="relative">
      {/* Blurred content behind */}
      <div className={`${blur ? "blur-sm pointer-events-none select-none opacity-60" : "opacity-40 pointer-events-none"}`}>
        {children}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-[1px] rounded-2xl">
        <div className="text-center px-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl mx-auto mb-2">
            🔒
          </div>
          <p className="text-sm font-bold text-white">{label}</p>
          <p className="text-xs text-slate-400 mt-1 leading-snug">{description}</p>
          <Link href="/premium">
            <button className="mt-3 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-amber-950 text-xs font-bold hover:opacity-90 transition-opacity">
              ✦ Premium'a Geç
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
