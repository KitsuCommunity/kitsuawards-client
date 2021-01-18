import gql from 'graphql-tag'
export const VOTE_MUTATION = gql`
mutation submitVote($token: String!, $nomineeid: Int!) {
    submitVote(
        input: {
        token: $token,
        nomineeid: $nomineeid
        }
    ) {
      vote {
        id
      }
      errors
    }
}
`