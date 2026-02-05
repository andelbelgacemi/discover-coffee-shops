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
  const store = await getOrCreateStore(id);

  return (
    <div className="min-h-screen">
      {/* Hero section with image */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src={`https://picsum.photos/seed/${id}/1200/800`}
          alt={store.name}
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--cream)] via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
        
        {/* Back button - positioned over image */}
        <div className="absolute top-8 left-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 backdrop-blur-sm text-[var(--coffee-dark)] font-semibold text-sm shadow-lg hover:bg-white hover:shadow-xl transition-all hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to list
          </Link>
        </div>
      </div>

      {/* Content section */}
      <div className="relative -mt-32">
        <div className="mx-auto max-w-5xl px-6">
          {/* Main card */}
          <div className="relative rounded-3xl bg-white shadow-2xl overflow-hidden">
            {/* Decorative top border */}
            <div className="h-2 bg-gradient-to-r from-[var(--coffee-rich)] via-[var(--accent-gold)] to-[var(--coffee-medium)]" />
            
            <div className="p-8 md:p-12">
              {/* Store name and details */}
              <div className="mb-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0">
                    <div className="w-3 h-24 bg-gradient-to-b from-[var(--coffee-rich)] to-[var(--accent-gold)] rounded-full" />
                  </div>
                  <div className="flex-1">
                    <h1 className="font-['Crimson_Pro'] text-4xl md:text-5xl font-bold text-[var(--coffee-dark)] mb-3 leading-tight">
                      {store.name}
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg font-semibold">
                      Discover what makes this spot special
                    </p>
                  </div>
                </div>

                {/* Info cards */}
                <div className="grid md:grid-cols-3 gap-4 mb-8">
                  <div className="p-5 rounded-xl bg-white border-2 border-[var(--coffee-light)]/30 shadow-sm">
                    <div className="text-2xl mb-2">📍</div>
                    <div className="text-xs text-[var(--text-secondary)] font-bold tracking-wide mb-1">LOCATION</div>
                    <div className="text-sm text-[var(--coffee-dark)] font-semibold">City Center</div>
                  </div>
                  <div className="p-5 rounded-xl bg-white border-2 border-[var(--coffee-light)]/30 shadow-sm">
                    <div className="text-2xl mb-2">⏰</div>
                    <div className="text-xs text-[var(--text-secondary)] font-bold tracking-wide mb-1">HOURS</div>
                    <div className="text-sm text-[var(--coffee-dark)] font-semibold">Open Daily</div>
                  </div>
                  <div className="p-5 rounded-xl bg-white border-2 border-[var(--coffee-light)]/30 shadow-sm">
                    <div className="text-2xl mb-2">☕</div>
                    <div className="text-xs text-[var(--text-secondary)] font-bold tracking-wide mb-1">SPECIALTY</div>
                    <div className="text-sm text-[var(--coffee-dark)] font-semibold">Artisan Coffee</div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="mb-10">
                <div className="h-px bg-gradient-to-r from-transparent via-[var(--coffee-light)]/40 to-transparent" />
              </div>

              {/* Upvote section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-1">
                  <h2 className="font-['Crimson_Pro'] text-2xl font-bold text-[var(--coffee-dark)] mb-2">
                    Love this place?
                  </h2>
                  <p className="text-[var(--text-secondary)] font-semibold">
                    Share your appreciation and help others discover great coffee
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <UpvoteButton storeId={id} initialVotes={store.votes} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-20" />
        </div>
      </div>
    </div>
  );
}