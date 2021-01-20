<template>
  <div>
    <h1 class="strong">Welcome Users of Kitsu!</h1>
    <div class="description" v-html="data[0].description"></div>
    <h1 class="strong">The fabulous judges:</h1>
    <div class="judges-grid">
      <div class="judges-grid-child" v-for="judge in judges_id"
        :key="judge.id">
        <a :href="'https://kitsu.io/users/'+judge.userId">
          <judgeinfos :userid="judge.userId" />
        </a>
      </div>
    </div>
  </div>                                                    
</template>

<script>
import judgeinfos from './JudgesInfo.vue'

export default {
  name: 'Homepage',
  props: ["data", "route", "token", "votes"],
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

.judges-grid {
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
  gap: 15px;
  max-width: 1024px;
}
.strong {
  font-weight: bold;
}
</style>
