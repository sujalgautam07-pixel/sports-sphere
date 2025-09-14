import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Flame, Salad, Beef, Apple } from "lucide-react";

type Diet = {
  id: string;
  name: string;
  tagline: string;
  macros: { protein: number; carbs: number; fat: number };
  calories: string;
  goals: string[];
  image: string;
  sample: { meal: string; items: string[] }[];
};

const diets: Diet[] = [
  {
    id: "high-protein",
    name: "High Protein",
    tagline: "Lean muscle, faster recovery",
    macros: { protein: 40, carbs: 35, fat: 25 },
    calories: "2,200–3,000 kcal",
    goals: ["Muscle gain", "Recovery", "Strength"],
    image:
      "https://images.unsplash.com/photo-1543332164-6e82f355bad8?q=80&w=1600&auto=format&fit=crop",
    sample: [
      { meal: "Breakfast", items: ["Oats + whey", "Egg whites", "Banana"] },
      { meal: "Lunch", items: ["Grilled chicken", "Brown rice", "Salad"] },
      { meal: "Snack", items: ["Greek yogurt", "Almonds"] },
      { meal: "Dinner", items: ["Paneer/tofu", "Quinoa", "Veg stir‑fry"] },
    ],
  },
  {
    id: "low-carb",
    name: "Low Carb",
    tagline: "Stable energy, leaner physique",
    macros: { protein: 35, carbs: 25, fat: 40 },
    calories: "1,800–2,400 kcal",
    goals: ["Fat loss", "Metabolic health", "Endurance base"],
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop",
    sample: [
      { meal: "Breakfast", items: ["Masala omelette", "Avocado"] },
      { meal: "Lunch", items: ["Fish curry", "Cauliflower rice"] },
      { meal: "Snack", items: ["Cottage cheese", "Walnuts"] },
      { meal: "Dinner", items: ["Tofu tikka", "Leafy salad"] },
    ],
  },
  {
    id: "low-fat-high-protein",
    name: "Low Fat • High Protein",
    tagline: "Power to weight ratio focus",
    macros: { protein: 45, carbs: 40, fat: 15 },
    calories: "2,000–2,600 kcal",
    goals: ["Speed", "Agility", "Weight class"],
    image:
      "https://images.unsplash.com/photo-1454817481404-7e84c1b73b4a?q=80&w=1600&auto=format&fit=crop",
    sample: [
      { meal: "Breakfast", items: ["Poha + sprouts", "Egg whites"] },
      { meal: "Lunch", items: ["Grilled fish/chicken", "Dalia"] },
      { meal: "Snack", items: ["Whey shake", "Fruit"] },
      {
        meal: "Dinner",
        items: ["Tofu/paneer (low‑fat)", "Millet roti", "Sabzi"],
      },
    ],
  },
  {
    id: "balanced-athlete",
    name: "Balanced Athlete",
    tagline: "Everyday training & recovery",
    macros: { protein: 30, carbs: 45, fat: 25 },
    calories: "2,200–2,800 kcal",
    goals: ["General performance", "Team sports", "Consistency"],
    image:
      "https://images.unsplash.com/photo-1540206276207-3af25c08abc4?q=80&w=1600&auto=format&fit=crop",
    sample: [
      { meal: "Breakfast", items: ["Idli + sambar", "Milk"] },
      { meal: "Lunch", items: ["Rajma/chole", "Rice", "Salad"] },
      { meal: "Snack", items: ["Peanut chikki", "Fruit"] },
      { meal: "Dinner", items: ["Chicken/tofu", "Roti", "Veg curry"] },
    ],
  },
];

function MacroBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function Nutrition() {
  const [active, setActive] = useState<string>(diets[0].id);
  const selected = diets.find((d) => d.id === active)!;

  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className="text-gradient">Nutrition Plans</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Curated athlete diets with macros, sample meals, and coaching
              tips.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
            <Flame className="h-4 w-4 text-brand-electric" />
            Performance‑focused
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {diets.map((d) => (
            <button
              key={d.id}
              onClick={() => setActive(d.id)}
              className={`text-left card p-4 transition ${active === d.id ? "ring-2 ring-brand-electric" : "hover:-translate-y-0.5"}`}
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={d.image}
                  alt={d.name}
                  className="h-28 w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">
                    {d.tagline}
                  </div>
                  <div className="text-lg font-semibold">{d.name}</div>
                </div>
                {d.id === "high-protein" ? (
                  <Beef className="h-5 w-5 text-brand-neon" />
                ) : d.id === "low-carb" ? (
                  <Salad className="h-5 w-5 text-brand-orange" />
                ) : (
                  <Apple className="h-5 w-5 text-brand-electric" />
                )}
              </div>
              <div className="mt-3 grid gap-2">
                <MacroBar
                  label="Protein"
                  value={d.macros.protein}
                  color="bg-brand-neon"
                />
                <MacroBar
                  label="Carbs"
                  value={d.macros.carbs}
                  color="bg-brand-electric"
                />
                <MacroBar
                  label="Fat"
                  value={d.macros.fat}
                  color="bg-brand-orange"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>Target • {d.calories}</span>
                <span>{d.goals.join(" • ")}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-8 card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Selected plan</div>
              <div className="text-2xl font-semibold">{selected.name}</div>
            </div>
            <Button variant="brand">Start this plan</Button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {selected.sample.map((s) => (
              <div
                key={s.meal}
                className="rounded-xl border border-white/10 bg-background/60 p-4"
              >
                <div className="text-xs text-muted-foreground">{s.meal}</div>
                <ul className="mt-1 list-disc pl-5 text-sm text-foreground/90">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 text-sm text-foreground/80">
            Tips: Hydrate well, prioritise whole foods, and time carbs around
            training. Adjust portions based on body‑weight and session load.
          </div>
        </div>
      </div>
    </section>
  );
}
