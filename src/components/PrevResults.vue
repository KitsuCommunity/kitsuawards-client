<template>
	<b-tabs type="is-toggle-rounded">
		<b-tab-item label="2020">
			<section class="prev-winners-images">
				<h1>2020 Winners</h1>

				<div v-for="winner in winners" :key="winner.name">
					<img :src="winner.url" :alt="winner.name" />
				</div>
			</section>
		</b-tab-item>
		<b-tab-item label="2019">
			<div class="previous-winners">
				<h1>2019 Kitsu Anime Awards Results:</h1>
				<p>
					WIP section. Will fix later (this is the second year running with
					this, so probably not)
				</p>

				<h2>Best Opening</h2>

				<p><b>People's Choice</b>: Kimetsu no Yaiba “Gurunge”</p>
				<p>
					<b>Judge’s Choice</b>: Domestic Girlfriend “Kaweki wo Ameku” by Minami
				</p>

				<h2>Best Ending</h2>

				<p>
					<b>People's Choice and Judge’s Choice</b>: Kaguya-Sama Love is War
					“Chika Dance”
				</p>

				<h2>Best Insert Song</h2>

				<p>
					<b>People's Choice</b>: Kimetsu no Yaiba “Kamado Tanjiro no Uta”
					composed by Go Shiina
				</p>
				<p>
					<b>Judge’s Choice</b>: Carole & Tuesday “Loneliest Girl” performed by
					Vo.Nai BrXX＆Celeina Ann
				</p>

				<h2>Best Protagonist</h2>

				<p><b>People's Choice</b>: Tanjiro Kamado (Kimetsu no Yaiba)</p>
				<p><b>Judge’s Choice</b>: Legosi (Beastars)</p>

				<h2>Best Continuing Protagonist</h2>

				<p>
					<b>People’s and Judge’s Choice</b>: Kageyama “Mob” Shigeo (Mob Psycho
					100 II)
				</p>

				<h2>Best Boy</h2>

				<p><b>People's Choice</b>: Reigen Arataka (Mob Psycho 100 II)</p>
				<p><b>Judge’s Choice</b>: Taichi Mashima (Chihayafuru Season 3)</p>

				<h2>Best Girl</h2>

				<p><b>People's Choice</b>: Nezuko Kamado (Kimetsu no Yaiba)</p>
				<p><b>Judge’s Choice</b>: Haru (My Roommate is a Cat)</p>

				<h2>Best Supporting Cast</h2>

				<p><b>People’s and Judge’s Choice</b>: Kaguya-Sama Love is War</p>

				<h2>Best Animation</h2>

				<p><b>People's Choice</b>: Kimetsu no Yaiba</p>
				<p><b>Judge’s Choice</b>: Mob Psycho 100 II</p>

				<h2>Best Visual Art</h2>

				<p><b>People's Choice</b>: Kimetsu no Yaiba</p>
				<p><b>Judge’s Choice</b>: Sarazanmai</p>

				<h2>Best Background Art</h2>

				<p><b>People's Choice</b>: Vinland Saga</p>
				<p><b>Judge’s Choice</b>: Sarazanmai</p>

				<h2>Best Soundtrack</h2>

				<p><b>People’s and Judge’s Choice</b>: Carole & Tuesday</p>

				<h2>Best Direction</h2>

				<p>
					<b>People's Choice</b>: Kimetsu no Yaiba directed by Haruo Sotozaki
				</p>
				<p><b>Judge’s Choice</b>: Babylon directed by Kiyotaka Suzuki</p>

				<h2>Best Character Designs</h2>

				<p><b>People’s and Judge’s Choice</b>: Kimetsu no Yaiba</p>

				<h2>Best Use of CGI</h2>

				<p><b>People’s and Judge’s Choice</b>: Beastars</p>

				<h2>Best Fight Scene of the Year</h2>

				<p>
					<b>People's Choice</b>: Tanjiro and Nezuko vs. Rui (Kimetsu no Yaiba)
				</p>
				<p>
					<b>Judge’s Choice</b>: Mob vs. Toichiro Suzuki (Mob Psycho 100 II)
				</p>

				<h2>Shorts of the Year</h2>

				<p><b>People’s and Judge’s Choice</b>: Isekai Quartet</p>

				<h2>Continuing Anime of the Year</h2>

				<p><b>People’s and Judge’s Choice</b>: Mob Psycho 100 II</p>

				<h2>Anime of the Year</h2>

				<p><b>People's Choice</b>: Kimetsu no Yaiba</p>
				<p><b>Judge’s Choice</b>: Beastars</p>
			</div>
		</b-tab-item>
	</b-tabs>
</template>
<script>
import prevWinners from '../data/previousWinners.json';

export default {
	name: 'PrevResults',
	data() {
		return {
			winners: prevWinners,
		};
	},
	mounted() {
		// eslint-disable-next-line no-console
		console.log(this.winners);
	},
};
</script>
<style lang="scss" scoped>
.b-tabs {
	margin-top: 50px;
}

.prev-winners-images {
	h1 {
		display: none;
	}

	div:first-of-type {
		margin-top: 10px;
	}

	display: grid;
	gap: 50px;
	justify-content: center;

	img {
		max-width: 1300px;
	}
}
</style>
