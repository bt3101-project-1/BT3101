<template>
  <div id="search-page">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui icon header">
          <i class="university icon"></i>
          <div class="content">
            Choose a University and Faculty
            <!-- <div class="sub header">Manage your account settings and set e-mail preferences.</div> -->
          </div>
        </h2>
        <div class="ui large form">
          <div class="field">
            <uSelect :additions="true"></uSelect>
          </div>
          <div class="field">
            <fSelect :additions="true"></fSelect>
          </div>
          <div class="ui buttons">
            <button class="ui black button" v-on:click="search"><i class="search icon"></i>Search the Database</button>
            <div class="or"></div>
            <button class="ui blue button" v-on:click="crawlMonitor"><i class="settings icon"></i>Check Crawl Progress</button>
            <div class="or"></div>
            <button class="ui positive button" v-on:click="requestCrawl"><i class="share icon"></i>Request a Crawl</button>
          </div>
          <div class="ui error message"></div>
        </div>
      </div>
    </div>
    <h3 id="login-indicator">You are logged in as <span style="font-weight: bold;">Admin</span></h3>
    <button id="logout-button" class="ui basic button" @click="logout">
      Logout
      <i class="icon sign out" style="font-size: large; padding-left: 8px;"></i>
    </button>
  </div>
</template>

<script>
import uSelect from '@/components/university-selector'
import fSelect from '@/components/faculty-selector'
import $ from 'jquery'
export default {
  components: {
    uSelect: uSelect,
    fSelect: fSelect
  },
  mounted: function () {
    $(this.$el).find('.circular.button').popup({
      on: 'click',
      position: 'right center',
      html: `<div class="ui action input">
              <input placeholder="University Name" type="text">
              <button @click="createUniversity" class="ui button">Create</button>
            </div>
            `
    })
    this.$on('selectUniversity', function (v) {
      this.uIds = v
    })
    this.$on('selectFaculty', function (v) {
      this.fId = v
    })
  },
  data: function () {
    return {
      uIds: [],
      fId: '',
      newUniversities: []
    }
  },
  methods: {
    search: function () {
      if (!(0 in this.uIds && this.fId)) {
        return this.$store.commit('showMessageModal', {
          title: 'Blank Fields',
          msg: 'Please fill in all fields for the search query.',
          icon: 'exclamation triangle'
        })
      }
      this.$store.dispatch('searchProfessors', {
        uIds: this.uIds,
        fId: this.fId,
        router: this.$router
      })
    },
    requestCrawl: function () {
      this.$store.commit('setCrawlRequest', {
        uIds: this.uIds,
        fId: this.fId,
        router: this.$router
      })
    },
    crawlMonitor: function () {
      this.$router.push('crawlMonitor')
    },
    logout: function () {
      this.$router.push('/')
    }
  },
  computed: {
    universities: function () {
      return this.$store.state.universities
    },
    faculties: function () {
      return this.$store.state.faculties
    }
  }
}
</script>

<style scoped>
#search-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.large.form {
  width: 800px;
}

.field {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.circular.button {
  margin-left: 5px;
}

#login-indicator {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  margin: 0px;
  font-weight: normal;
}

#logout-button {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px;
  border: 0px solid rgba(0, 0, 0, 0);
  text-align: left;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-weight: bold;
  height: 46px;
}
</style>
