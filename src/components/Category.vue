<template>
    <div v-if="!is404">
        <div v-for="subcategory in category.subcategories"
            :key="subcategory.id">
            <h1>{{ subcategory.name }}</h1>
            <div class="subcategory">
              <div class="subcategory-grid">
                <b-radio v-for="nominee in subcategory.nominees"
                    :key="nominee.id"
                    name="name"
                    :native-value="nominee.name">
                    <img :src="nominee.media"/>
                    {{ nominee.name }}
                </b-radio>
              </div>
              <a v-if="currentDate>data[0].start&&currentDate<data[0].end" class="button is-primary vote-btn">Submit my vote</a>
              <a v-else-if="currentDate<data[0].start" class="button is-primary vote-btn" disabled>The Awards haven't started yet</a>
              <a v-else-if="currentDate>data[0].end" class="button is-primary vote-btn" disabled>Vote ended</a>
            </div>
        </div>
    </div>
    <div v-else>
        <Error404/>
    </div>
</template>
<script>
import Error404 from "./Error404.vue"
export default {
  name: 'Category',
  props: ['data','route'],
  components: {
      Error404
  },
  data() {
      return {
          categories: this.data[0].categories,
          category: null,
          is404: true,
          currentDate: Date()
      }
  },
  methods: {
      loadpage: function() {
        for (var index = 0; index < this.categories.length; ++index) {
            var indexcategory = this.categories[index];
            if("/"+indexcategory.url == this.$route.path){
                this.category=indexcategory;
                this.is404 = false;
                break;
            }
        }
      }
  },
  mounted() {
      this.loadpage()
  },
  watch: {
      route: function() {
          this.loadpage()
          scroll(0,0)
      }
  }
}
</script>
<style>
.subcategory-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.subcategory {
    margin-left: 5%;
    margin-right: 5%;
    border: solid 3px #e7e7e7;
    border-radius: 6px;
    overflow: hidden;
    background-color: #e7e7e7;
}
.vote-btn {
    width: 100%;
}

.b-radio.radio:hover, input[type="radio"]:checked+label {
    background-color: #f5f5f5;
}
.b-radio {
    border: 2px solid #f5f5f5;
}
.check {
    position: absolute !important;
    bottom: 0;
    margin-top: 20px;
    margin-left: calc(50% - 10px);
}
.b-radio.radio + .radio {
    margin-left: 0px !important;
}
</style>