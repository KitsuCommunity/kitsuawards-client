
import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from '../../generated/graphql.js';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type FetchJudgesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type FetchJudgesQuery = { __typename?: 'Query', year: Array<{ __typename?: 'Year', judges: Array<{ __typename?: 'Judge', id: number, userId: string }> }> };


export const FetchJudgesDocument = gql`
    query FetchJudges {
  year {
    judges {
      id
      userId
    }
  }
}
    `;

export function useFetchJudgesQuery(options?: Omit<Urql.UseQueryArgs<FetchJudgesQueryVariables>, 'query'>) {
  return Urql.useQuery<FetchJudgesQuery, FetchJudgesQueryVariables>({ query: FetchJudgesDocument, ...options });
}