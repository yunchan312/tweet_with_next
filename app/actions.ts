"use server";

import db from "@/lib/database";

export async function getMoreTweet(page: number) {
  const tweets = await db.sMSToken.findMany({
    select: {
      content: true,
      id: true,
      user: {
        select: {
          avatar: true,
          email: true,
          username: true,
        },
      },
    },
    skip: page * 1,
    take: 1,
  });
  return tweets;
}
