
import gql from 'graphql-tag';
import * as Urql from 'urql';

import * as Types from '../generated/graphql.js';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type FetchVoteQueryVariables = Types.Exact<{
  token?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type FetchVoteQuery = { __typename?: 'Query', fetchVote?: Array<{ __typename?: 'Vote', nominee: { __typename?: 'Nominee', id: number, name: string } }> | null | undefined };


export const FetchVoteDocument = gql`
    query FetchVote($token: String) {
  fetchVote(token: $token) {
    nominee {
      id
      name
    }
  }
}
    `;

export function useFetchVoteQuery(options?: Omit<Urql.UseQueryArgs<FetchVoteQueryVariables>, 'query'>) {
  return Urql.useQuery<FetchVoteQuery, FetchVoteQueryVariables>({ query: FetchVoteDocument, ...options });
}