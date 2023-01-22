# Kitsu Anime Awards Client

To start in development run

```sh
npm start
```

To build graphql stuff run

```sh
npm install -g get-graphql-schema # first time only
get-graphql-schema "https://api.kitsuawards.com/graphql" --json > graphql.schema.json # when schema has updated
npm run gql
```

To build run

```sh
npm run build
```

For best configurations, you should add plugins Stylus and Stylelint to your text editor. You should set Stylelint to format .css files for this project.
