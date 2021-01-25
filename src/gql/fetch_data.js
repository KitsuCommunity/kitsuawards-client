import gql from 'graphql-tag'
export const FETCH_DATA_QUERY = gql`
  query FetchDataQuery($token: String!) {
	year {
        start
        end
        showResults
        description
        categories {
          name
          url
          start
          end
          subcategories {
            name
            id
            nominees {
              id
              name
              media
              judgesResults(token: $token)
              usersResults(token: $token)
            }
          }
        }
        judges {
          id
          userId
        }
      }
  }
`