import { LiveTimer } from "src/features/timer/types";
import { timeToSecond } from "src/features/timer/utils/timeProcessing";

type Result = {
  color: "bg-indigo-500" | "bg-red-500" | "bg-green-500" | "bg-blue-500";
  text: "開始" | "再生" | "一時停止" | "変更" | "終了";
};

type Props = {
  mode: "up" | "down";
  isChangeTime: boolean;
  time: LiveTimer["time"];
  downInitialTime: LiveTimer["time"];
  active: boolean;
};

export const getTimeButton = ({
  mode,
  isChangeTime,
  downInitialTime,
  active,
  time,
}: Props): Result => {
  if (isChangeTime) {
    return {
      color: "bg-green-500",
      text: "変更",
    };
  }

  if (active) {
    return {
      color: "bg-red-500",
      text: "一時停止",
    };
  }

  if (mode === "up") {
    const { hours, seconds, minutes } = time;

    if (hours === 0 && seconds === 0 && minutes === 0) {
      return {
        color: "bg-blue-500",
        text: "開始",
      };
    }

    return {
      color: "bg-indigo-500",
      text: "再生",
    };
  }

  if (mode === "down") {
    if (timeToSecond(downInitialTime) === timeToSecond(time)) {
      return {
        color: "bg-blue-500",
        text: "開始",
      };
    }

    if (timeToSecond(time) === 0) {
      return {
        color: "bg-red-500",
        text: "終了",
      };
    }

    return {
      color: "bg-indigo-500",
      text: "再生",
    };
  }

  return {
    color: "bg-red-500",
    text: "終了",
  };
};
