import LikeButton from "@/components/like-button";
import db from "@/lib/database";
import {
  unstable_cache as nextCache,
  revalidatePath,
  revalidateTag,
} from "next/cache";
import { HandThumbUpIcon } from "@heroicons/react/24/outline";
import getSession from "@/lib/session";
import { uploadComment as uploadCommentAction } from "./actions";
import { useFormState } from "react-dom";
import { useEffect } from "react";

const getTweet = async (postId: number) => {
  const tweet = await db.sMSToken.findUnique({
    where: {
      id: postId,
    },
    select: {
      content: true,
      user: {
        select: {
          username: true,
        },
      },
      _count: {
        select: {
          Like: true,
        },
      },
      Comment: {
        include: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
  return tweet;
};

const getCachedPost = nextCache(getTweet, ["post-detail"], {
  tags: ["post-detail"],
  revalidate: 60,
});

async function getLikeStatus(postId: number, userId: number) {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        sMSTokenId: postId,
        userId: userId,
      },
    },
  });
  const likeCount = await db.like.count({
    where: {
      sMSTokenId: postId,
    },
  });
  return {
    likeCount,
    isLiked: Boolean(isLiked),
  };
}

async function getCachedLikeStatus(postId: number) {
  const session = await getSession();
  const userId = session.id!;
  const cachedOperation = nextCache(
    (postId, userId) => getLikeStatus(postId, userId),
    ["product-like-status"],
    {
      tags: [`like-status-${postId}`],
    }
  );
  return cachedOperation(postId, userId);
}

async function uploadComment(data: any) {
  "use server";
  const session = await getSession();
  const { comment } = Object.fromEntries(data.entries());

  // 유저 존재 여부 확인
  const user = await db.user.findUnique({
    where: {
      id: session.id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const comments = await db.comment.create({
    data: {
      payload: comment,
      post: {
        connect: {
          id: Number(data.get("postId")),
        },
      },
      user: {
        connect: {
          id: session.id,
        },
      },
    },
    select: {
      id: true,
    },
  });
  revalidatePath(`/tweet/${data.get("postId")}`);
  return comments;
}

export default async function Comment({ params }: { params: { id: string } }) {
  const postId = Number(params.id);
  const { likeCount, isLiked } = await getCachedLikeStatus(postId);
  const tweet = await getCachedPost(postId);

  return (
    <div className="py-5 px-12 flex flex-col gap-3">
      <div className="border-2 border-blue-400 py-2 px-5 rounded-lg flex flex-col">
        <div className="border-b-2 py-2 font-bold">{tweet?.user.username}</div>
        <div className="py-5">{tweet?.content}</div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={postId} />
      </div>

      <div className="flex flex-col gap-2">
        {tweet?.Comment.map((comment, i) => (
          <div
            key={i}
            className="border-2 w-[60%] self-end py-1 px-2 rounded-xl border-blue-400"
          >
            <div className="font-bold border-b-2 py-1">
              {comment.user.username}
            </div>
            <div className="py-3">{comment.payload}</div>
          </div>
        ))}
      </div>

      <form
        action={uploadComment}
        method="post"
        className="flex-col flex gap-2"
      >
        <input type="hidden" name="postId" value={postId} />
        <input
          type="text"
          name="comment"
          className="border-2 w-full rounded-lg border-black py-1 px-2"
          required
        />
        <input
          type="submit"
          className="bg-blue-400 text-white w-full rounded-lg py-1 px-2"
        />
      </form>
    </div>
  );
}
