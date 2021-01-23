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
</style>
