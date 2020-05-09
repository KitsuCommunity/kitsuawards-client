<template>
    <table class="judgeinfos">
      <tr><img class="avatar" :src="avatar"/></tr>
      <tr><b>{{ username }}</b></tr>
    </table>
</template>
<script>
const axios = require('axios').default;

export default {
  name: 'JudgeInfo',
  props: ['userid'],
  data() {
      return {
          username: "",
          avatar: ""
      }
  },
  mounted() {
    axios.get('https://kitsu.io/api/edge/users/'+this.userid).then(res => {
          this.username = res['data'].data.attributes.name
          this.avatar = res['data'].data.attributes.avatar.medium
    });
  }
}
</script>
<style>
.avatar {
    border-radius: 100%;
}
.column {
    border-color: #f5f5f5;
    border: 1px;
}
.judgeinfos {
    width: 100%;
    text-align: center;
}
</style>