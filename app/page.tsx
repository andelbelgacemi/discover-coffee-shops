import HomeClient from "../components/HomeClient.client";
import { getNearbyCoffeeStores } from "../lib/geopify";

export default async function Home() {
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
const city = getRandomCity();

console.log("Fetching coffee stores for:", city.name);

const featuredStores = (await getNearbyCoffeeStores(
  city.lat,
  city.lon
)).slice(0, 3);

  const nearbyStores = await getNearbyCoffeeStores(48.864716, 2.350466);

  return (
    <main>
      <HomeClient
        initialFeatured={featuredStores}
        nearby={nearbyStores}
      />
    </main>
  );
}
