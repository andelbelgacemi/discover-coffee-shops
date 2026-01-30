"use client";

import { useEffect, useState, useTransition } from "react";
import { upvoteStore } from "../actions/upvoteStore";

export default function UpvoteButton({
  storeId,
  initialVotes,
}: {
  storeId: string;
  initialVotes: number;
}) {
  const [votes, setVotes] = useState(initialVotes);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setVotes(initialVotes);
  }, [initialVotes]);

  return (
    <button
      onClick={() =>
        startTransition(async () => {
          setVotes((v) => v + 1);
          await upvoteStore(storeId);
        })
      }
      disabled={isPending}
      className="flex items-center gap-3 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
    >
      👍 Upvote
      <span className="rounded bg-white/20 px-2 py-1 text-sm">
        {votes}
      </span>
    </button>
  );
}
