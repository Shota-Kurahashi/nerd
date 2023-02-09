/* eslint-disable react/display-name */
// import { Title } from "@mantine/core";
// import Link from "next/link";
import React, { FC, memo } from "react";
// import { InviteTimer } from "./modules/InviteTimer";
// import { InviteTop } from "./modules/InviteTop";

// type Props = {
//   invite: GetInvitesQuery["invites"][0];
// };

export const InviteItem: FC = memo(() => (
  <li className="animate-fadeIn group relative block h-full w-full overflow-x-hidden rounded-md border-y border-x-0 border-t-0 border-solid border-gray-300 bg-white py-4 shadow transition-colors first:pt-0 hover:bg-slate-50">
    {/* <Link
      href={{
        pathname: `/categories/${invite.category}/${invite.id}`,
      }}
      className="absolute inset-0 rounded-md"
    />
    <div className="flex flex-col items-center justify-center rounded-md p-2 transition-colors  md:p-4">
      <div className="mx-auto mb-4 flex w-full flex-1 shrink flex-col items-center justify-center">
        <div className="mb-2 flex  w-full items-center justify-between">
          <InviteTop category={invite.category} user={invite.user} />
        </div>
        <Title className="text-2xl md:text-3xl">{invite.title}</Title>
      </div>
      <div className="w-full">
        <Title className="font-medium" order={4}>
          {invite.sub_title}
        </Title>
        <InviteTimer
          parent="post"
          invite_id={invite.id}
          start_time={invite.start_time}
        />
      </div>
    </div> */}
  </li>
));
