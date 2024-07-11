"use client";

import { InitialListsProps } from "@/app/page";
import TweetBox from "./tweetBox";
import { useState } from "react";
import { getMoreTweet } from "@/app/actions";

interface InitialLists {
  initialLists: InitialListsProps;
}

export default function TweetLists({ initialLists }: InitialLists) {
  const [tweets, setTweets] = useState(initialLists);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const onLoadMore = async () => {
    const newTweets = await getMoreTweet(page + 1);
    if (newTweets.length > 0) {
      setPage((prev) => prev + 1);
      setTweets((prev) => [...prev, ...newTweets]);
    } else {
      setIsLastPage(true);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {tweets.map((tweet) => (
        <TweetBox key={tweet.id} tweet={tweet} />
      ))}
      {isLastPage ? null : (
        <button onClick={onLoadMore} className="button">
          더보기
        </button>
      )}
    </div>
  );
}
