import Image from "next/image";
import Link from "next/link";
import UpvoteButton from "../../../components/UpvoteButton.client";
import { getOrCreateStore } from "../../../lib/airtable";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    throw new Error("Missing store id");
  }

  const store = await getOrCreateStore(id, `Coffee Store ${id}`);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-5xl">
        
        {/* Back link */}
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-medium text-indigo-600 hover:underline"
        >
          ← Back
        </Link>

        {/* Card */}
        <div className="flex flex-col md:flex-row gap-8 rounded-2xl bg-white p-8 shadow-xl">
          
          {/* Image */}
          <div className="flex-shrink-0">
            <Image
              src={`https://picsum.photos/seed/${id}/260/160`}
              alt={store.name}
              width={260}
              height={160}
              className="rounded-xl object-cover shadow-md"
              priority
            />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div>
              

              <p className="text-gray-500 text-sm">
                Discover great coffee near you ☕
              </p>
            </div>

            {/* Vote */}
            <div className="mt-6">
              <UpvoteButton
                storeId={id}
                initialVotes={store.votes}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
