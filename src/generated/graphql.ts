import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

/** Categories information */
export type Category = {
    __typename?: 'Category';
    end: Scalars['String'];
    id: Scalars['Int'];
    name: Scalars['String'];
    start: Scalars['String'];
    subcategories?: Maybe<Array<Subcategory>>;
    url: Scalars['String'];
};

/** Judges information */
export type Judge = {
    __typename?: 'Judge';
    id: Scalars['Int'];
    userId: Scalars['ID'];
};

export type Mutation = {
    __typename?: 'Mutation';
    submitVote?: Maybe<SubmitVotePayload>;
};

export type MutationSubmitVoteArgs = {
    input: SubmitVoteInput;
};

/** Nominees information */
export type Nominee = {
    __typename?: 'Nominee';
    id: Scalars['Int'];
    judgesResults?: Maybe<Scalars['Int']>;
    media: Scalars['String'];
    name: Scalars['String'];
    subcategoryId: Scalars['Int'];
    usersResults?: Maybe<Scalars['Int']>;
};

/** Nominees information */
export type NomineeJudgesResultsArgs = {
    token?: InputMaybe<Scalars['String']>;
};

/** Nominees information */
export type NomineeUsersResultsArgs = {
    token?: InputMaybe<Scalars['String']>;
};

export type Query = {
    __typename?: 'Query';
    /** Get user's vote */
    fetchVote?: Maybe<Array<Vote>>;
    /** Show current year information */
    year: Array<Year>;
};

export type QueryFetchVoteArgs = {
    token?: InputMaybe<Scalars['String']>;
};

/** Subcategories information */
export type Subcategory = {
    __typename?: 'Subcategory';
    id: Scalars['Int'];
    name: Scalars['String'];
    nominees: Array<Nominee>;
};

/** Autogenerated input type of SubmitVote */
export type SubmitVoteInput = {
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: InputMaybe<Scalars['String']>;
    nomineeId: Scalars['Int'];
    token: Scalars['String'];
};

/** Autogenerated return type of SubmitVote. */
export type SubmitVotePayload = {
    __typename?: 'SubmitVotePayload';
    /** A unique identifier for the client performing the mutation. */
    clientMutationId?: Maybe<Scalars['String']>;
    errors: Array<Scalars['String']>;
    vote?: Maybe<Vote>;
};

/** Votes information */
export type Vote = {
    __typename?: 'Vote';
    date: Scalars['String'];
    id: Scalars['Int'];
    nominee: Nominee;
    userId: Scalars['Int'];
};

/** Year information */
export type Year = {
    __typename?: 'Year';
    categories: Array<Category>;
    description: Scalars['String'];
    end: Scalars['String'];
    id: Scalars['Int'];
    judges: Array<Judge>;
    showResults: Scalars['String'];
    start: Scalars['String'];
};

export const FetchJudges = gql`
    query FetchJudges {
        year {
            judges {
                id
                userId
            }
        }
    }
`;
