<template>
  <div id="app">
    <template v-if="year">
      <template>
        <b-navbar fixed-top>
          <template slot="brand">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
              <svg
                width="36"
                height="36"
                viewBox="0 0 260 260"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#E75E45">
                  <path
                    d="M152.7 48.5c-6.8-2.5-14.1-4.1-21.8-4.4-12.7-.6-24.8 2.2-35.4 7.6-.6.3-1.3.6-2 1v36.4c0 .5 0 2.4-.3 4-.7 3.7-2.9 7-6 9.1-2.6 1.8-5.6 2.6-8.8 2.5-.6 0-1.3-.1-1.9-.2-1.6-.3-3.3-.9-3.8-1.1-1.4-.5-21.8-8.4-31.6-12.2-1.2-.5-2.2-.9-3-1.2-11.7 9.9-24 21.7-35.5 35.6-.1.1-.6.7-.7.8-1.5 2.1-1.6 5.1 0 7.4 1.2 1.7 3.1 2.7 5 2.8 1.3.1 2.7-.3 3.9-1.1.1-.1.2-.2.4-.3 12.2-8.8 25.6-15.9 39.8-21.6 1-.5 2.2-.8 3.3-.7 1.6.1 3.1.7 4.3 1.9 2.3 2.3 2.4 6 .5 8.5-.8 1.2-1.5 2.4-2.2 3.6-7.6 12.4-13.7 25.9-18.3 40-.1.4-.2.7-.3 1.1v.1c-.4 1.7-.1 3.5 1 5 1.2 1.7 3.1 2.7 5.1 2.8 1.4.1 2.7-.3 3.9-1.1.5-.4 1-.8 1.4-1.3.1-.2.3-.4.4-.6 5-7.1 10.5-13.8 16.4-20 26.3-28.2 61.2-48.1 100.3-55.9.3-.1.6-.1.9-.1 2.2.1 3.9 2 3.8 4.2-.1 1.9-1.4 3.3-3.2 3.7-36.3 7.7-101.7 50.8-78.8 113.4.4 1 .7 1.6 1.2 2.5 1.2 1.7 3.1 2.7 5 2.8 1.1 0 4.2-.3 6.1-3.7 3.7-7 10.7-14.8 30.9-23.2 56.3-23.3 65.6-56.6 66.6-77.7v-1.2c.9-31.4-18.6-58.8-46.6-69.2zm-56.5 165C91 198 91.5 183 97.6 168.7c11.7 18.9 32.1 20.5 32.1 20.5-20.9 8.7-29.1 17.3-33.5 24.3z"
                  ></path>
                  <path
                    d="M1.1 50.6c.1.2.3.4.4.5 5.3 7.2 11.3 13.5 17.8 19.1.1.1.2.1.2.2 4.2 3.6 12.2 8.8 18 10.9 0 0 36.1 13.9 38 14.7.7.3 1.7.6 2.2.7 1.6.3 3.3 0 4.8-1s2.4-2.5 2.7-4.1c.1-.6.2-1.6.2-2.3V48.5c.1-6.2-1.9-15.6-3.7-20.8 0-.1-.1-.2-.1-.3-2.8-8.1-6.6-16-11.4-23.5l-.3-.6-.1-.1c-2-2.8-6-3.5-8.9-1.5-.5.3-.8.7-1.2 1.1-.3.4-.5.7-.8 1.1-6.4 9.3-9 20.6-7.3 31.7-3.3 1.7-6.8 4-7.2 4.3-.4.3-3.9 2.7-6.6 5.2-9.7-5.5-21.3-7.2-32.2-4.6-.4.1-.9.2-1.3.3-.5.2-1 .4-1.4.7-2.9 2-3.7 5.9-1.8 8.9v.2zm63.5-40.1c3.4 5.7 6.3 11.6 8.6 17.8-4.6.8-9.1 2-13.5 3.6-.6-7.5 1.1-14.9 4.9-21.4zM31.5 51.3c-3.2 3.5-5.9 7.3-8.3 11.3-4.9-4.3-9.4-9.2-13.5-14.4 7.5-1.3 15-.2 21.8 3.1z"
                  ></path>
                </g>
              </svg>
              <strong>Kitsu Anime Awards</strong>
            </b-navbar-item>
            <div class="buttons is-hidden-desktop">
              <a v-if="token" class="button is-primary" @click="Logout()">
                <strong>Logout</strong>
              </a>
              <a
                v-else
                class="button is-primary"
                @click="isComponentModalActive = true"
              >
                <strong>Login</strong>
              </a>
            </div>
          </template>
          <template slot="start">
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
              Home
            </b-navbar-item>
            <b-navbar-item
              v-for="category in year[0].categories"
              :to="{ path: '/' + category.url }"
              :key="category.id"
              :alt="category.name"
              tag="router-link"
            >
              {{ category.name }}
            </b-navbar-item>
          </template>

          <template slot="end">
            <b-navbar-item tag="div">
              <div class="buttons">
                <span
                  class="isjudge"
                  v-if="isJudge"
                  type="is-primary"
                  rounded
                  outlined
                  >JUDGE MODE</span
                >
                <b-navbar-item
                  tag="router-link"
                  :to="{ path: '/results' }"
                  class="button is-light"
                  v-if="year[0].showResults == 'true' || userid == 171273"
                >
                  <strong>See the results</strong>
                </b-navbar-item>
                <b-navbar-item
                  href="https://api.kitsuawards.com/admin"
                  v-if="userid == 171273"
                  class="button is-danger"
                >
                  <strong>Admin</strong>
                </b-navbar-item>
                <b-navbar-item
                  v-if="token"
                  @click="Logout()"
                  class="button is-hidden-mobile is-primary"
                >
                  <strong>Logout</strong>
                </b-navbar-item>
                <b-navbar-item
                  v-else
                  @click="isComponentModalActive = true"
                  class="button is-hidden-mobile is-primary"
                >
                  <strong>Login</strong>
                </b-navbar-item>
              </div>
            </b-navbar-item>
          </template>
        </b-navbar>
      </template>
      <template>
        <section>
          <b-modal
            :active.sync="isComponentModalActive"
            has-modal-card
            trap-focus
            aria-role="dialog"
            aria-modal
          >
            <form @submit.prevent="Login">
              <div class="modal-card" style="width: auto">
                <header class="modal-card-head">
                  <p class="modal-card-title">Login with Kitsu</p>
                </header>
                <section class="modal-card-body">
                  <b-field label="Email">
                    <b-input
                      type="text"
                      placeholder="Your email"
                      v-model="email"
                      required
                    >
                    </b-input>
                  </b-field>

                  <b-field label="Password">
                    <b-input
                      type="password"
                      password-reveal
                      placeholder="Your password"
                      v-model="password"
                      required
                    >
                    </b-input>
                  </b-field>
                  <b-message
                    v-if="IncorrectLogin"
                    size="is-small"
                    type="is-danger"
                  >
                    Email or password invalid
                  </b-message>
                  We do NOT store any of your credentials.
                </section>
                <footer class="modal-card-foot">
                  <b-button v-if="IsLogging" class="button is-primary" loading
                    >Login</b-button
                  >
                  <button v-else class="button is-primary">Login</button>
                </footer>
              </div>
            </form>
          </b-modal>
        </section>
      </template>
      <div v-if="year" id="router-view">
        <router-view
          :route="$route.fullPath"
          :data="year"
          :token="token"
          :votes="votes"
          :userid="userid"
          @fetch-vote="fetchVote"
        />
      </div>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            The <strong>Kitsu Anime Awards</strong> is hosted by
            <a href="https://kitsu.io/users/Kuroonuma">Kuroonuma</a>. <br> 
            The website was made by
            <a href="https://kitsu.io/users/Gakamine">Gakamine</a>. <br>
            And styled by 
            <a href="https://kitsu.io/users/Reinachan">Reina</a>
          </p>
          <p>
            All other trademarks and content not owned by the Kitsu Anime Awards
            that appear on the website are the property of their respective
            owners
          </p>
        </div>
      </footer>
    </template>
    <template v-if="APIerror">
      <Error500 />
    </template>
  </div>
</template>

<script>
const axios = require("axios").default;
import Error500 from "./components/Error500.vue";
import { FETCH_DATA_QUERY } from "./gql/fetch_data";
import { FETCH_VOTE_QUERY } from "./gql/fetch_votes";
export default {
  name: "App",
  components: {
    Error500,
  },
  data() {
    return {
      APIerror: false,
      year: null,
      votes: [],
      isComponentModalActive: false,
      token: localStorage.token,
      userid: null,
      IsLogging: false,
      IncorrectLogin: "",
      email: "",
      password: "",
      isJudge: false,
    };
  },
  mounted() {
    if (localStorage.token) {
      this.checkToken();
    }
  },
  apollo: {
    year: {
      query: FETCH_DATA_QUERY,
      error() {
        this.APIerror = true;
      },
    },
  },
  methods: {
    Login: function() {
      this.IsLogging = true;
      axios({
        method: "post",
        url: "https://kitsu.io/api/oauth/token",
        data: {
          grant_type: "password",
          username: this.email,
          password: this.password,
        },
      })
        .then((response) => {
          localStorage.setItem("token", response.data.access_token);
          this.token = response.data.access_token;
          this.checkToken();
          this.IsLogging = false;
          this.isComponentModalActive = false;
          this.IncorrectLogin = "";
        })
        .catch((error) => {
          this.IsLogging = false;
          if (error.error == "invalid_grant") {
            this.IncorrectLogin = "Incorrect username or password";
          } else {
            this.IncorrectLogin = "Something went wrong...";
          }
        });
    },
    Logout: function() {
      localStorage.clear();
      this.token = null;
      this.userid = "";
    },
    fetchVote: async function() {
      const votes = await this.$apollo.query({
        query: FETCH_VOTE_QUERY,
        fetchPolicy: 'network-only',
        variables: {
          token: this.token,
        },
      });
      this.votes = votes.data.FetchVote.map(function(el) {
        return el.nominee;
      });
    },
    checkToken: function() {
      axios({
        method: "get",
        url:
          "https://kitsu.io/api/edge/users?filter[self]=true&include=userRoles.role,userRoles.user",
        headers: {
          Authorization: "Bearer " + this.token,
        },
      }).then(async (response) => {
        try {
          this.userid = JSON.parse(JSON.stringify(response["data"])).data[0].id;
          this.fetchVote();
        } catch (error) {
          this.userid = "";
          localStorage.clear();
        }
      });
    },
  },
  watch: {
    userid: function() {
      if(this.year) {
      for (var index = 0; index < this.year[0].judges.length; ++index) {
        var judge = this.year[0].judges[index].userId;
        if (judge == this.userid) {
          this.isJudge = true;
          break;
        } else {
          this.isJudge = false;
        }
      }
      }
    },
  },
};
</script>
<style lang="scss">
// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Base colours
:root {
		// Base Colours
		--background-color: #161116ff;
		--secondary-background-color: #312631ff;
		--foreground-background-color: #453345ff;
		--secondary-foreground-background-color: #6F5C6Fff;
		--cta-accept-color: #236147ff;

    --navbar-color: #161116ff;
    --navbar-hover-color: #251e25;

		// Shadow Colours
		--foreground-shadow: #16111688;

		// Text Colours
		--main-text: #fff;
		--secondary-text: #ddd;
		--placeholder-text: #ccc;
		--links-text: #ff8c7c;

		// Tags
		--generic-tag: #576163;
		--media-subtype-tag: var(--generic-tag);

		// Focus highlights
		--focus-highlight: #ff8c7c;
		--unfocused-highlights: #ff8c7c00;
		
		// Border-Radius
		--rounded-input: 7px;

		// Font Sizes
		--font-xs: 0.6rem;
		--font-sm: 0.8rem;
		--font-me: 1rem;
		--font-lg: 1.2rem;
		--font-xl: 1.4rem;
		--font-xxl: 1.8rem;

		// Font Weights
		--light: 300;
		--regular: 400;
		--semi-bold: 600;
		--bold: 700;
		--extra-bold: 800;

		// Standard Breakpoints
		--breakpoint-xs: 0;
		--breakpoint-sm: 576px;
		--breakpoint-md: 768px;
		--breakpoint-lg: 992px;
		--breakpoint-xl: 1200px;
	}

  // Default border-box
  * {
		box-sizing: border-box;
		text-rendering: optimizeLegibility;
	}

  // General font
	body {
		font-family: "Open Sans", sans-serif;
		background-color: var(--secondary-background-color);
		color: var(--main-text);
	}



// Set your colors
$primary: #fd755c;
$primary-invert: findColorInvert($primary);
$twitter: #4099ff;
$twitter-invert: findColorInvert($twitter);
$navbar-background-color: var(--navbar-color);
$navbar-box-shadow-color: #282530;
$text-strong: #e7dfe0;
$navbar-burger-color: white;

//Modal colors
$modal-card-body-background-color: #3b3946;
$modal-card-head-background-color: #292631;
$modal-card-title-color: white;
$modal-card-foot-border-top: #282530;
$modal-card-head-border-bottom: #282530;
$label-color: #c1c1c4;
$message-body-pre-background-color: #292631;

// Forms
$input-color: white;
$input-background-color: #24212c;
$input-border-color: #555160;

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
  "white": (
    $white,
    $black,
  ),
  "black": (
    $black,
    $white,
  ),
  "light": (
    $light,
    $light-invert,
  ),
  "dark": (
    $dark,
    $dark-invert,
  ),
  "primary": (
    $primary,
    $primary-invert,
  ),
  "info": (
    $info,
    $info-invert,
  ),
  "success": (
    $success,
    $success-invert,
  ),
  "warning": (
    $warning,
    $warning-invert,
  ),
  "danger": (
    $danger,
    $danger-invert,
  ),
  "twitter": (
    $twitter,
    $twitter-invert,
  ),
);

// Links
$link: $primary;
$link-hover: #dd452a;
$link-invert: $primary-invert;
$link-focus-border: $primary;
$navbar-item-hover-background-color: var(--navbar-hover-color);
$navbar-item-hover-color: #bfbfbf;
$navbar-item-color: #bfbfbf;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

#app {
  overflow: hidden;
  /* display: flex; */
  /* flex-direction: column; */
  /* min-height: calc(100% - 52px); */
  position: absolute;
  width: 100%;
  min-height: 100vh;
  background-color: var(--secondary-background-color);
}
#router-view {
  background-color: var(--secondary-background-color);
  color: var(--secondary-text);
  /* margin: 10px; */
  /* flex: 1 0 auto; */
}

// Layout
#app {
  display: grid;
  grid-template-rows: 5rem auto;

  .navbar {
    grid-row: 1;
  }
  #router-view {
    grid-row: 2;
  }
  .footer {
    grid-row: 3;
  }

}

/* .router-link-exact-active {
  color: #c1c1c4;
  background-color: #24212c;
} */

.navbar-brand > .navbar-item {
  color: #fd755c !important;
  /* background-color: #292631; */
}

.modal-card-body {
  color: #c1c1c4;
}

.checkbox:hover,
.radio:hover {
  color: #a6a6a6;
}

.footer {
  background-color: var(--background-color);
  color: #c1c1c4;
  margin-top: 35px;
  margin-bottom: 0;
}

.isjudge {
  color: #e75e45;
  border: 1px solid #e75e45;
  padding: 5px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
}

h1 {
  color: var(--main-text);
}

.is-hidden-desktop {
  margin-bottom: 0px !important;
  margin-left: auto;
}
.is-hidden-desktop .button {
  margin: 0px !important;
}
.navbar-burger {
  margin-left: 0px !important;
}

// SHAMEFUL FIXES
html.has-navbar-fixed-top, body.has-navbar-fixed-top {
  padding: 0;
}
body {
  min-height: 100vh!important;
  margin: 0!important;
  padding:0!important;
}


</style>
