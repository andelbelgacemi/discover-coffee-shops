"use client";

import { useState, useTransition } from "react";
import Banner from "./banner.client";
import Card from "./Card.client";
import type { CoffeeStore } from "../lib/geopify";

const randomLatLon = () => {
  const baseLat = 40.7128;   // NYC
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

    const res = await fetch(
      `/api/coffee-stores?lat=${lat}&lon=${lon}`
    );

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
      <Banner onSearch={handleSearch} />

      <h2 className="mb-4 text-xl font-bold">Featured</h2>
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

      <h2 className="mt-10 mb-4 text-xl font-bold">Nearby</h2>
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

      {isPending && (
        <p className="mt-4 text-sm text-gray-500">
          Searching new coffee shops ☕
        </p>
      )}
    </>
  );
}
