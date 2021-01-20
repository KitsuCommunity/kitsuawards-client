import gql from 'graphql-tag'
export const FETCH_DATA_QUERY = gql`
  query FetchDataQuery {
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