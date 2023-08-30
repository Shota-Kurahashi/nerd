import { gql } from "graphql-request";

export const GET_TRENDING_CHATS_EPISODES = gql`
  query GetTrendingChatsEpisodes(
    $limit: Int!
    $short_term_from: timestamptz!
    $short_term_to: timestamptz!
    $mid_term_from: timestamptz!
    $mid_term_to: timestamptz!
    $long_term_from: timestamptz!
    $long_term_to: timestamptz!
  ) {
    trending_chat_episodes(args: { _limit: $limit }) {
      short_term_chats: chats_aggregate(
        where: { created_at: { _gte: $short_term_from, _lte: $short_term_to } }
      ) {
        aggregate {
          count
        }
      }
      mid_term_chats: chats_aggregate(
        where: { created_at: { _gte: $mid_term_from, _lte: $mid_term_to } }
      ) {
        aggregate {
          count
        }
      }
      long_term_chats: chats_aggregate(
        where: { created_at: { _gte: $long_term_from, _lte: $long_term_to } }
      ) {
        aggregate {
          count
        }
      }
    }
  }
`;
