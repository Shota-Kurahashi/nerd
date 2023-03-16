import { useInfiniteQuery } from "@tanstack/react-query";
import { useGetCommentsQuery } from "src/graphql/comment/commentQuery.generated";

import { client } from "src/libs/graphqlClient";

type GetFinishCommentsArgs = {
  episode_id: string;
  pageParam: {
    cursor: string;
  };
};

const InitialPageParam = {
  cursor: new Date().toISOString(),
};

export const getComments = async ({
  episode_id,
  pageParam,
}: GetFinishCommentsArgs) => {
  const { cursor } = pageParam;

  const fetcher = useGetCommentsQuery.fetcher(client, {
    episode_id,
    cursor,
    limit: 100,
  });

  const data = await fetcher();

  return data;
};

export const useInfiniteQueryComments = (episode_id: string) =>
  useInfiniteQuery({
    queryKey: ["comments", { episode_id }],
    queryFn: ({ pageParam = InitialPageParam }) =>
      getComments({
        episode_id,
        pageParam,
      }),
    getNextPageParam: (lastPage) => {
      const lastFinishComments = lastPage.comments.at(-1);
      if (!lastFinishComments || lastPage.comments.length < 100)
        return undefined;

      return {
        cursor: lastFinishComments?.created_at,
      };
    },
    suspense: true,
    enabled: !!episode_id,
  });
