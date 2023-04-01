import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueryEpisode } from "src/features/episodes/api/useQueryEpisode";
import { useTimerState } from "src/features/timer/store/timerStore";

export const useLive = () => {
  const router = useRouter();
  const { slug, episode } = router.query;
  const { data, isLoading, isPlaceholderData } = useQueryEpisode(slug, episode);
  const [isChat, setIsChat] = useState(true);
  const interval = useTimerState((state) => state.interval);
  const [isCountDown, setIsCountDown] = useState(true);

  useEffect(() => {
    if (!isCountDown) {
      interval.start();
    }

    return () => {
      interval.reset();
    };
    //! eslint-disable-next-line react-hooks/exhaustive-deps
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isCountDown]);

  return {
    data,
    isLoading,
    isChat,
    setIsChat,
    isPlaceholderData,
    isCountDown,
    setIsCountDown,
  };
};
