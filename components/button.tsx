"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
  direction?: string;
}

export default function Button({ text, direction }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      {direction ? (
        <Link href={`/${direction}`}>
          <button
            disabled={pending}
            className="button disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
          >
            {pending ? "Loading..." : text}
          </button>
        </Link>
      ) : (
        <button
          disabled={pending}
          className="button disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"
        >
          {pending ? "Loading..." : text}
        </button>
      )}
    </>
  );
}
