export type GeoapifyFeature = {
  properties: {
    place_id: string;
    name?: string;
  };
};

export type CoffeeStore = {
  id: number;        
  name: string;
  imageURL: string;
};

export async function getNearbyCoffeeStores(
  lat: number,
  lon: number
): Promise<CoffeeStore[]> {
  const res = await fetch(
    `https://api.geoapify.com/v2/places?categories=catering.cafe&filter=circle:${lon},${lat},5000&limit=3&apiKey=${process.env.GEOAPIFY_API_KEY}`
  );

  const data = await res.json();

  return data.features.map((place: GeoapifyFeature) => ({
    id: place.properties.place_id,
    name: place.properties.name || "Coffee Shop",
    imageURL: `https://picsum.photos/seed/${place.properties.place_id}/260/160`,
  }));
}


