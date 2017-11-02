<template>
  <div id="crawler-page">
    <button id="back-button" class="ui basic button" @click="back">
      <i class="icon left chevron"></i>
      Back
    </button>
    <h2 class="ui icon header">
      <i class="cogs icon"></i>
      <div class="content">
        Crawl Requests
        <div class="sub header">Monitor your pending crawl requests</div>
      </div>
    </h2>
    <table class="ui very basic collapsing celled table">
      <thead>
        <tr>
          <th>University & Faculty</th>
          <th>Faculty List URL</th>
          <th>Date & Time Submitted</th>
          <th>Date & Time Completed</th>
          <th>Status</th>
          <th>Results</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, id) in crawlrequests">
          <td>
            <h4 class="ui image header">
              <div class="content">
                {{universities[i.universityId].name}}
                <div class="sub header">Faculty of {{faculties[i.facultyId].name}}</div>
            </div>
          </h4></td>
          <td>
            {{i.facultyUrl}}
          </td>
          <td>
            {{(new Date(i.timeStampStart.$date)).toLocaleString()}}
          </td>
          <td>
            {{'timeStampEnd' in i ? (new Date(i.timeStampEnd.$date)).toLocaleString() : ''}}
          </td>
          <td>
            {{!('timeStampEnd' in i) ? 'Pending' : 'Completed'}}
          </td>
          <td>
            <button class="ui right labeled icon button positive" @click="results(id)" v-if="('timeStampEnd' in i)">
              <i class="right arrow icon"></i>
              View Results
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  mounted: function () {
    console.log('mounted!')
  },
  methods: {
    results: function (id) {
      this.$store.state.crId = id
      this.$router.push('manualcrawl')
    },
    back: function () {
      this.$router.push('search')
    }
  },
  computed: {
    universities: function () {
      return this.$store.state.universities
    },
    faculties: function () {
      return this.$store.state.faculties
    },
    crawlrequests: function () {
      console.log(this.$store.state.crawlrequests)
      return this.$store.state.crawlrequests
    }
  }
}
</script>

<style scoped>
#crawler-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

#back-button {
  position: absolute;
  top: 0;
  left: 0;
  border: 0px solid black !important;
  box-shadow: none;
  padding: 10px 10px;
}
</style>
