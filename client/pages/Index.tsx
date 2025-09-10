import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Trophy, Dumbbell, CalendarDays, Apple } from "lucide-react";

const features = [
  {
    title: "Athlete Performance",
    to: "/athletes",
    icon: Trophy,
    desc: "Live metrics, PB tracking, and performance analytics.",
    progress: 82,
    img:
      "https://images.unsplash.com/photo-1539622106664-1bb066f66a7a?q=80&w=1600&auto=format&fit=crop",
    accent: "from-brand-electric to-brand-purple",
  },
  {
    title: "Training Programs",
    to: "/training",
    icon: Dumbbell,
    desc: "Personalized plans with periodization & loads.",
    progress: 64,
    img:
      "https://images.unsplash.com/photo-1547919307-1ecb1070e785?q=80&w=1600&auto=format&fit=crop",
    accent: "from-brand-neon to-brand-electric",
  },
  {
    title: "Event Schedules",
    to: "/events",
    icon: CalendarDays,
    desc: "National camps, trials, and competition timelines.",
    progress: 48,
    img:
      "https://images.unsplash.com/photo-1502810190503-8303352d0dd1?q=80&w=1600&auto=format&fit=crop",
    accent: "from-brand-orange to-brand-neon",
  },
  {
    title: "Nutrition Plans",
    to: "/nutrition",
    icon: Apple,
    desc: "Goal-based meal plans and hydration insights.",
    progress: 73,
    img:
      "https://cdn.builder.io/api/v1/image/assets%2Fcd06ff019ea34918b7e998439cfaf4c5%2F1d8425549bc746499a891ca88a440b03",
    accent: "from-brand-purple to-brand-orange",
  },
];

export default function Index() {
  return (
    <div className="">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-electric/10 via-brand-purple/10 to-brand-neon/10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80">
                <span className="inline-block h-2 w-2 rounded-full bg-brand-electric animate-pulse" />
                Built for the Sports Authority of India
              </div>
              <h1 className="mt-6 text-5xl/tight sm:text-6xl/tight font-extrabold tracking-tight">
                <span className="text-gradient">World‑class Sports Management</span>
                <br />
                <span className="text-foreground">for Indian Excellence</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-foreground/80">
                A modern platform that feels like Apple x Nike x Olympics — bold,
                fast, and beautifully simple. Crafted for athletes, coaches, and admins.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-gradient-to-r from-brand-electric via-brand-purple to-brand-neon text-white shadow-glow hover:brightness-110">
                  <Link to="#explore">Explore the Platform</Link>
                </Button>
                <Button asChild variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10">
                  <a href="#features">See Features</a>
                </Button>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-neon" />
                  Real‑time insights
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-orange" />
                  Mobile‑first
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-brand-electric" />
                  Enterprise‑grade UX
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-gradient-to-br from-brand-electric to-brand-neon blur-3xl opacity-30" />
              <div className="relative grid grid-cols-2 gap-4">
                {features.slice(0, 4).map((f, i) => (
                  <motion.div
                    key={f.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm"
                  >
                    <div
                      className={"absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-20 " + f.accent}
                    />
                    <img
                      src={f.img}
                      alt={f.title}
                      className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <f.icon className="h-4 w-4 text-brand-electric" />
                        <p className="text-xs text-muted-foreground">Highlighted</p>
                      </div>
                      <h3 className="mt-1 font-semibold">{f.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {f.desc}
                      </p>
                      <div className="mt-3">
                        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{ transformOrigin: "left" }}
                            className={
                              "h-2 rounded-full bg-gradient-to-r " + f.accent
                            }
                          />
                        </div>
                        <div className="mt-1 text-right text-xs text-foreground/70">
                          {f.progress}%
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Cards */}
      <section id="features" className="relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <Link key={f.title} to={f.to} className="group">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.05 }}
                  className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-0.5 shadow-glow"
                >
                  <div className="relative rounded-[14px] bg-background/60 p-5 transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-2 py-1 text-xs">
                        <f.icon className="h-4 w-4 text-brand-electric" />
                        <span>{f.title}</span>
                      </div>
                      <div className={"h-1.5 w-16 rounded-full bg-gradient-to-r " + f.accent + " animate-gradient-x bg-200%"} />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{f.desc}</p>

                    <div className="mt-4 overflow-hidden rounded-xl">
                      <img
                        src={f.img}
                        alt={f.title}
                        className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm">
                      <span className="text-foreground/80">View details</span>
                      <span className="text-brand-neon group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
