import gql from 'graphql-tag'
export const FETCH_VOTE_QUERY = gql`
  query FetchVoteQuery($token: String!) {
    fetchvote(token: $token) {
        nominee {
          id
          subcategoryId
        }
      }
  }
`