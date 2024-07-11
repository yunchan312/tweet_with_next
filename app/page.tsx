import TweetLists from "@/components/tweet-lists";
import TweetBox from "@/components/tweetBox";
import db from "@/lib/database";
import { Prisma } from "@prisma/client";

const getTweets = async () => {
  const tweets = await db.sMSToken.findMany({
    select: {
      content: true,
      id: true,
      user: {
        select: {
          username: true,
          avatar: true,
          email: true,
        },
      },
    },
    take: 1,
  });
  return tweets;
};

export type InitialListsProps = Prisma.PromiseReturnType<typeof getTweets>;

export default async function Home() {
  const tweets = await getTweets();
  return (
    <div className="container">
      <div className="pageTitle">Home</div>
      <TweetLists initialLists={tweets} />
    </div>
  );
}
