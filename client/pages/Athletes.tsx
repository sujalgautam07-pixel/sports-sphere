import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import VideoRecorder from "@/components/media/VideoRecorder";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScoreCard } from "@/components/metrics/ScoreCard";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const sports = {
  javelin: {
    name: "Javelin Throw",
    unit: "m",
    lead: {
      name: "Neeraj Chopra",
      current: 89.94,
      image:
        "https://cdn.builder.io/api/v1/image/assets%2Fcd06ff019ea34918b7e998439cfaf4c5%2F98e4032a9f854763b9c77fbdc41eb9ff",
    },
    tip: "Focus on run-up speed and release angle (~36–38°).",
  },
  shotput: {
    name: "Shot Put",
    unit: "m",
    lead: {
      name: "Tajinderpal Singh Toor",
      current: 21.77,
      image:
        "https://images.unsplash.com/photo-1526401485004-2fda9f4dc5f1?q=80&w=1200&auto=format&fit=crop",
    },
    tip: "Explode through hips; keep a strong finish on release.",
  },
  discus: {
    name: "Discus Throw",
    unit: "m",
    lead: {
      name: "Kamalpreet Kaur",
      current: 66.59,
      image:
        "https://images.unsplash.com/photo-1526401485004-2fda9f4dc5f1?q=80&w=1200&auto=format&fit=crop",
    },
    tip: "Smooth rotational rhythm; finish high and long.",
  },
  longjump: {
    name: "Long Jump",
    unit: "m",
    lead: {
      name: "Jeswin Aldrin",
      current: 8.42,
      image:
        "https://images.unsplash.com/photo-1502810190503-8303352d0dd1?q=80&w=1200&auto=format&fit=crop",
    },
    tip: "Drive the last two steps and hit the board tall.",
  },
  highjump: {
    name: "High Jump",
    unit: "m",
    lead: {
      name: "Tejaswin Shankar",
      current: 2.29,
      image:
        "https://images.unsplash.com/photo-1502810190503-8303352d0dd1?q=80&w=1200&auto=format&fit=crop",
    },
    tip: "Controlled curve and late, powerful takeoff.",
  },
  sprint400: {
    name: "400m Sprint",
    unit: "s",
    lead: {
      name: "Muhammed Anas",
      current: 45.21,
      image:
        "https://images.unsplash.com/photo-1547919307-1ecb1070e785?q=80&w=1200&auto=format&fit=crop",
    },
    tip: "Even pacing and strong final 100m drive are key.",
  },
  weightlifting: {
    name: "Weightlifting (Total)",
    unit: "kg",
    lead: {
      name: "Mirabai Chanu",
      current: 209,
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    },
    tip: "Keep bar path close and explode through extension.",
  },
  badminton: {
    name: "Badminton (Match Points)",
    unit: "pts",
    lead: {
      name: "Lakshya Sen",
      current: 22,
      image:
        "https://images.unsplash.com/photo-1521417531039-6949f3f9f2b5?q=80&w=1200&auto=format&fit=crop",
    },
    tip: "Exploit opponent’s backhand and control the net.",
  },
  wrestling: {
    name: "Wrestling (Bout Points)",
    unit: "pts",
    lead: {
      name: "Bajrang Punia",
      current: 10,
      image:
        "https://images.unsplash.com/photo-1571907480495-53b6d4d6c4b0?q=80&w=1200&auto=format&fit=crop",
    },
    tip: "Level changes and hand fighting set up your shots.",
  },
  boxing: {
    name: "Boxing (Bout Points)",
    unit: "pts",
    lead: {
      name: "Nikhat Zareen",
      current: 5,
      image:
        "https://images.unsplash.com/photo-1521417531039-6949f3f9f2b5?q=80&w=1200&auto=format&fit=crop",
    },
    tip: "Keep a tight guard; work the jab and angles.",
  },
  hockey: {
    name: "Hockey (Saves)",
    unit: "sv",
    lead: {
      name: "PR Sreejesh",
      current: 20,
      image:
        "https://images.unsplash.com/photo-1508766206392-8bd5cf550d1b?q=80&w=1200&auto=format&fit=crop",
    },
    tip: "Set early; explosive lateral pushes for corners.",
  },
  tabletennis: {
    name: "Table Tennis (Game Points)",
    unit: "pts",
    lead: {
      name: "Manika Batra",
      current: 11,
      image:
        "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1200&auto=format&fit=crop",
    },
    tip: "Vary spin on serve; attack third ball aggressively.",
  },
} as const;

type SportKey = keyof typeof sports;

export default function Athletes() {
  const [sport, setSport] = useState<SportKey>("javelin");
  const cfg = sports[sport];

  const [last, setLast] = useState<number>(60);
  const [current, setCurrent] = useState<number>(65);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [durationSec, setDurationSec] = useState<number>(0);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

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
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-gradient">Athlete Performance</span>
            </h1>
            <p className="mt-2 text-muted-foreground">
              Record your attempt, enter your result, and compare with India’s
              lead athlete.
            </p>
          </div>
          <div className="w-56">
            <Select
              value={sport}
              onValueChange={(v) => setSport(v as SportKey)}
            >
              <SelectTrigger className="glass border-white/10">
                <SelectValue placeholder="Select sport" />
              </SelectTrigger>
              <SelectContent>
                {(Object.keys(sports) as SportKey[]).map((k) => (
                  <SelectItem key={k} value={k}>
                    {sports[k].name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card p-6 card-hover">
            <h2 className="text-lg font-semibold">Record or Upload</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Capture your attempt or upload a video (analysis is demo-only).
            </p>
            <VideoRecorder
              className=""
              onComplete={(blob, url, dur, thumb) => {
                setVideoUrl(url);
                setDurationSec(dur || 0);
                if (thumb) {
                  // store in memory via object URL for now (optional)
                }
              }}
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
              <div className="mt-3 text-sm text-foreground/80">
                Video ready. Duration ~{durationSec.toFixed(1)}s. Enter your
                measured result and run analysis.
              </div>
            )}
            <div className="mt-4">
              <Button
                type="button"
                variant="brand"
                disabled={analyzing}
                onClick={async () => {
                  try {
                    setAnalyzing(true);
                    setAnalysis(null);
                    const fd = new FormData();
                    fd.append("sport", sport);
                    fd.append("distance", String(current));
                    fd.append("duration", String(durationSec || 0));
                    if (videoUrl) {
                      const resp = await fetch(videoUrl);
                      const blob = await resp.blob();
                      fd.append("video", blob, "attempt.webm");
                      // also send a thumbnail frame for vision models
                      try {
                        const v = document.createElement("video");
                        v.src = videoUrl;
                        await v.play().catch(() => {});
                        await new Promise((r) =>
                          v.addEventListener("loadeddata", r, { once: true }),
                        );
                        const canvas = document.createElement("canvas");
                        canvas.width = v.videoWidth || 640;
                        canvas.height = v.videoHeight || 360;
                        const ctx = canvas.getContext("2d");
                        if (ctx) {
                          ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
                          const imgBlob: Blob | null = await new Promise(
                            (resolve) =>
                              canvas.toBlob(
                                (b) => resolve(b),
                                "image/jpeg",
                                0.8,
                              ),
                          );
                          if (imgBlob) fd.append("frame", imgBlob, "frame.jpg");
                        }
                        v.pause();
                      } catch {}
                    }
                    const res = await fetch("/api/analyze", {
                      method: "POST",
                      body: fd,
                    });
                    const json = await res.json();
                    setAnalysis(json);
                  } finally {
                    setAnalyzing(false);
                  }
                }}
                className="bg-gradient-to-r from-brand-electric via-brand-purple to-brand-neon text-white shadow-glow"
              >
                {analyzing ? "Analyzing..." : "Analyze Video"}
              </Button>
            </div>
          </div>

          <div className="card p-6 card-hover">
            <h2 className="text-lg font-semibold">Your Result</h2>
            <p className="mb-4 text-sm text-muted-foreground">
              Enter your last and current {cfg.unit === "s" ? "time" : "mark"}{" "}
              to visualize progress.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="last">Last</Label>
                <Input
                  id="last"
                  type="number"
                  step="0.01"
                  value={last}
                  onChange={(e) => setLast(Number(e.target.value || 0))}
                />
              </div>
              <div>
                <Label htmlFor="current">Current</Label>
                <Input
                  id="current"
                  type="number"
                  step="0.01"
                  value={current}
                  onChange={(e) => setCurrent(Number(e.target.value || 0))}
                />
              </div>
            </div>

            <div className="mt-5 h-44 w-full overflow-hidden rounded-xl border border-white/10 bg-background/60 p-3">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis
                    dataKey="label"
                    stroke="hsl(var(--muted-foreground))"
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    tickLine={false}
                    axisLine={false}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(0,0,0,0.6)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 8,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--brand-electric))"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-5">
              <ScoreCard
                name="You"
                sport={cfg.name}
                lastScore={last}
                currentScore={current}
                unit={cfg.unit}
              />
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              Tip: {cfg.tip}
            </div>
          </div>
        </div>

        {analysis && (
          <div className="mt-8 card p-6">
            <h2 className="text-lg font-semibold">Analysis</h2>
            <div className="mt-2 text-sm text-foreground/80">
              {analysis.feedback}
            </div>
            <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-background/60 p-3">
                <div className="text-xs text-muted-foreground">
                  Your {cfg.unit === "s" ? "time" : "mark"}
                </div>
                <div className="font-semibold">
                  {analysis.inputMetric} {cfg.unit}
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-background/60 p-3">
                <div className="text-xs text-muted-foreground">Pct of lead</div>
                <div className="font-semibold">
                  {analysis.comparison?.pctOfLead}%
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-background/60 p-3">
                <div className="text-xs text-muted-foreground">Duration</div>
                <div className="font-semibold">
                  {analysis.duration?.toFixed?.(1) ?? analysis.duration}s
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={cfg.lead.image}
                alt={cfg.lead.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
              <div>
                <div className="text-xs text-muted-foreground">
                  Lead athlete
                </div>
                <div className="text-xl font-semibold">{cfg.lead.name}</div>
                <div className="text-sm text-foreground/80">
                  Current performance:{" "}
                  <span className="font-medium">
                    {cfg.lead.current} {cfg.unit}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-sm">
              {cfg.unit === "s" ? (
                <span>
                  You are{" "}
                  <span className="font-semibold">
                    {Math.abs(current - cfg.lead.current).toFixed(2)} {cfg.unit}
                  </span>{" "}
                  from the lead.
                </span>
              ) : (
                <span>
                  You are{" "}
                  <span className="font-semibold">
                    {Math.abs(cfg.lead.current - current).toFixed(2)} {cfg.unit}
                  </span>{" "}
                  from the lead.
                </span>
              )}
            </div>
          </div>
        </div>

        {sport === "javelin" && (
          <div className="mt-6 text-sm text-muted-foreground">
            Example shown: Neeraj Chopra as lead athlete for Javelin Throw.
          </div>
        )}
      </div>
    </section>
  );
}
