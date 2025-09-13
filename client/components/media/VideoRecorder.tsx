import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export type VideoRecorderProps = {
  onComplete?: (blob: Blob, url: string, durationSec: number) => void;
  className?: string;
};

export default function VideoRecorder({ onComplete, className }: VideoRecorderProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string>("");
  const [error, setError] = useState<string>("");
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      if (videoURL) URL.revokeObjectURL(videoURL);
    };
  }, [stream, videoURL]);

  const startCamera = async () => {
    setError("");
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
        await videoRef.current.play();
      }
    } catch (e) {
      setError("Camera access denied. You can upload a video instead.");
    }
  };

  const startRecording = async () => {
    if (!stream) await startCamera();
    if (!stream) return;
    chunksRef.current = [];
    const mr = new MediaRecorder(stream, { mimeType: "video/webm" });
    mediaRecorderRef.current = mr;
    mr.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data);
    };
    mr.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
      const durationSec = startTimeRef.current ? (Date.now() - startTimeRef.current) / 1000 : 0;
      onComplete?.(blob, url, durationSec);
      startTimeRef.current = null;
    };
    mr.start();
    startTimeRef.current = Date.now();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  return (
    <div className={className}>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/40">
        <video ref={videoRef} className="h-56 w-full object-cover" muted playsInline />
        {videoURL && !recording && (
          <video src={videoURL} controls className="h-56 w-full object-cover" />
        )}
      </div>
      {error && <div className="mt-2 text-sm text-amber-500">{error}</div>}
      <div className="mt-3 flex gap-2">
        {!recording ? (
          <Button type="button" onClick={startRecording} className="bg-gradient-to-r from-brand-electric via-brand-purple to-brand-neon text-white shadow-glow">
            Record
          </Button>
        ) : (
          <Button type="button" variant="destructive" onClick={stopRecording}>Stop</Button>
        )}
      </div>
    </div>
  );
}
