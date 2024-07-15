"use client";

import { useFormState } from "react-dom";
import { uploadTweet } from "./actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTweet() {
  const [state, action] = useFormState(uploadTweet, null);
  const router = useRouter();

  return (
    <>
      <form action={action} className="w-full">
        <textarea
          name="tweet"
          className="border-4 rounded-lg h-32 border-black resize-none py-2 px-1 w-full outline-none"
          placeholder="Write your Tweet🐦"
        />
        <span className="text-red-400">{state?.formErrors[0]}</span>
        <input type="submit" value="Tweet" className="button" />
      </form>
    </>
  );
}
