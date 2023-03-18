import { HandThumbDownIcon, HeartIcon } from "@heroicons/react/24/outline";
import React, { FC, Suspense, useRef } from "react";
import { Replies } from "./Replies";
import { Avatar } from "src/components/Elements/Avatar";
import { Button } from "src/components/Elements/Button";
import { Loader } from "src/components/Elements/Loader/Loader";
import { Text } from "src/components/Elements/Text";
import { Comment as TypeComment } from "src/features/comments/types";
import { formatTimeDistance } from "src/features/timer/utils/timeProcessing";

type Props = {
  comment: TypeComment;
};

export const Comment: FC<Props> = ({ comment }) => {
  const content = useRef<HTMLParagraphElement>(null);

  return (
    <li className="flex w-full animate-comment">
      <figure className="m-0 mr-2">
        <Avatar user_id={comment.user?.id} user_name={comment.commenter_name} />
      </figure>
      <div className="max-w-[calc(100%-46px)] flex-1">
        <Text className="font-bold" ff="Hiragino Sans" size="xs">
          {comment.commenter_name}
        </Text>
        <p
          ref={(comment.reply_count ?? -1) > 0 ? content : null}
          className=" scroll-mt-20 break-words py-1 font-hiragino-sans text-base lg:scroll-mt-10"
        >
          {comment.content} lorem
        </p>
        <Text
          className="flex items-center space-x-1 text-dimmed"
          component="div"
          ff="Hiragino Sans"
          size="xs"
        >
          <span>{formatTimeDistance(comment.created_at)}</span>
          <Button className="border-none p-0 text-sm text-black">返信</Button>
          <div className="flex items-center">
            <HeartIcon className="h-5 w-5" />
            <span>1</span>
          </div>
          <div className="flex items-center">
            <HandThumbDownIcon className="h-5 w-5" />
            <span>100</span>
          </div>
        </Text>
        <Suspense
          fallback={
            <div className="mt-1 flex w-full">
              <Loader className="mx-auto" variant="dots" />
            </div>
          }
        >
          <Replies
            content={content}
            reply_count={comment.reply_count || 0}
            reply_id={comment.id}
          />
        </Suspense>
      </div>
    </li>
  );
};
