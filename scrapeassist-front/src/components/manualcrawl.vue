<template>
  <div id="main">
    <div id="data" v-if="crId in crawlrequests">
      <!-- <div class="ui secondary pointing menu">
        <a class="item active">
          Data
        </a>
        <div class="right menu">
          <div class="item">
            <div class="ui icon input">
              <input placeholder="Search..." type="text">
              <i class="search link icon"></i>
            </div>
          </div>
        </div>
      </div> -->
      <div id="header">
        <button class="ui basic button" @click="back">
          <i class="icon left chevron"></i>
          Back
        </button>
        <div class="ufname">
          <h3>
            {{universities[cr.universityId].name}}
          </h3>
          <h3 class="faculty-name">
            {{faculties[cr.facultyId].name}}
          </h3>
        </div>
      </div>
      <div class="ui three cards">
        <profCard v-for="i in crProfs" :prof="profs[i]" :selected="selId === i" :key="i" @click.native="select(i._id)" :showCheckbox="false"></profCard>
      </div>
    </div>
    <div id="results" v-if="crId in crawlrequests">
      <!-- <template v-for="i in cr.professorIds"></template> -->
    </div>
    <pModal :prof="pModalp"></pModal>
  </div>
</template>

<script>
import profCard from '@/components/professor-card'
import pModal from '@/components/professor-modal'
import $ from 'jquery'
export default {
  components: {
    profCard: profCard,
    pModal: pModal
  },
  mounted: function () {
    this.pModal = $(this.$el).find('#professor-modal').modal({
      onApprove: function () {
        return false
      },
      duration: 300
    })
    this.$on('editProfessor', function (p) {
      this.editProfessor(p)
    }.bind(this))
    this.$on('saveProfessor', function (p) {
      this.saveProfessor(p)
    }.bind(this))
  },
  data: function () {
    return {
      selId: '',
      pModal: null,
      pModalp: this.$store.state.professorsList[0]
    }
  },
  methods: {
    back: function () {
      this.$router.push('crawlmonitor')
    },
    select: function (id) {
      this.selId = id
    }
  },
  computed: {
    editProfessor: function (p) {
      this.pModalp = JSON.parse(JSON.stringify(p))
      this.pModal.modal('show')
    },
    saveProfessor: function (p) {
      this.$store.dispatch('callMethodAndCallback', {
        params: ['editProfessor', p._id, p],
        callback: function (r) {
          this.$store.dispatch('searchProfessors', {
            uIds: this.$store.state.uIds,
            fId: this.$store.state.fId,
            router: this.$router
          })
          this.pModal.modal('hide')
        }.bind(this)
      })
    },
    profs: function () {
      return this.$store.state.professors
    },
    professors: function () {
      return this.$store.state.professorsList
    },
    crId: function () {
      return this.$store.state.crId
    },
    crawlrequests: function () {
      return this.$store.state.crawlrequests
    },
    cr: function () {
      return this.$store.state.crawlrequests[this.crId]
    },
    universities: function () {
      return this.$store.state.universities
    },
    faculties: function () {
      return this.$store.state.faculties
    },
    crProfs: function () {
      return this.$store.state.professorsList.filter(e => this.cr.professorIds.includes(e._id)).map(e => e._id).sort((a, b) => this.profs[a].name > this.profs[b].name)
    }
  }
}
</script>

<style scoped>
#test-hot {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#main {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}

#data {
  height: 100%;
  width: 50%;
  display: block;
  position: fixed;
  display: flex;
  flex-direction: column;
}

#results {
  height: 100%;
  width: 50%;
  background-color: #EFEFEF;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
}

.ui.secondary.pointing.menu {
  background-color: #FFFFFF;
  margin-bottom: 0px;
  z-index: 10;
  width: 100%;
}

iframe {
  height: 100%;
  width: 100%;
}

.ui.three.cards {
  margin: 0px;
  overflow: auto;
}

.ui.card {
  text-align: left;
  margin: 3px !important;
  width: calc( 33.333333333% - 6px) !important;
  color: black;
}

#header {
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: row;
  height: 48px;
  flex: 0 0 auto;
  justify-content: space-between;
}

.ufname {
  display: flex;
  flex-direction: row;
  height: 48px;
}

h3 {
  line-height: 48px;
  margin-top: 0px;
  padding: 0px 10px;
  color: rgba(0, 0, 0, 0.5);
}

h3.faculty-name {
  background-color: rgba(0, 0, 0, 0.25);
  /*color: rgba(0, 0, 0, 1);*/
  line-height: 48px;
  margin: 0px;
  padding: 0px 10px;
  color: white !important;
}

#header button{
  flex: 0 0 auto;
  border: 0px solid rgba(0, 0, 0, 0);
  text-align: left;
  -webkit-box-shadow: none;
  box-shadow: none;
  padding: 10px 10px;
  font-weight: bold;
}
</style>
