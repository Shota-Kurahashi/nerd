import { gql } from "graphql-request";

export const GET_RANKING = gql`
  query GetRanking {
    works_all_ranking(args: { _limit: 5 }) {
      ...WorkFragment
      comments_aggregate {
        aggregate {
          count
        }
      }
      episodes(limit: 1, order_by: { comments_aggregate: { count: desc } }) {
        ...RankingEpisodeFragment
      }
    }
  }
`;
