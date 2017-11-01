<template>
  <div id="crawler-page">
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
  methods: {
    results: function (id) {
      this.$store.state.crId = id
      this.$router.push('manualcrawl')
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
}
</style>
