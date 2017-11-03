<template>
  <div id="main">
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
    <div id="content">
      <div id="data" v-if="crId in crawlrequests">
        <div class="ui three cards">
          <profCard v-for="i in crProfs" :selectedField="selectedField" :prof="profs[i]" :selected="selId === i" :key="i" @click.native="select(i)" :showCheckbox="false"></profCard>
        </div>
      </div>
      <div id="results" v-if="crId in crawlrequests && selId">
        <template v-for="i in profs[selId].relevantData" v-if="('relevantData' in profs[selId]) && selId">
          <a style="text-align: left" :href="i.url">{{i.url}}</a>
          <span style="text-align: left; color: black; font-size: larger; line-height: 32px;">{{i.snippet}}</span><br><br>
        </template>
      </div>
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
    $(document).keypress(function (e) {
      if (e.which === 13) {
        this.saveToDatabase()
      }
    }.bind(this))
    this.$on('editProfessor', function (p) {
      this.editProfessor(p)
    }.bind(this))
    this.$on('saveProfessor', function (p) {
      this.saveProfessor(p)
    }.bind(this))
    this.$on('selectField', function (f) {
      this.selectField(f)
    }.bind(this))
  },
  beforeDestroy: function () {
    $(document).unbind('keypress')
  },
  data: function () {
    return {
      selId: '',
      pModal: null,
      pModalp: this.$store.state.professorsList[0],
      selectedField: ''
    }
  },
  methods: {
    back: function () {
      this.$router.push('crawlmonitor')
    },
    select: function (id) {
      this.selId = id
    },
    editProfessor: function (p) {
      this.pModalp = JSON.parse(JSON.stringify(p))
      this.pModal.modal('show')
    },
    saveProfessor: function (p) {
      this.$store.dispatch('callMethodAndCallback', {
        params: ['editProfessor', p._id, p],
        callback: function (r) {
          this.pModal.modal('hide')
        }.bind(this)
      })
    },
    selectField: function (f) {
      this.selectedField = f
    },
    saveToDatabase: function () {
      console.log('running!')
      if (!this.selectedField || !this.selId) {
        return
      }
      console.log('hello!')
      var text = ''
      if (window.getSelection) {
        text = window.getSelection().toString()
      } else if (document.selection && document.selection.type !== 'Control') {
        text = document.selection.createRange().text
      }
      console.log(text)
      var prof = JSON.parse(JSON.stringify(this.profs[this.selId]))
      prof[this.selectedField] = text
      this.$store.dispatch('callMethod', ['editProfessor', this.selId, prof])
    }
  },
  computed: {
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
#main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

#content {
  flex: 1 1 auto;
  overflow: none;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

#data {
  width: 50%;
  display: block;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

#results {
  width: 50%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  padding: 24px;
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
