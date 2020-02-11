<template>
    <form @submit.prevent="Login">
        <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
                <p class="modal-card-title">Login with Kitsu</p>
            </header>
            <section class="modal-card-body">
                <b-field label="Username">
                    <b-input
                        type="text"
                        placeholder="Your username"
                        v-model="email"
                        required>
                    </b-input>
                </b-field>

                <b-field label="Password">
                    <b-input
                        type="password"
                        password-reveal
                        placeholder="Your password"
                        v-model="password"
                        required>
                    </b-input>
                </b-field>
                <b-message v-if="IncorrectLogin" size="is-small" type="is-danger">
                    Username or password invalid
                </b-message>
                We do NOT store any of your credentials.
            </section>
            <footer class="modal-card-foot">
                <button class="button" type="button" @click="$parent.close()">Close</button>
                <button class="button is-primary">Login</button>
            </footer>
        </div>
    </form>
</template>
<script>
const axios = require('axios').default;

export default {
    data() {
        return {
            IncorrectLogin: "",
            email: "",
            password: ""
        }
    },
    methods: {
        Login: function() {
            axios.post('https://kitsu.io/api/oauth/token', {
                grant_type: 'password',
                username: this.email,
                password: this.password
            })
            .then((response) => {
               localStorage.setItem('token', JSON.stringify(response, null, 2))
               window.location.reload()
            })
            .catch((error) => {
                if(error.error == "invalid_grant") {
                    this.IncorrectLogin="Incorrect username or password"
                }
                else {
                    this.IncorrectLogin="Something went wrong..."
                }                
            })
        }
    }
}
</script>