import HomeClient from "../components/HomeClient.client";
import { getNearbyCoffeeStores } from "../lib/geopify";

export default async function Home() {
  // Initial location (static)
  const lat = 40.740121;
  const lon = -73.990593;

  // Initial data (server-side)
  const featuredStores = await getNearbyCoffeeStores(lat, lon);
  const nearbyStores = await getNearbyCoffeeStores(lat + 0.02, lon + 0.02);

  return (
    <main className="mx-auto max-w-6xl px-4">
      <HomeClient
        initialFeatured={featuredStores}
        nearby={nearbyStores}
      />
    </main>
  );
}
