"use server";

import db from "@/lib/database";
import { z } from "zod";
import getSession from "@/lib/session";

const tweetSchema = z
  .string({
    required_error: "There should be a content",
  })
  .min(10, "It should be longer than 10 alphabets");

export async function uploadTweet(prevState: any, formData: FormData) {
  const tweet = formData.get("tweet");
  const session = await getSession();
  const result = tweetSchema.safeParse(tweet);
  if (!result.success) {
    return result.error.flatten();
  } else {
    await db.sMSToken.create({
      data: {
        title: "undefined",
        content: result.data,
        user: {
          connect: {
            id: session.id,
          },
        },
      },
    });
    return;
  }
}
