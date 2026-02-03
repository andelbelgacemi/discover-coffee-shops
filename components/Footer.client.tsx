export default function Footer() {
  return (
    <footer className="mt-16 w-full border-t bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400">
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row ">
          <p className="text-sm text-white">
            © {new Date().getFullYear()} Andel Belgacemi
          </p>
        </div>
      </div>
    </footer>
  );
}
