import type { RequestHandler } from "express";
import { getOpenAI } from "../lib/openai";

export const handleAnalyzeWithOpenAI: RequestHandler = async (req, res) => {
  const client = getOpenAI();
  if (!client) return res.status(501).json({ error: "OpenAI not configured" });

  try {
    const sport = (req.body.sport as string) || "unknown";
    const inputMetric = Number(req.body.distance ?? 0);
    const duration = Number(req.body.duration ?? 0);

    // Use frame image if provided
    const frame = req.file || (req as any).files?.frame;

    // If using multer.single("video"), we won't have frame here; in index we will wire a separate multer for frame
    // Accept from req as (req as any).frameBuffer
    const frameBuffer: Buffer | undefined = (req as any).frameBuffer;

    const messages: any[] = [
      {
        role: "system",
        content:
          "You are a professional sports performance analyst. Provide concise, actionable feedback.",
      },
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Sport: ${sport}. Athlete reported metric: ${inputMetric}. Duration: ${duration}s. Analyze technique from the image and suggest 2-3 improvements in bullet points. End with an encouraging one-liner.`,
          },
        ],
      },
    ];

    if (frameBuffer) {
      const base64 = `data:image/jpeg;base64,${frameBuffer.toString("base64")}`;
      (messages[1].content as any[]).push({ type: "input_image", image_url: base64 });
    }

    const completion = await (client as any).chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.4,
      max_tokens: 250,
    });

    const text = completion.choices?.[0]?.message?.content || "";
    res.locals.openai = { feedback: text };
    return res.locals.openai;
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "OpenAI error" });
  }
};
