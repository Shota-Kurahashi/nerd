import { seriesDocument } from "src/documents/series";
import { getSeriesPlaceHolder } from "src/features/series/utils";
import { GetSeriesQuery, GetSeriesQueryVariables } from "src/gql/graphql";
import { useGraphQL } from "src/hooks/useGraphQL";

type Args = {
  slug: string | string[] | null;
  series_title: string | string[] | null;
};

export const useQuerySeries = ({ slug, series_title }: Args) => {
  return useGraphQL<GetSeriesQuery, GetSeriesQueryVariables>({
    document: seriesDocument,
    variables: {
      series_id: typeof slug === "string" ? slug : "",
    },
    options: {
      enabled: !!slug && typeof slug === "string",
      placeholderData: () => getSeriesPlaceHolder(series_title, slug),
    },
  });
};
