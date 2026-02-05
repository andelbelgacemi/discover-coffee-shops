"use client";
import { useState, useTransition } from "react";
import Navbar from "./Navbar.client";
import Card from "./Card";
import Footer from "./Footer.client";
import type { CoffeeStore } from "../lib/geopify";

const randomLatLon = () => {
  const baseLat = 40.7128; // NYC
  const baseLon = -74.0060;
  return {
    lat: baseLat + (Math.random() - 0.5) * 0.05,
    lon: baseLon + (Math.random() - 0.5) * 0.05,
  };
};

export default function HomeClient({
  initialFeatured,
  nearby,
}: {
  initialFeatured: CoffeeStore[];
  nearby: CoffeeStore[];
}) {
  const [featured, setFeatured] = useState<CoffeeStore[]>(initialFeatured);
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    startTransition(() => {
      fetchFeatured();
    });
  };

  async function fetchFeatured() {
    try {
      const { lat, lon } = randomLatLon();
      console.log("Fetching coffee stores at:", lat, lon);
      const res = await fetch(`/api/coffee-stores?lat=${lat}&lon=${lon}`);
      const text = await res.text();
      console.log("RAW API RESPONSE:", text);
      const data = JSON.parse(text);
      console.log("PARSED DATA:", data);
      if (!Array.isArray(data) || data.length === 0) {
        console.warn("No coffee stores returned");
        return;
      }
      setFeatured(data);
    } catch (err) {
      console.error("Search error:", err);
    }
  }

  return (
    <>
      <Navbar onSearch={handleSearch} />
      
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h2 className="font-['Crimson_Pro'] text-5xl md:text-6xl font-bold text-[var(--coffee-dark)] mb-4 tracking-tight">
            Your Next Great Cup
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto font-semibold">
            Discover exceptional coffee experiences in your neighborhood and beyond
          </p>
        </div>

        {/* Featured Section */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0">
              <div className="w-2 h-14 bg-gradient-to-b from-[var(--coffee-dark)] to-[var(--coffee-medium)] rounded-full" />
            </div>
            <div>
              <h2 className="font-['Crimson_Pro'] text-3xl font-bold text-[var(--coffee-dark)]">
                Featured Picks
              </h2>
              <p className="text-sm text-[var(--text-secondary)] font-bold tracking-wide mt-1">
                HANDPICKED FOR YOU
              </p>
            </div>
          </div>

          {isPending ? (
            <div className="card-grid">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl bg-white shadow-md overflow-hidden">
                  <div className="h-56 bg-gradient-to-br from-[var(--cream-dark)] to-[var(--cream)] loading-shimmer" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 bg-[var(--cream-dark)] rounded loading-shimmer w-3/4" />
                    <div className="h-4 bg-[var(--cream-dark)] rounded loading-shimmer w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card-grid">
              {featured.map((s) => (
                <Card
                  key={s.id}
                  name={s.name}
                  imageURL={s.imageURL}
                  href={`/coffee-stores/${s.id}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* Nearby Section */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex-shrink-0">
              <div className="w-2 h-14 bg-gradient-to-b from-[var(--coffee-medium)] to-[var(--accent-gold)] rounded-full" />
            </div>
            <div>
              <h2 className="font-['Crimson_Pro'] text-3xl font-bold text-[var(--coffee-dark)]">
                Near You
              </h2>
              <p className="text-sm text-[var(--text-secondary)] font-bold tracking-wide mt-1">
                LOCAL FAVORITES
              </p>
            </div>
          </div>

          <div className="card-grid">
            {nearby.map((s) => (
              <Card
                key={s.id}
                name={s.name}
                imageURL={s.imageURL}
                href={`/coffee-stores/${s.id}`}
              />
            ))}
          </div>
        </section>

        {isPending && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border-2 border-[var(--coffee-light)] text-[var(--coffee-dark)] font-bold shadow-md">
              <div className="w-5 h-5 border-2 border-[var(--coffee-dark)] border-t-transparent rounded-full animate-spin" />
              Brewing fresh results...
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}