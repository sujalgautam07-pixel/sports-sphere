import { ScoreCard } from "@/components/metrics/ScoreCard";
import { motion } from "framer-motion";

const sample = [
  { name: "Neeraj Chopra", sport: "Javelin Throw", lastScore: 85.2, currentScore: 88.6, unit: "m" },
  { name: "Hima Das", sport: "400m", lastScore: 51.4, currentScore: 50.9, unit: "s" },
  { name: "Mirabai Chanu", sport: "Weightlifting", lastScore: 204, currentScore: 208, unit: "kg" },
  { name: "Lakshya Sen", sport: "Badminton", lastScore: 21, currentScore: 22, unit: "pts" },
  { name: "PR Sreejesh", sport: "Hockey Saves", lastScore: 18, currentScore: 20, unit: "sv" },
  { name: "Manika Batra", sport: "Table Tennis", lastScore: 3.2, currentScore: 3.4, unit: "ppi" },
];

export default function Leaderboard() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
          >
            <span className="text-gradient">Athlete Score Progress</span>
          </motion.h1>
          <p className="mt-4 text-muted-foreground">
            Compare current performance with the previous best. See improvement percentage and instant feedback.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sample.map((a, i) => (
            <motion.div key={a.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <ScoreCard {...a} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
