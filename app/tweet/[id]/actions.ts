"use server";

import db from "@/lib/database";
import getSession from "@/lib/session";
import { revalidatePath, revalidateTag } from "next/cache";
import { FormEvent } from "react";

export async function likePost(postId: number) {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        sMSTokenId: postId,
        userId: session.id!,
      },
    });
    revalidatePath(`/tweet/${postId}`);
  } catch (e) {}
}

export async function dislikePost(postId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          sMSTokenId: postId,
          userId: session.id!,
        },
      },
    });
    revalidatePath(`/tweet/${postId}`);
  } catch (e) {}
}

export async function uploadComment(formDate: FormData, prevData: null) {
  const session = await getSession();
  const comments = await db.comment.create({
    data: {
      payload: "asdf",
      user: {
        connect: {
          id: session.id,
        },
      },
      post: {
        connect: {
          id: session.id,
        },
      },
    },
  });
}
