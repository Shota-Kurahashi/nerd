import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { client } from "src/libs/graphqlClient";

export function useGraphQL<TResult, TVariables>({
  document,
  options,
  variables,
}: {
  document: TypedDocumentNode<TResult, TVariables>;
  options?: Omit<UseQueryOptions<TResult>, "queryKey">;
  variables: TVariables extends Record<string, never> ? undefined : TVariables;
}): UseQueryResult<TResult> {
  return useQuery({
    ...options,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    queryKey: [(document.definitions[0] as any).name.value, variables],
    queryFn: async ({ queryKey }) =>
      client.request(document, queryKey[1] ? queryKey[1] : undefined),
  });
}
