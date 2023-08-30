import { Term, TrendingTime } from "src/features/trends/types";
import { GetTrendsQueryVariables } from "src/gql/graphql";

export const getTrendsTime = (): TrendingTime => {
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
  const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const shortTerm: Term = {
    from: fiveMinutesAgo.toISOString(),
    to: now.toISOString(),
  };

  const midTerm: Term = {
    from: thirtyMinutesAgo.toISOString(),
    to: now.toISOString(),
  };

  const longTerm: Term = {
    from: oneDayAgo.toISOString(),
    to: now.toISOString(),
  };

  return {
    shortTerm,
    midTerm,
    longTerm,
  };
};

export const getTrendsVariables = (): GetTrendsQueryVariables => {
  const { shortTerm, midTerm, longTerm } = getTrendsTime();

  return {
    limit: 10,
    short_term_from: shortTerm.from,
    short_term_to: shortTerm.to,
    mid_term_from: midTerm.from,
    mid_term_to: midTerm.to,
    long_term_from: longTerm.from,
    long_term_to: longTerm.to,
  };
};
