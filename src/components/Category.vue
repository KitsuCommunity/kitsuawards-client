<template>
  <div v-if="!is404">
    <div
      id="grid"
      v-for="subcategory in category.subcategories"
      :key="subcategory.id"
    >
      <h1>{{ subcategory.name }}</h1>
      <form class="subcategory">
        <div class="subcategory-grid">
          <b-radio
            v-model="selection"
            v-for="nominee in subcategory.nominees"
            :key="nominee.id"
            name="name"
            :native-value="nominee.id"
          >
            <div v-html="media_rendering(nominee.media)"></div>
            <p>{{ nominee.name }}</p>
          </b-radio>
        </div>
        <a
          v-if="time_tools('started', category.start)==false"
          class="button is-primary vote-btn"
          disabled
          >Votes open {{ time_tools("countdown", category.start) }}</a
        >
        <a
          v-else-if="time_tools('ended', category.end)"
          class="button is-primary vote-btn"
          disabled
          >Votes ended</a
        >
        <a v-else-if="token == null" class="button is-primary vote-btn" disabled
          >You need to log in</a
        >
        <a
          v-else-if="time_tools('started', category.start) && time_tools('ended', category.end)==false"
          class="button is-primary vote-btn"
          @click="vote()"
          >Submit my vote</a
        >
      </form>
    </div>
  </div>
  <div v-else>
    <Error404 />
  </div>
</template>
<script>
import moment from "moment";
import Error404 from "./Error404.vue";
import { VOTE_MUTATION } from "../gql/vote_mutation";
export default {
  name: "Category",
  props: ["data", "route", "token"],
  components: {
    Error404,
  },
  data() {
    return {
      category: null,
      is404: true,
      selection: null,
    };
  },
  methods: {
    loadpage: function() {
      this.category = this.data[0].categories.find(
        (x) => "/" + x.url == this.$route.path
      );
      if (this.category) {
        this.is404 = false;
      } else {
        this.is404 = true;
      }
    },
    media_rendering: function(media) {
      if (media.includes("youtu.be")) {
        const yt_url = media.split(".be/")[1];
        return (
          '<iframe height="315" src="https://youtube.com/embed/' +
          yt_url +
          '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        );
      } else {
        return '<img src="' + media + '"/>';
      }
    },
    time_tools: function(tool, date_tz) {
      const date = date_tz.split(' UTC')[0]
      switch (tool) {
        case "started":
          return moment().format("YYYY-MM-DD h:mm:ss",'Europe/Paris') >= moment(date).format("YYYY-MM-DD h:mm:ss",'Europe/Paris')
      case "ended":
          return moment().format("YYYY-MM-DD h:mm:ss",'Europe/Paris') > moment(date).format("YYYY-MM-DD h:mm:ss",'Europe/Paris')
        case "countdown":
          return moment(date, "YYYY-MM-DD h:mm:ss",'Europe/Paris').fromNow();
        default:
          break;
      }
    },
    vote: function() {
      if (this.selection) {
        this.$apollo
          .mutate({
            // Query
            mutation: VOTE_MUTATION,
            // Parameters
            variables: {
              token: this.token,
              nomineeid: parseInt(this.selection),
            },
          })
          .then((reponse) => {
            this.api_response = reponse.data.submitVote;
            if (
              this.api_response.errors[0] &&
              this.api_response.errors != "_typename"
            ) {
              this.$buefy.notification.open({
                duration: 5000,
                message: this.api_response.errors[0],
                type: "is-danger",
              });
            } else {
              this.$buefy.notification.open({
                duration: 5000,
                message: "Vote submitted",
                type: "is-success",
              });
              this.checkvote = true;
            }
          })
          .catch(() => {
            this.$buefy.notification.open({
              duration: 5000,
              message:
                "Something went wrong. Please refresh the page and if the error persists, contact the administrator.",
              type: "is-danger",
            });
          });
      } else {
        this.$buefy.notification.open({
          duration: 5000,
          message: "You need to select an anime.",
          type: "is-danger",
        });
      }
    },
  },
  mounted() {
    this.loadpage();
  },
  watch: {
    route: function() {
      this.loadpage();
      scroll(0, 0);
    },
  },
};
</script>
<style>
#grid {
  text-align: center;
}
.subcategory-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #3b3946;
  border-radius: 6px;
  overflow: hidden;
  text-align: center;
}
.subcategory {
  border: 2px solid #292631;
  background-color: #292631;
  border-radius: 6px;
  overflow: hidden;
  margin: auto;
  display: inline-block;
  max-width: 1250px;
  min-width: 250px;
}
.vote-btn {
  width: 100%;
}

.b-radio.radio:hover,
input[type="radio"]:checked + label {
  background-color: #24212c;
}
.b-radio {
  border: 1px solid #3b3946;
  margin-right: 0px !important;
}
.check {
  position: absolute !important;
  bottom: 0;
  margin-top: 20px;
  margin-left: calc(50% - 10px);
  margin-bottom: 5px;
}
.radio p {
  margin-bottom: 30px;
  padding-left: 4px;
  padding-right: 4px;
  text-align: center;
  font-size: 18px;
}
.b-radio.radio .control-label {
  padding-left: 0 !important;
  margin-bottom: auto;
  width: 100%;
}
</style>
