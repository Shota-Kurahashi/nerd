import React, { FC } from "react";
import { Header } from "src/components/dynamic/common/header";
import { Menu } from "src/components/dynamic/common/menu";
import { Nav } from "src/components/dynamic/common/nav";
import { Timer } from "src/components/dynamic/common/timer";
import { WorkChatInput } from "src/features/chats/components/WorkChatInput";
import { WorkCommentInput } from "src/features/comments/components/WorkCommentInput";
import { CommentsFilter } from "src/features/comments/types";

import { WorkMenu } from "src/features/works/components/WorkMenu";
import { GetWorkQuery } from "src/graphql/work/workQuery.generated";

type Props = {
  isChat: boolean;
  setIsChat: React.Dispatch<React.SetStateAction<boolean>>;
  data?: GetWorkQuery;
  filter: CommentsFilter;
};

export const Aside: FC<Props> = ({ isChat, setIsChat, data, filter }) => {
  return (
    <aside className="sticky top-8 hidden h-[calc(100dvh-65px)] w-[28rem] shrink-0 flex-col gap-4 overflow-y-auto bg-white/20 pt-10 lg:flex">
      {/* PC Design */}

      <div className=" rounded-2xl bg-white/60 pb-4  shadow-lg ring-1 ring-gray-900/5">
        <Header
          id={data?.works_by_pk?.id}
          title={data?.works_by_pk?.series_title}
        />
        <Nav isChat={isChat} response="lg" setIsChat={setIsChat} />
      </div>
      <div className="rounded-2xl bg-white/60 p-4 shadow-lg ring-1 ring-gray-900/5 ">
        <Menu />
      </div>
      <div className="rounded-2xl bg-white/60 p-4 shadow-lg ring-1 ring-gray-900/5 ">
        <Timer />
      </div>
      <div className="rounded-2xl bg-white/60 p-4 shadow-lg ring-1 ring-gray-900/5 ">
        <WorkMenu data={data} />
      </div>

      <div className=" sticky bottom-0 h-max w-full rounded-t-2xl bg-white p-4 shadow-lg ring-1  ring-gray-900/5 ">
        {isChat ? (
          <WorkChatInput work_id={data?.works_by_pk?.id ?? 0} />
        ) : (
          <WorkCommentInput
            filter={filter}
            work_id={data?.works_by_pk?.id ?? 0}
          />
        )}
      </div>
    </aside>
  );
};
