import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import VideoRecorder from "@/components/media/VideoRecorder";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScoreCard } from "@/components/metrics/ScoreCard";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const sports = {
  javelin: {
    name: "Javelin Throw",
    unit: "m",
    lead: { name: "Neeraj Chopra", current: 89.94, image: "https://cdn.builder.io/api/v1/image/assets%2Fcd06ff019ea34918b7e998439cfaf4c5%2F98e4032a9f854763b9c77fbdc41eb9ff" },
    tip: "Focus on run-up speed and release angle (~36–38°).",
  },
  sprint400: {
    name: "400m Sprint",
    unit: "s",
    lead: { name: "Muhammed Anas", current: 45.21, image: "https://images.unsplash.com/photo-1547919307-1ecb1070e785?q=80&w=1200&auto=format&fit=crop" },
    tip: "Even pacing and strong final 100m drive are key.",
  },
  weightlifting: {
    name: "Weightlifting (Total)",
    unit: "kg",
    lead: { name: "Mirabai Chanu", current: 209, image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop" },
    tip: "Keep bar path close and explode through extension.",
  },
} as const;

type SportKey = keyof typeof sports;

export default function Athletes() {
  const [sport, setSport] = useState<SportKey>("javelin");
  const cfg = sports[sport];

  const [last, setLast] = useState<number>(60);
  const [current, setCurrent] = useState<number>(65);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const chartData = useMemo(
    () => [
      { label: "Last", value: last },
      { label: "Current", value: current },
    ],
    [last, current],
  );

  const handleUpload = (file?: File) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight"><span className="text-gradient">Athlete Performance</span></h1>
            <p className="mt-2 text-muted-foreground">Record your attempt, enter your result, and compare with India’s lead athlete.</p>
          </div>
          <div className="w-56">
            <Select value={sport} onValueChange={(v) => setSport(v as SportKey)}>
              <SelectTrigger className="glass border-white/10">
                <SelectValue placeholder="Select sport" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(sports) as SportKey[]).map((k) => (
                  <SelectItem key={k} value={k}>{sports[k].name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">Record or Upload</h2>
            <p className="mb-4 text-sm text-muted-foreground">Capture your attempt or upload a video (analysis is demo-only).</p>
            <VideoRecorder
              className=""
              onComplete={(_, url) => setVideoUrl(url)}
            />
            <div className="mt-3">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleUpload(e.target.files?.[0] || undefined)}
                className="block w-full text-sm text-foreground file:mr-4 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-sm file:text-foreground hover:file:bg-white/20"
              />
            </div>
            {videoUrl && (
              <div className="mt-3 text-sm text-foreground/80">Video ready. You can enter your measured result below.</div>
            )}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">Your Result</h2>
            <p className="mb-4 text-sm text-muted-foreground">Enter your last and current {cfg.unit === "s" ? "time" : "mark"} to visualize progress.</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="last">Last</Label>
                <Input id="last" type="number" step="0.01" value={last} onChange={(e) => setLast(Number(e.target.value || 0))} />
              </div>
              <div>
                <Label htmlFor="current">Current</Label>
                <Input id="current" type="number" step="0.01" value={current} onChange={(e) => setCurrent(Number(e.target.value || 0))} />
              </div>
            </div>

            <div className="mt-5 h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-background/60 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="label" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} width={40} />
                  <Tooltip contentStyle={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8 }} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--brand-electric))" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-5">
              <ScoreCard name="You" sport={cfg.name} lastScore={last} currentScore={current} unit={cfg.unit} />
            </div>

            <div className="mt-4 text-sm text-muted-foreground">Tip: {cfg.tip}</div>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img src={cfg.lead.image} alt={cfg.lead.name} className="h-16 w-16 rounded-xl object-cover" />
              <div>
                <div className="text-xs text-muted-foreground">Lead athlete</div>
                <div className="text-xl font-semibold">{cfg.lead.name}</div>
                <div className="text-sm text-foreground/80">Current performance: <span className="font-medium">{cfg.lead.current} {cfg.unit}</span></div>
              </div>
            </div>
            <div className="text-sm">
              {cfg.unit === "s" ? (
                <span>
                  You are <span className="font-semibold">{Math.abs(current - cfg.lead.current).toFixed(2)} {cfg.unit}</span> from the lead.
                </span>
              ) : (
                <span>
                  You are <span className="font-semibold">{Math.abs(cfg.lead.current - current).toFixed(2)} {cfg.unit}</span> from the lead.
                </span>
              )}
            </div>
          </div>
        </div>

        {sport === "javelin" && (
          <div className="mt-6 text-sm text-muted-foreground">Example shown: Neeraj Chopra as lead athlete for Javelin Throw.</div>
        )}
      </div>
    </section>
  );
}
