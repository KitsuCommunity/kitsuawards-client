import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Buefy from 'buefy';
import { ApolloClient } from 'apollo-client';
import VueApollo from 'vue-apollo';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import 'tachyons';
import AsyncComputed from 'vue-async-computed';

Vue.config.productionTip = false;

const httpLink = new HttpLink({
	uri: 'https://api.kitsuawards.com/',
});

const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache(),
	connectToDevTools: true,
});

const apolloProvider = new VueApollo({
	defaultClient: apolloClient,
	defaultOptions: {
		$loadingKey: 'loading',
	},
});

Vue.use(Buefy);
Vue.use(AsyncComputed);
Vue.use(VueApollo);

new Vue({
	router,
	apolloProvider,
	render: (h) => h(App),
}).$mount('#app');
