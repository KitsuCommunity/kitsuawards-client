import * as Types from '../generated/graphql.js';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SubmitVoteMutationVariables = Types.Exact<{
  token: Types.Scalars['String'];
  nomineeid: Types.Scalars['Int'];
}>;


export type SubmitVoteMutation = { __typename?: 'Mutation', submitVote?: { __typename?: 'SubmitVotePayload', errors: Array<string>, vote?: { __typename?: 'Vote', id: number, date: string, nominee: { __typename?: 'Nominee', name: string, id: number } } | null | undefined } | null | undefined };


export const SubmitVoteDocument = gql`
    mutation SubmitVote($token: String!, $nomineeid: Int!) {
  submitVote(input: {token: $token, nomineeid: $nomineeid}) {
    vote {
      id
      nominee {
        name
        id
      }
      date
    }
    errors
  }
}
    `;

export function useSubmitVoteMutation() {
  return Urql.useMutation<SubmitVoteMutation, SubmitVoteMutationVariables>(SubmitVoteDocument);
};