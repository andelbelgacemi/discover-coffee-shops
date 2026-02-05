export default function Footer() {
  return (
    <footer className="mt-24 w-full border-t border-[var(--coffee-light)]/40 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Branding */}
          <div className="flex items-center gap-3">
            <div className="text-3xl">☕</div>
            <div>
              <p className="font-['Crimson_Pro'] text-lg font-bold text-[var(--coffee-dark)]">
                Coffee Connoisseur
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-bold tracking-wide">
                CRAFTED WITH PASSION
              </p>
            </div>
          </div>

          {/* Center - Decorative divider on mobile */}
          <div className="hidden md:block flex-1 max-w-md">
            <div className="h-px bg-gradient-to-r from-transparent via-[var(--coffee-medium)]/50 to-transparent" />
          </div>

          {/* Right side - Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-[var(--text-secondary)] font-semibold">
              © {new Date().getFullYear()} Andel Belgacemi
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}