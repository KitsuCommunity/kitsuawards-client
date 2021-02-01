<template>
	<b-tabs v-if="results[0]" type="is-toggle-rounded">
		<b-tab-item v-for="category in results[0].categories" :key="category.id" :label="category.name">
			<div v-for="subcategory in category.subcategories" :key="subcategory.id">
				<h1>{{ subcategory.name }}</h1>
				<div class="grid">
					<div>
						<h1>Users</h1>
						<div class="subcategory-grid">
							<div
								class="nominee"
								v-for="nominee in ordering_users(subcategory.nominees)"
								:key="nominee.id"
							>
								<div class="medal"></div>
								<div class="nominee-media" v-html="media_rendering(nominee.media)"></div>
								<p>{{ nominee.name }}</p>
								<span v-html="votes_and_stuff(nominee.usersResults)"></span>
							</div>
						</div>
					</div>
					<div>
						<h1>Judges</h1>
						<div class="subcategory-grid">
							<div
								class="nominee"
								v-for="nominee in ordering_judges(subcategory.nominees)"
								:key="nominee.id"
							>
								<div class="medal"></div>
								<div class="nominee-media" v-html="media_rendering(nominee.media)"></div>
								<p>{{ nominee.name }}</p>
								<span v-html="votes_and_stuff(nominee.judgesResults)"></span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</b-tab-item>
	</b-tabs>
</template>
<script>
import { FETCH_DATA_QUERY } from '../gql/fetch_data';
import _ from 'lodash';
export default {
	name: 'Results',
	props: ['data', 'route', 'token', 'votes', 'userid'],
	data() {
		return {
			results: [],
		};
	},
	async mounted() {
		if (
			this.data[0].showResults != 'true' &&
			this.userid != '195642' &&
			this.userid != '171273' &&
			this.userid != 171606
		) {
			this.$router.push('/');
		} else {
			const response = await this.$apollo.query({
				query: FETCH_DATA_QUERY,
				fetchPolicy: 'network-only',
				variables: {
					token: this.token,
				},
			});
			this.results.push(response.data.year[0]);
		}
	},
	methods: {
		media_rendering: function(media) {
			if (media.includes('youtu.be')) {
				const yt_url = media.split('.be/')[1];
				return (
					'<iframe class="iframe" src="https://youtube.com/embed/' +
					yt_url +
					'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
				);
			} else if (media.includes('streamable.com')) {
				const streamable_url = media.split('.com/')[1];
				return (
					'<iframe class="iframe" src="https://streamable.com/e/' +
					streamable_url +
					'" frameborder="0" allowfullscreen></iframe>'
				);
			} else {
				return '<img class="nominee-img" src="' + media + '"/>';
			}
		},
		ordering_users(list) {
			return _.orderBy(list, 'usersResults', 'desc');
		},
		ordering_judges(list) {
			return _.orderBy(list, 'judgesResults', 'desc');
		},
		votes_and_stuff: function(votes) {
			if (votes === 1) {
				return votes + ' vote';
			} else {
				return votes + ' votes';
			}
		},
	},
};
</script>
<style lang="scss" scoped>
.grid {
	display: grid;
	grid-template-columns: auto minmax(250px, 1250px) auto;
	> div {
		grid-column: 2;
	}
}
.subcategory-grid {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
	grid-template-rows: repeat(auto-fit, minmax(250px, 1fr));
	gap: 10px;

	padding: 10px;
	border-radius: 6px;
	margin-bottom: 10px;
	overflow: hidden;
	text-align: center;
	.nominee {
		min-width: 250px;
		background-color: var(--foreground-background-color);
		border-radius: 5px;
		padding: 10px;

		display: grid;
		grid-template-rows: 320px auto;
		gap: 10px;

		.nominee-media {
			grid-row: 1;
			grid-column: 1 / span 2;
		}
		p {
			grid-row: 3;
			grid-column: 1 / span 2;
			margin-bottom: 5px;
			text-align: center;
			font-size: 18px;
		}
		.medal {
			grid-row: 2;
			grid-column: 1;
		}
		span {
			grid-row: 2;
			grid-column: 2;
			background-color: var(--secondary-background-color);
			height: 35px;
			padding: 4px 0;
		}
	}
}
.b-tabs {
	margin: 15px;

	.tabs ul {
		justify-content: center !important;
		align-items: center;
	}
}
.iframe {
	border-radius: 3px;
	height: 100%;
	width: 100%;
	background-color: black;
}
.medal {
	position: relative;
	width: 100%;
	height: 35px;
	color: white;
	font-weight: var(--bold);
	padding: 5px;
}

.subcategory-grid .nominee:nth-of-type(1) .medal {
	display: block;
	background-color: #d3ad4e;
	&::before {
		content: '#1';
	}
}
.subcategory-grid .nominee:nth-of-type(2) .medal {
	display: block;
	background-color: #869299;
	&::before {
		content: '#2';
	}
}
.subcategory-grid .nominee:nth-of-type(3) .medal {
	display: block;
	background-color: #a76b26;
	&::before {
		content: '#3';
	}
}
</style>
