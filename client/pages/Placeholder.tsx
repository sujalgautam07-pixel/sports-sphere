type PlaceholderProps = { title: string; subtitle?: string };

export default function Placeholder({ title, subtitle }: PlaceholderProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            <span className="text-gradient">{title}</span>
          </h1>
          <p className="mt-4 text-muted-foreground">
            {subtitle ?? "This page is ready to be designed. Tell me what you want here and I'll build it pixel-perfect and responsive."}
          </p>
        </div>
      </div>
    </section>
  );
}
