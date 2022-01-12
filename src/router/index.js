import Vue from 'vue';
import Router from 'vue-router';
import Homepage from '@/components/Homepage';
import Category from '@/components/Category';
import Results from '@/components/Results';
import PrevResults from '@/components/PrevResults';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '',
			name: 'Homepage',
			component: Homepage,
		},
		{
			path: '/results',
			name: 'Results',
			component: Results,
		},
		{
			path: '/prev-results',
			name: 'PrevResults',
			component: PrevResults,
		},
		{
			path: '/*',
			name: 'Category',
			component: Category,
		},
	],
});
