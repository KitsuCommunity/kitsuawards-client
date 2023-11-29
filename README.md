# Kitsu Anime Awards Client

This is the web client for the Kitsu Anime Awards which lets you vote for your favourite anime of the year in the annual Kitsu Anime Awards

## Getting Started

To start in development run

```sh
npm start
```

To build graphql stuff run

```sh
npm install -g get-graphql-schema # first time only
get-graphql-schema "https://api.kitsuawards.com/graphql" --json > graphql.schema.json # when schema has updated
                    #^ Or use the localhost url if you're running the server locally
npm run gql
```

To build run

```sh
npm run build
```
