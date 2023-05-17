import { Args, PartialStoryFn } from "@storybook/csf";
import { ReactRenderer, StoryObj } from "@storybook/react";
import {
  BasicLayout,
  BasicLayoutOnlyHeader,
  BasicListLayout,
} from "src/components/Layouts/BasicLayout";

export const BasicLayoutDecorator = (
  Story: PartialStoryFn<ReactRenderer, Args>
) => BasicLayout(<Story />);

export const BasicLayoutOnlyHeaderDecorator = (
  Story: PartialStoryFn<ReactRenderer, Args>
) => BasicLayoutOnlyHeader(<Story />);

export const BasicListLayoutDecorator = (
  Story: PartialStoryFn<ReactRenderer, Args>
) => BasicListLayout(<Story />);

// tailwind cssのbreakPointに合わせる

const spViewport = {
  name: "sp",
  styles: {
    width: "320px",
    height: "100%",
  },
};

const smViewport = {
  name: "sm",
  styles: {
    width: "640px",
    height: "100%",
  },
};

const mdViewport = {
  name: "md",
  styles: {
    width: "768px",
    height: "100%",
  },
};

const lgViewport = {
  name: "lg",
  styles: {
    width: "1024px",

    height: "100%",
  },
};

const xlViewport = {
  name: "xl",
  styles: {
    width: "1280px",
    height: "100%",
  },
};

const xxlViewport = {
  name: "2xl",
  styles: {
    width: "1536px",
    height: "100%",
  },
};

const viewports = {
  sp: spViewport,
  sm: smViewport,
  md: mdViewport,
  lg: lgViewport,
  xl: xlViewport,
  "2xl": xxlViewport,
};

export const TailwindStory: StoryObj = {
  parameters: {
    viewport: {
      viewports,
    },
  },
};
