<template>
  <div id="request-page">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui icon header">
          <i class="cloud upload icon"></i>
          <div class="content">
            Create Crawl Request
            <div class="sub header">for Faculty of {{$store.state.crfId in $store.state.faculties ? $store.state.faculties[$store.state.crfId].name : $store.state.crfId}}</div>
            <h4 class="ui header">
              We need faculty list URLs for each University to start the crawl
            </h4>
          </div>
        </h2>
        <div class="ui large form">
          <template v-for="(i,idx) in $store.state.cruIds">
            <h5>{{i in $store.state.universities ? $store.state.universities[i].name : i}}</h5>
            <div class="field">
              <div class="ui left icon input">
                <i class="linkify icon"></i>
                <input type="text" name="email" placeholder="Faculty List URL" v-model="urls[idx]">
              </div>
            </div>
          </template>
          <div class="ui buttons">
            <button class="ui positive button" v-on:click="crawl"><i class="icon share"></i>Start Crawling</button>
          </div>
          <div class="ui error message"></div>
        </div>
      </div>
    </div>
    <button id="back-button" class="ui basic button" @click="back">
      <i class="icon left chevron"></i>
      Back
    </button>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      urls: []
    }
  },
  methods: {
    crawl: function () {
      this.$store.dispatch('callMethodAndCallback', {
        params: ['createCrawlRequests', this.urls, this.$store.state.cruIds, this.$store.state.crfId],
        callback: function (r) {
          this.$router.push('crawlmonitor')
        }.bind(this)
      })
    },
    back: function () {
      this.$router.push('search')
    }
  }
}
</script>

<style scoped>
#request-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.large.form {
  width: 450px;
}

h5 {
  text-align: left;
  margin-bottom: 0px;
}

#back-button {
  position: absolute;
  top: 0;
  left: 0;
  border: 0px solid black !important;
  box-shadow: none;
  padding: 10px 10px;
  font-weight: bold;
  height: 46px;
}
</style>
