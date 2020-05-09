import gql from 'graphql-tag'
export const GET_CREATION_QUERY = gql`
    query FetchData() {
        {
            year {
            start
            end
            categories {
              name
              subcategories {
                name
                nominees {
                  name
                  media
                }
              }
            }
            judges {
              userId
            }
          }
        }
    }
`