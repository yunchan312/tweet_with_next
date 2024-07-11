import TweetBox from "@/components/tweetBox";
import db from "@/lib/database";
import { UserIcon } from "@heroicons/react/16/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getDetail(id: number) {
  const tweet = await db.sMSToken.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          email: true,
          avatar: true,
        },
      },
    },
  });
  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const tweet = await getDetail(id);
  if (!tweet) {
    notFound();
  }
  return (
    <div className="container">
      <div className="pageTitle">Detail</div>
      <div className="flex flex-col gap-2 p-3 w-full rounded-lg border-4 border-blue-400">
        <div className="w-full text-lg rounded-lg flex gap-2 items-center">
          {tweet.user.avatar ? (
            <div className="size-6 rounded-full overflow-hidden">
              <Image alt="avatar" fill src={tweet.user.avatar} />
            </div>
          ) : (
            <div className="size-7 rounded-full bg-blue-400">
              <UserIcon className="text-white" />
            </div>
          )}
          <div className="flex gap-1">
            <div>{tweet.user.username}</div>
            <div className="pb-1 self-end text-neutral-400 underline-offset-1 underline text-[12px]">
              {tweet.user.email}
            </div>
          </div>
        </div>
        <div className="border-[1px]" />
        <div className="w-full rounded-lg min-h-12">{tweet.content}</div>
      </div>
    </div>
  );
}
