import { NextResponse } from "next/server";
import { getNearbyCoffeeStores } from "../../../lib/geopify";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const lat = Number(searchParams.get("lat"));
    const lon = Number(searchParams.get("lon"));

    if (Number.isNaN(lat) || Number.isNaN(lon)) {
      return NextResponse.json(
        { error: "Invalid lat/lon" },
        { status: 400 }
      );
    }

    const stores = await getNearbyCoffeeStores(lat, lon);

    return NextResponse.json(stores);
  } catch (error) {
    console.error("API coffee-stores error:", error);

    return NextResponse.json(
      { error: "Failed to fetch coffee stores" },
      { status: 500 }
    );
  }
}
