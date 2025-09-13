import { useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { setVerified } from "@/lib/auth";

const emailSchema = z.object({ email: z.string().email() });
const phoneSchema = z.object({ phone: z.string().min(8).max(15) });

export default function SignUp() {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const [mode, setMode] = useState<"email" | "phone">("email");
  const [sentTo, setSentTo] = useState<string>("");
  const [step, setStep] = useState<"form" | "otp">("form");
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState<string>("");

  const form = useForm<any>({
    defaultValues: { email: "", phone: "" },
  });

  const targetPath = (location?.state?.from?.pathname as string) || "/home";

  const sendOtp = (value: string) => {
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setServerOtp(generated);
    setSentTo(value);
    setStep("otp");
  };

  const onSubmit = form.handleSubmit((values) => {
    // validate depending on mode
    if (mode === "email") {
      const res = emailSchema.safeParse({ email: values.email });
      if (!res.success) {
        form.setError("email", { message: res.error.errors[0].message });
        return;
      }
      sendOtp(values.email);
      return;
    }

    const res = phoneSchema.safeParse({ phone: values.phone });
    if (!res.success) {
      form.setError("phone", { message: res.error.errors[0].message });
      return;
    }
    sendOtp(values.phone);
  });

  const verify = () => {
    if (otp === serverOtp && otp.length === 6) {
      setVerified(true);
      navigate(targetPath, { replace: true });
    } else {
      alert("Invalid OTP. Please try again.");
    }
  };

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="mx-auto max-w-xl">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-sm">
            <h1 className="text-3xl font-extrabold tracking-tight">
              <span className="text-gradient">Join SportSphere</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Register with email or mobile number to continue. We will send a
              6‑digit OTP for verification.
            </p>

            {step === "form" && (
              <div className="mt-6">
                <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="phone">Mobile</TabsTrigger>
                  </TabsList>
                  <TabsContent value="email" className="mt-4">
                    <form onSubmit={onSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="name@example.com"
                          {...form.register("email")}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-brand-electric via-brand-purple to-brand-neon text-white shadow-glow"
                      >
                        Send OTP
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="phone" className="mt-4">
                    <form onSubmit={onSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="phone">Mobile number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="9876543210"
                          {...form.register("phone")}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-brand-electric via-brand-purple to-brand-neon text-white shadow-glow"
                      >
                        Send OTP
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {step === "otp" && (
              <div className="mt-6">
                <div className="text-sm text-muted-foreground">
                  We sent a 6‑digit code to{" "}
                  <span className="font-medium text-foreground">{sentTo}</span>
                </div>
                <div className="mt-4">
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Button variant="outline" onClick={() => setStep("form")}>
                    Edit
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => sendOtp(sentTo)}>
                      Resend OTP
                    </Button>
                    <Button
                      onClick={verify}
                      className="bg-gradient-to-r from-brand-electric via-brand-purple to-brand-neon text-white shadow-glow"
                    >
                      Verify & Continue
                    </Button>
                  </div>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">
                  Demo mode: OTP is{" "}
                  <span className="font-mono">{serverOtp}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
