import * as Types from '../generated/graphql';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type CategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', year: Array<{ __typename?: 'Year', categories: Array<{ __typename?: 'Category', name: string, url: string, start: string, end: string, subcategories?: Array<{ __typename?: 'Subcategory', name: string, id: number, nominees: Array<{ __typename?: 'Nominee', id: number, name: string, media: string }> }> | null | undefined }> }> };

export type CategoryFragment = { __typename?: 'Category', name: string, url: string, start: string, end: string, subcategories?: Array<{ __typename?: 'Subcategory', name: string, id: number, nominees: Array<{ __typename?: 'Nominee', id: number, name: string, media: string }> }> | null | undefined };

export type SubcategoryFragment = { __typename?: 'Subcategory', name: string, id: number, nominees: Array<{ __typename?: 'Nominee', id: number, name: string, media: string }> };

export type NomineeFragment = { __typename?: 'Nominee', id: number, name: string, media: string };

export const NomineeFragmentDoc = gql`
    fragment Nominee on Nominee {
  id
  name
  media
}
    `;
export const SubcategoryFragmentDoc = gql`
    fragment Subcategory on Subcategory {
  name
  id
  nominees {
    ...Nominee
  }
}
    ${NomineeFragmentDoc}`;
export const CategoryFragmentDoc = gql`
    fragment Category on Category {
  name
  url
  start
  end
  subcategories {
    ...Subcategory
  }
}
    ${SubcategoryFragmentDoc}`;
export const CategoriesDocument = gql`
    query Categories {
  year {
    categories {
      ...Category
    }
  }
}
    ${CategoryFragmentDoc}`;

export function useCategoriesQuery(options: Omit<Urql.UseQueryArgs<CategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CategoriesQuery>({ query: CategoriesDocument, ...options });
};