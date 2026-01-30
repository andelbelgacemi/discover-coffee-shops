'use client';

export default function Banner({ onSearch }: { onSearch: () => void }) {
  return (
    <div className="mb-6 text-center">
      <h1 className="text-4xl font-bold">Coffee Connaisseur</h1>
      <p className="mt-2 text-gray-600">
        Find the best coffee shops around you
      </p>

      <button
        onClick={() => {
          console.log("SEARCH CLICKED"); // 👈 IMPORTANT
          onSearch();
        }}
        className="mt-4 rounded bg-indigo-600 px-6 py-2 text-white"
      >
        Search
      </button>
    </div>
  );
}
