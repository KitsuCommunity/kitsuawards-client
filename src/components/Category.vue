<template>
  <div v-if="!is404">
    <div v-if="time_tools('started', category.start)">
      <div
        id="grid"
        v-for="subcategory in category.subcategories"
        :key="subcategory.id"
      >
        <h1>{{ subcategory.name }}</h1>
        <form class="subcategory">
          <div class="subcategory-grid">
              <b-radio
              v-model="selections[subcategory.id]"
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
            v-if="time_tools('ended', category.end)"
            class="button is-primary vote-btn"
            disabled
            >Votes ended</a
          >
          <a
            v-else-if="token == null"
            class="button is-primary vote-btn"
            disabled
            >You need to log in</a
          >
          <a
            v-else-if="
              votes.find((x) => x.subcategoryId == subcategory.id) &&
                time_tools('started', category.start) &&
                time_tools('ended', category.end) == false
            "
            class="button is-primary vote-btn"
            @click="vote(subcategory.id)"
            >Change my vote</a
          >
          <a
            v-else-if="
              time_tools('started', category.start) &&
                time_tools('ended', category.end) == false
            "
            class="button is-primary vote-btn"
            @click="vote(subcategory.id)"
            >Submit my vote</a
          >
        </form>
      </div>
    </div>
    <div class="not_revealed" v-else>
      <h1>
        Nominees will be revealed {{ time_tools("countdown", category.start) }}
      </h1>
      <img
        src="https://64.media.tumblr.com/b4b741f4b462803cc765567133a9e32c/tumblr_p0thvr4Y0Y1qzxv73o1_540.gif"
      />
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
  props: ["data", "route", "token", "votes"],
  components: {
    Error404,
  },
  data() {
    return {
      category: null,
      is404: true,
      selections: [],
    };
  },
  methods: {
    restoreVotes: function() {
      for (let i = 0; i < this.votes.length; i++) {
        this.selections[this.votes[i].subcategoryId] = this.votes[i].id;
      }
    },
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
          '<iframe class="iframe" src="https://youtube.com/embed/' +
          yt_url +
          '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        );
      } else if (media.includes("streamable.com")) {
        const streamable_url = media.split(".com/")[1];
        return '<iframe class="iframe" src="https://streamable.com/e/'+streamable_url+'" frameborder="0" allowfullscreen></iframe>';
      } else {
        return '<img src="' + media + '"/>';
      }
    },
    time_tools: function(tool, date_tz) {
      const date = date_tz.split(" UTC")[0];
      switch (tool) {
        case "started":
          return (
            moment().utcOffset('+0100').format("YYYY-MM-DD HH:mm:ss") >=
            moment(date).format("YYYY-MM-DD HH:mm:ss", "Europe/Paris")
          );
        case "ended":
          return (
            moment().utcOffset('+0100').format("YYYY-MM-DD HH:mm:ss") >
            moment(date).format("YYYY-MM-DD HH:mm:ss", "Europe/Paris")
          );
        case "countdown":
          return moment(date, "YYYY-MM-DD HH:mm:ss", "Europe/Paris").fromNow();
        default:
          break;
      }
    },
    vote: function(sub_id) {
      if (this.selections[sub_id]) {
        this.$apollo
          .mutate({
            // Query
            mutation: VOTE_MUTATION,
            // Parameters
            variables: {
              token: this.token,
              nomineeid: parseInt(this.selections[sub_id]),
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
              this.$emit("fetch-vote");
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
    this.restoreVotes();
  },
  watch: {
    votes: function() {
      this.restoreVotes();
    },
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;

  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
  overflow: hidden;
  text-align: center;
}
.subcategory {
  border-radius: 6px;
  overflow: hidden;
  margin: auto;
  display: inline-block;
  max-width: 1250px;
  min-width: 250px;
  width: 95%;
}
.b-radio.radio {
  min-width: 250px;
  background-color: var(--foreground-background-color);
  border-radius: 5px;
  padding: 10px;
  
  display: grid;
  grid-template-rows: auto auto auto 35px;
  grid-template-columns: 1fr auto 1fr;
  
}

.radio-wrapper {
  display: grid;

} 


.vote-btn {
  width: 100%;
}

.b-radio {
  margin: 0px!important;
  
}

.b-radio.radio:hover,
input[type="radio"]:checked + label {
  color: white;
  background-color: var(--secondary-foreground-background-color);
  border-radius: 5px;
}

.check {
  position: relative;
  grid-row: 4;
  grid-column: 2;
  /* position: absolute !important; */
  /* bottom: 0; */
  /* margin-top: 20px;
  margin-left: calc(50% - 10px);
  margin-bottom: 5px; */
}
.radio p {
  margin-bottom: 5px;
  /* padding-left: 4px;
  padding-right: 4px; */
  text-align: center;
  font-size: 18px;
}
.control-label img {
  border-radius: 5px;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.b-radio.radio .control-label {
  padding: 0 !important;
  grid-column: span 3;
  grid-row: span 3;

  display: grid;
  grid-template-rows: 350px auto;
  gap: 10px;
}
.iframe {
  border-radius: 3px;
  height: 100%;
  width: 100%;
  background-color: black;
}
.not_revealed,
.not_revealed * {
  font-weight: bold;
  text-align: center;
}
</style>
