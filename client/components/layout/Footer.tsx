export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Sports Authority of India — SportSphere
          </p>
          <div className="h-2 w-48 rounded-full bg-gradient-to-r from-brand-electric via-brand-purple to-brand-neon animate-gradient-x bg-200%" />
        </div>
      </div>
    </footer>
  );
}
