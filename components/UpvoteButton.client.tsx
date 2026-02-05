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
  const [justVoted, setJustVoted] = useState(false);

  useEffect(() => {
    setVotes(initialVotes);
  }, [initialVotes]);

  const handleVote = () => {
    startTransition(async () => {
      setVotes((v) => v + 1);
      setJustVoted(true);
      await upvoteStore(storeId);
      setTimeout(() => setJustVoted(false), 600);
    });
  };

  return (
    <button
      onClick={handleVote}
      disabled={isPending}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-r from-[var(--coffee-dark)] to-[var(--coffee-rich)] px-8 py-4 text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
        justVoted ? 'animate-bounce' : ''
      }`}
    >
      <div className="relative z-10 flex items-center gap-4">
        <span className="text-2xl transition-transform group-hover:scale-110">
          👍
        </span>
        <div className="text-left">
          <div className="font-bold text-sm tracking-wide">UPVOTE</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-px w-8 bg-white/60" />
            <span className="text-xl font-bold tabular-nums">
              {votes}
            </span>
          </div>
        </div>
      </div>
      
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
    </button>
  );
}