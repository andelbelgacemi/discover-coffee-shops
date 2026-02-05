import HomeClient from "../components/HomeClient.client";
import { getNearbyCoffeeStores } from "../lib/geopify";

const CITIES = [
  {
    name: "New York",
    lat: 40.740121,
    lon: -73.990593,
  },
  {
    name: "Paris",
    lat: 48.856613,
    lon: 2.352222,
  },
  {
    name: "London",
    lat: 51.507351,
    lon: -0.127758,
  },
];

function getRandomCity() {
  return CITIES[Math.floor(Math.random() * CITIES.length)];
}

export default async function Home() {
  // 🔀 Pick random city for FEATURED
  const featuredCity = getRandomCity();

  console.log("Fetching FEATURED coffee stores for:", featuredCity.name);

  const featuredStores = (
    await getNearbyCoffeeStores(featuredCity.lat, featuredCity.lon)
  ).slice(0, 3);

  // 📍 Fixed city for NEARBY (Paris example)
  const nearbyStores = await getNearbyCoffeeStores(
    48.864716,
    2.350466
  );

  return (
    <main className="min-h-screen">
      <HomeClient
        initialFeatured={featuredStores}
        nearby={nearbyStores}
      />
    </main>
  );
}
