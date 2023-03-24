import * as Types from '../../types/graphql';

import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
export type GetSeasonWorksQueryVariables = Types.Exact<{
  season: Types.Scalars['String'];
  year: Types.Scalars['Int'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type GetSeasonWorksQuery = { __typename?: 'query_root', works: Array<{ __typename?: 'works', title: string, tid?: number | null, series_title: string, series_id?: string | null, id: number, has_episodes?: boolean | null, episodes: Array<{ __typename?: 'episodes', title: string, start_time?: any | null, number: number, id: any, has_prev_episode: boolean, has_next_episode: boolean, end_time?: any | null }> }> };

export type SearchWorksQueryVariables = Types.Exact<{
  search: Types.Scalars['String'];
  limit?: Types.InputMaybe<Types.Scalars['Int']>;
}>;


export type SearchWorksQuery = { __typename?: 'query_root', search_works: Array<{ __typename?: 'works', id: number, title: string, series_title: string, has_episodes?: boolean | null, series_id?: string | null }> };


export const GetSeasonWorksDocument = `
    query GetSeasonWorks($season: String!, $year: Int!, $limit: Int) {
  works(
    where: {_and: {season_year: {_eq: $year}, season_name: {_eq: $season}, has_episodes: {_eq: true}}}
    limit: $limit
  ) {
    title
    tid
    series_title
    series_id
    id
    has_episodes
    episodes(order_by: {number: desc_nulls_last}, limit: 8) {
      title
      start_time
      number
      id
      has_prev_episode
      has_next_episode
      end_time
    }
  }
}
    `;
export const useGetSeasonWorksQuery = <
      TData = GetSeasonWorksQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: GetSeasonWorksQueryVariables,
      options?: UseQueryOptions<GetSeasonWorksQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetSeasonWorksQuery, TError, TData>(
      ['GetSeasonWorks', variables],
      fetcher<GetSeasonWorksQuery, GetSeasonWorksQueryVariables>(client, GetSeasonWorksDocument, variables, headers),
      options
    );
useGetSeasonWorksQuery.fetcher = (client: GraphQLClient, variables: GetSeasonWorksQueryVariables, headers?: RequestInit['headers']) => fetcher<GetSeasonWorksQuery, GetSeasonWorksQueryVariables>(client, GetSeasonWorksDocument, variables, headers);
export const SearchWorksDocument = `
    query SearchWorks($search: String!, $limit: Int) {
  search_works(args: {search: $search, _limit: $limit}) {
    id
    title
    series_title
    has_episodes
    series_id
  }
}
    `;
export const useSearchWorksQuery = <
      TData = SearchWorksQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: SearchWorksQueryVariables,
      options?: UseQueryOptions<SearchWorksQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<SearchWorksQuery, TError, TData>(
      ['SearchWorks', variables],
      fetcher<SearchWorksQuery, SearchWorksQueryVariables>(client, SearchWorksDocument, variables, headers),
      options
    );
useSearchWorksQuery.fetcher = (client: GraphQLClient, variables: SearchWorksQueryVariables, headers?: RequestInit['headers']) => fetcher<SearchWorksQuery, SearchWorksQueryVariables>(client, SearchWorksDocument, variables, headers);