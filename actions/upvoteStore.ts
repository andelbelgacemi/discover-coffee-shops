"use server";

import { incrementVote } from "../lib/airtable";
import { revalidatePath } from "next/cache";

export async function upvoteStore(storeId: string) {
  await incrementVote(storeId);
  revalidatePath(`/coffee-stores/${storeId}`);
}
