<template>
  <div>
    <div class="description" v-html="data[0].description"></div>
    <h1 class="strong">The fabulous judges:</h1>
    <div class="all-judges">
      <div class="judges-grid">
        <div class="judges-grid-child" v-for="judge in judges_id"
          :key="judge.id">
          <a :href="'https://kitsu.io/users/'+judge.userId" target="_blank" rel="noopener noreferrer" >
            <judgeinfos :userid="judge.userId" />
          </a>
        </div>
      </div>
    </div>
    <div class="previous-winners">
      <h1>2019 Kitsu Anime Awards Results:</h1>
      <p><i>WIP section. Will fix later</i></p>

      <h2>Best Opening</h2>

      <p><b>People's Choice</b>: Kimetsu no Yaiba “Gurunge”</p>
      <p><b>Judge’s Choice</b>: Domestic Girlfriend “Kaweki wo Ameku” by Minami</p>

      <h2>Best Ending</h2>

      <p><b>People's Choice and Judge’s Choice</b>: Kaguya-Sama Love is War “Chika Dance”</p>

      <h2>Best Insert Song</h2>

      <p><b>People's Choice</b>: Kimetsu no Yaiba “Kamado Tanjiro no Uta” composed by Go Shiina</p>
      <p><b>Judge’s Choice</b>: Carole & Tuesday “Loneliest Girl” performed by Vo.Nai BrXX＆Celeina Ann</p>

      <h2>Best Protagonist</h2>

      <p><b>People's Choice</b>: Tanjiro Kamado (Kimetsu no Yaiba)</p>
      <p><b>Judge’s Choice</b>: Legosi (Beastars)</p>

      <h2>Best Continuing Protagonist</h2>

      <p><b>People’s and Judge’s Choice</b>: Kageyama “Mob” Shigeo (Mob Psycho 100 II)</p>

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

      <p><b>People's Choice</b>: Kimetsu no Yaiba directed by Haruo Sotozaki</p>
      <p><b>Judge’s Choice</b>: Babylon directed by Kiyotaka Suzuki</p>

      <h2>Best Character Designs</h2>

      <p><b>People’s and Judge’s Choice</b>: Kimetsu no Yaiba</p>

      <h2>Best Use of CGI</h2>

      <p><b>People’s and Judge’s Choice</b>: Beastars</p>

      <h2>Best Fight Scene of the Year</h2>

      <p><b>People's Choice</b>: Tanjiro and Nezuko vs. Rui (Kimetsu no Yaiba)</p>
      <p><b>Judge’s Choice</b>: Mob vs. Toichiro Suzuki (Mob Psycho 100 II)</p>

      <h2>Shorts of the Year</h2>

      <p><b>People’s and Judge’s Choice</b>: Isekai Quartet</p>

      <h2>Continuing Anime of the Year</h2>

      <p><b>People’s and Judge’s Choice</b>: Mob Psycho 100 II</p>

      <h2>Anime of the Year</h2>

      <p><b>People's Choice</b>: Kimetsu no Yaiba</p>
      <p><b>Judge’s Choice</b>: Beastars</p>
    </div>
  </div>                                                    
</template>

<script>
import judgeinfos from './JudgesInfo.vue'

export default {
  name: 'Homepage',
  props: ["data", "route", "token", "votes","userid"],
  components: {
    judgeinfos
  },
  data() {
    return {
      judges_id: this.data[0].judges
    }
  }
}
</script>
<style>
h1 {
  font-size: 32px;
  text-align: center;
}
.description {
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
  font-size: 18px;
  text-align: center;
}
.description h1 {
  font-weight: 700;
  margin-bottom: 15px;
}
.description p {
  margin-bottom: 15px;
}

.all-judges {
  max-width: 1024px;
  margin-left: auto;
  margin-right: auto;
}

.judges-grid {
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 15px;
}
.judges-grid-child {
  max-width: 160px;
}

.strong {
  font-weight: bold;
}
.previous-winners {
  text-align: center;
}
.previous-winners h1 {
  margin-bottom: 0;
}
.previous-winners h2 {
  font-weight: var(--semi-bold);
  font-size: var(--font-xl);
  color: var(--main-text);
  margin-top: 20px;
}
.previous-winners p {
  font-size: var(--font-la);
}

</style>
