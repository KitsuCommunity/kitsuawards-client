<template>
  <div>
    <h1><strong>Welcome Users of Kitsu!</strong></h1>
    <div class="description" v-html="data[0].description"></div>
    <h1><strong>The fabulous judges:</strong></h1>
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
  props: ['data'],
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
  margin-left: 5%;
  margin-right: 5%;
}

.judges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(150px,1fr));
}
.judges-grid-child {
  padding: 15px;
}
</style>
