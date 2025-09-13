import type { RequestHandler } from "express";
import multer from "multer";
import { handleAnalyzeWithOpenAI } from "./analyze-openai";

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 50 * 1024 * 1024 } });

export const analyzeUpload = upload.fields([
  { name: "video", maxCount: 1 },
  { name: "frame", maxCount: 1 },
]);

export const handleAnalyze: RequestHandler = async (req, res) => {
  const sport = (req.body.sport as string) || "unknown";
  const distance = Number(req.body.distance ?? 0); // meters, kg, seconds depending on sport
  const duration = Number(req.body.duration ?? 0); // seconds (client measured)
  const frameFile = (req.files as any)?.frame?.[0];
  if (frameFile) (req as any).frameBuffer = frameFile.buffer as Buffer;

  // If OpenAI is configured and we have a frame, ask for technique feedback
  if (process.env.OPENAI_API_KEY && (req as any).frameBuffer) {
    const openaiResult = await handleAnalyzeWithOpenAI(req, res);
    if (res.headersSent) return; // error already sent
    if (openaiResult) {
      // continue and merge with heuristic comparison below
    }
  }

  // Lead athletes (simplified; ideally from DB)
  const leads: Record<string, { name: string; metric: number; unit: string }> = {
    javelin: { name: "Neeraj Chopra", metric: 89.94, unit: "m" },
    sprint400: { name: "Muhammed Anas", metric: 45.21, unit: "s" },
    weightlifting: { name: "Mirabai Chanu", metric: 209, unit: "kg" },
  };

  const lead = leads[sport] ?? { name: "Lead Athlete", metric: 0, unit: "" };

  let delta = 0;
  let pctOfLead = 0;
  if (sport === "sprint400") {
    // Lower is better
    delta = distance - lead.metric; // here "distance" stands for time
    pctOfLead = lead.metric > 0 ? (lead.metric / distance) * 100 : 0;
  } else {
    // Higher is better
    delta = lead.metric - distance;
    pctOfLead = lead.metric > 0 ? (distance / lead.metric) * 100 : 0;
  }

  // Heuristic feedback
  let feedback = "";
  if (sport === "javelin") {
    feedback = distance >= 80 ? "Elite release and run-up — well done!" : distance >= 60 ? "Good base — work on speed and angle (36–38°)." : "Focus on technique drills and approach consistency.";
  } else if (sport === "sprint400") {
    feedback = distance <= 48 ? "Excellent split control — strong finish!" : distance <= 55 ? "Solid pace — build aerobic capacity and lactic tolerance." : "Work on rhythm and stride efficiency.";
  } else if (sport === "weightlifting") {
    feedback = distance >= 180 ? "Powerful pulls and solid lockout!" : distance >= 140 ? "Good base — strengthen leg drive and turnover speed." : "Prioritize technique work and positional strength.";
  } else {
    feedback = "Session recorded. Keep progressing with structured training.";
  }

  const sizeBytes = (req.file?.buffer?.length ?? 0) as number;

  res.json({
    sport,
    duration,
    inputMetric: distance,
    lead,
    comparison: {
      delta,
      pctOfLead: Number.isFinite(pctOfLead) ? Number(pctOfLead.toFixed(2)) : 0,
      betterIs: sport === "sprint400" ? "lower" : "higher",
    },
    media: {
      received: Boolean(req.file),
      sizeBytes,
      mime: req.file?.mimetype || null,
    },
    feedback,
  });
};
