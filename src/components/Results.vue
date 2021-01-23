<template>
        <b-tabs type="is-toggle-rounded">
            <b-tab-item v-for="category in this.data[0].categories" :key='category.id' :label="category.name">
              <div v-for="subcategory in category.subcategories" :key="subcategory.id">
                <h1>{{ subcategory.name }}</h1>
                <div>
                  <div>
                    <h1>Users</h1>
                    <div v-for="nominee in subcategory.nominees" :key="nominee.id">
                      {{ nominee.name }} - {{ results.data.results[1] }}
                    </div>
                  </div>
                  <div>
                    <h1>Judges</h1>
                  </div>
                </div>
              </div>
            </b-tab-item>
        </b-tabs>
</template>
<script>
import { FETCH_RESULTS_QUERY } from "../gql/fetch_results";
export default {
  name: "Results",
  props: ["data", "route", "token", "votes", "userid"],
  data() {
    return {
      results: [],
    };
  },
  async mounted() {
    if (this.data[0].showResults != "true" && this.userid != "195642") {
      this.$router.push("/");
    } else {
      this.results = await this.$apollo.query({
        query: FETCH_RESULTS_QUERY,
        variables: {
          token: this.token,
        },
      });
    }
  },
};
</script>
