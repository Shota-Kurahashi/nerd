import { ArrowSmallLeftIcon } from "@heroicons/react/24/outline";
import { ActionIcon, Text, Title } from "@mantine/core";
import dynamic from "next/dynamic";

import { useRouter } from "next/router";
import React, { FC, Suspense, useState } from "react";
import { EpisodeMenuSkelton } from "src/components/Layout/loading/EpisodeMenuSkelton";
import { EpisodeSkelton } from "src/components/Layout/loading/EpisodeSkelton";
import { usePrefetchFinishEpisode } from "src/features/comments/api/usePrefetchFinishEpisode";
import ChatComments from "src/features/comments/components/ChatComments";
import FinishComments from "src/features/comments/components/FinishComments";

import { useQueryEpisode } from "src/features/episodes/api/useQueryEpisode";
import { CountUpTimer } from "src/features/timer/components/CountUpTImer";

const DynamicEpisodeMenu = dynamic(
  () =>
    import("src/features/episodes/components/EpisodeMenu").then(
      (mod) => mod.EpisodeMenu
    ),
  {
    ssr: false,
    loading: () => <EpisodeMenuSkelton />,
  }
);

export const Episode: FC = () => {
  const router = useRouter();
  const { slug, episode } = router.query;
  const { data, isLoading } = useQueryEpisode(slug, episode);
  const [isChat, setIsChat] = useState(true);
  const prefetchFinishComments = usePrefetchFinishEpisode();

  if (isLoading) {
    return <EpisodeSkelton />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container contents lg:mx-auto lg:flex">
        <div className="sticky top-0 contents h-full flex-1 pb-16 lg:block lg:max-h-screen lg:overflow-y-auto">
          <header className="container mx-auto mb-2 flex flex-col p-6 pb-0">
            <div className="flex w-full flex-1  flex-col gap-2">
              <Title ff="Hiragino Sans" className=" text-base md:text-lg">
                {data?.episodes_by_pk?.work.series_title}
              </Title>
              <Text component="div" className="flex">
                <Text
                  component="p"
                  ff="Hiragino Sans"
                  className="mr-2 text-sm md:text-base"
                >
                  第{data?.episodes_by_pk?.number}話
                </Text>
                <Text
                  component="p"
                  ff="Hiragino Sans"
                  className="flex-1 text-sm md:text-base"
                >
                  {data?.episodes_by_pk?.title}
                </Text>
              </Text>
            </div>
            <div className="mx-auto mt-3 flex max-w-max flex-col">
              <Text
                color="indigo"
                className="m-0 mx-auto mb-1.5 px-10 text-sm font-bold md:text-base"
              >
                開始から
              </Text>
              <CountUpTimer episodeId={data?.episodes_by_pk?.id} />
            </div>
          </header>
          <nav className="sticky top-0 z-10 flex h-10 items-center justify-between border-0 border-b border-solid border-b-slate-200 bg-white px-2 lg:h-auto lg:border-none">
            <div className="container mx-auto flex items-center justify-between lg:flex-col lg:items-stretch ">
              <div className="flex flex-1 items-center justify-between border-0 border-solid  border-slate-200 after:h-7 after:w-7 after:content-['']">
                <ActionIcon
                  color="dark"
                  onClick={() => router.back()}
                  variant="transparent"
                >
                  <ArrowSmallLeftIcon className="h-6 w-6" />
                </ActionIcon>
                <ul className=" flex h-full flex-1 items-center justify-around">
                  <Text
                    onClick={() => setIsChat(true)}
                    color="indigo"
                    component="li"
                    className={`inline-block cursor-pointer  py-2 text-sm font-bold md:text-base ${
                      isChat
                        ? "border-0 border-b-2 border-solid border-indigo-500"
                        : "border-none"
                    }`}
                  >
                    チャット
                  </Text>
                  <Text
                    onMouseEnter={() =>
                      prefetchFinishComments(data?.episodes_by_pk?.id)
                    }
                    onTouchStart={() =>
                      prefetchFinishComments(data?.episodes_by_pk?.id)
                    }
                    onClick={() => setIsChat(false)}
                    color="indigo"
                    component="li"
                    className={`inline-block cursor-pointer py-2 text-sm font-bold md:text-base ${
                      !isChat
                        ? "border-0 border-b-2 border-solid border-indigo-500"
                        : "border-none"
                    }`}
                  >
                    コメント
                  </Text>
                </ul>
              </div>

              <DynamicEpisodeMenu
                episodeTitle={data?.episodes_by_pk?.title}
                episodeNumber={data?.episodes_by_pk?.number}
                workTitle={data?.episodes_by_pk?.work.series_title}
                nextEpisodeId={data?.episodes_by_pk?.next_episode_id}
              />
            </div>
          </nav>
        </div>
        <main className="flex flex-1 flex-col lg:w-[36rem] lg:flex-none lg:pb-16">
          <div className="container mx-auto mb-16 flex flex-1  lg:contents">
            {isChat ? (
              <Suspense fallback={<div>Loading...</div>}>
                <ChatComments episode_id={data?.episodes_by_pk?.id} />
              </Suspense>
            ) : (
              <Suspense fallback={<div>Loading...</div>}>
                <FinishComments episode_id={data?.episodes_by_pk?.id} />
              </Suspense>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
