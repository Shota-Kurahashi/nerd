import { SsgError } from "src/components/Elements/Error/items/SsgError";
import { BasicLayout } from "src/components/Layouts/BasicLayout";
import {
  getSeasonWorks,
  getTodayEpisodes,
  getWeeklyWorks,
} from "src/features/lists/api/router";
import { Nerd } from "src/features/pages/nerd";

import { InternalServerError } from "src/libs/error";
import { Meta } from "src/libs/meta";
import { NextSSG, NextSSGPage, TopPage } from "src/libs/next/types";

const Page: NextSSGPage<TopPage> = ({ data, error }) =>
  error ? <SsgError /> : <Nerd {...data} />;

Page.getLayout = BasicLayout;
Page.getTitle = Meta(() => "Nerd");

export default Page;

export const getStaticProps: NextSSG<TopPage> = async () => {
  const todayData = await getTodayEpisodes();
  const seasonData = await getSeasonWorks(12);
  const weeklyData = await getWeeklyWorks(12);
  const buildDate = new Date().toLocaleDateString("ja-JP", {
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
    hour: "numeric",
    minute: "numeric",
  });

  const isNotRegistered = todayData.episodes.some(
    (episode) => episode.start_time === null
  );

  const registeredError = isNotRegistered
    ? new InternalServerError().throwMessage()
    : null;

  return {
    props: {
      data: {
        todayData,
        seasonData,
        weeklyData,
        buildDate: `${buildDate}`,
        registeredError,
      },
      error: null,
    },
  };
};
