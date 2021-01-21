import gql from 'graphql-tag'
export const FETCH_RESULTS_QUERY = gql`
  query FetchResultsQuery($token: String) {
    results(token: $token)
  }
`