import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, User } from "lucide-react";

export type ScoreCardProps = {
  name: string;
  sport?: string;
  lastScore: number;
  currentScore: number;
  unit?: string;
};

export function ScoreCard({ name, sport, lastScore, currentScore, unit = "pts" }: ScoreCardProps) {
  const [current, setCurrent] = useState(currentScore);

  const { change, pct, positive, feedback } = useMemo(() => {
    const change = current - lastScore;
    const pct = lastScore === 0 ? 100 : (change / lastScore) * 100;
    const positive = pct >= 0;
    let feedback = "";
    if (pct >= 15) feedback = "Phenomenal — well done!";
    else if (pct >= 7) feedback = "Great progress — keep it up!";
    else if (pct >= 0) feedback = "You did good — steady gains.";
    else if (pct > -5) feedback = "Slight dip — you got this.";
    else feedback = "Tough session — review & bounce back.";
    return { change, pct, positive, feedback };
  }, [current, lastScore]);

  const pctDisplay = Math.abs(pct).toFixed(1);

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur-sm">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-electric/10 via-brand-purple/10 to-brand-neon/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-electric to-brand-neon text-white"><User className="h-5 w-5"/></span>
          <div>
            <div className="font-semibold">{name}</div>
            {sport && <div className="text-xs text-muted-foreground">{sport}</div>}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted-foreground">Progress</div>
          <div className={`inline-flex items-center gap-1 font-semibold ${positive ? "text-emerald-500" : "text-rose-500"}`}>
            {positive ? <ArrowUpRight className="h-4 w-4"/> : <ArrowDownRight className="h-4 w-4"/>}
            {pctDisplay}%
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="text-xs text-muted-foreground">Last</div>
          <div className="font-semibold">{lastScore} {unit}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Current</div>
          <div className="font-semibold">{current} {unit}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Change</div>
          <div className={`font-semibold ${positive ? "text-emerald-500" : "text-rose-500"}`}>{change > 0 ? "+" : ""}{change.toFixed(1)} {unit}</div>
        </div>
      </div>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(100, Math.abs(pct))}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-2 rounded-full bg-gradient-to-r ${positive ? "from-brand-neon to-brand-electric" : "from-brand-orange to-brand-purple"}`}
          />
        </div>
        <div className="mt-2 text-sm text-foreground/80">{feedback}</div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <label htmlFor={`score-${name}`} className="text-xs text-muted-foreground">Update current score</label>
        <input
          id={`score-${name}`}
          type="number"
          value={current}
          onChange={(e) => setCurrent(Number(e.target.value || 0))}
          className="h-9 w-24 rounded-md border border-white/10 bg-white/5 px-2 text-sm outline-none transition focus:ring-2 focus:ring-brand-electric"
        />
      </div>
    </div>
  );
}
