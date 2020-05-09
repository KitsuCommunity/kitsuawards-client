import gql from 'graphql-tag'
export const FETCH_DATA_QUERY = gql`
  query FetchDataQuery {
	year {
        start
        end
        description
        categories {
          name
          url
          subcategories {
            name
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