<template>
  <div id="database-page">
    <div id="mouseover-zone">
      <div class="ui vertical menu" id="filter-menu">
        <div class="ui simple dropdown item sub">
          Save Selection
          <i class="dropdown icon"></i>
          <div class="menu sub">
            <a class="item" v-for="(i,id) in saveslots" @click="saveSelectionModal(id)">
              {{i.name}}
            </a>
          </div>
        </div>
        <div class="ui simple dropdown item sub">
          Load Selection
          <i class="dropdown icon"></i>
          <div class="menu sub">
            <a class="item" v-for="(i,id) in saveslots" v-if="i.name !== '(blank)'" @click="loadSelection(id)">
              {{i.name}}
            </a>
          </div>
        </div>
        <div class="item">
          <h5><i class="random icon"></i>SORT</h5>
          <div class="menu">
            <a class="item" @click="sortList('name')" :class="{active: k==='name'}">Name</a>
            <a class="item" @click="sortList('university')" :class="{active: k==='university'}">Current Institution</a>
            <a class="item" @click="sortList('rank')" :class="{active: k==='rank'}">Academic Rank</a>
            <a class="item" @click="sortList('phdYear')" :class="{active: k==='phdYear'}">Year of PhD</a>
            <a class="item" @click="sortList('phdInstitution')" :class="{active: k==='phdInstitution'}">PhD Instution</a>
            <a class="item" @click="sortList('promotionYear')" :class="{active: k==='promotionYear'}">Year of Promotion</a>
            <a class="item" @click="sortList('promotionInstitution')" :class="{active: k==='promotionInstitution'}">Promotion Institution</a>
          </div>
        </div>
        <div class="item" id="filters-menu">
          <h5><i class="filter icon"></i>FILTER</h5>
          <div class="ui icon input transparent">
            <input placeholder="Min PhD Year..." type="text" v-model="minPhdYear">
          </div>
          <div class="ui icon input transparent">
            <input placeholder="Min Promotion Year..." type="text" v-model="minPromotionYear">
          </div>
        </div>
        <div class="ui simple dropdown item sub">
          Academic Rank
          <i class="dropdown icon"></i>
          <div class="menu sub">
            <a class="item" v-for="(i,id) in academicRanks" :class="{selected: id in selRanks}" @click="selectFilter(id, selRanks)">{{i}}</a>
          </div>
        </div>
        <div class="ui simple dropdown item sub">
          PhD Institution
          <i class="dropdown icon"></i>
          <div class="menu sub">
            <a class="item" v-for="(i,id) in phdInstitutions" :class="{selected: id in selPhdInsts}" @click="selectFilter(id, selPhdInsts)">{{i}}</a>
          </div>
        </div>
        <div class="ui simple dropdown item sub">
          Promotion Instution
          <i class="dropdown icon"></i>
          <div class="menu sub">
            <a class="item" v-for="(i,id) in promotionInstitutions" :class="{selected: id in selPromotionInsts}" @click="selectFilter(id, selPromotionInsts)">{{i}}</a>
          </div>
        </div>
        <div class="item">
          <div id="view-menu">
            <div class="ui labeled icon menu">
              <a class="item" :class="{active: layout === 'dbList'}" @click="setLayout('dbList')">
                <i class="list layout icon"></i>
                <span class="view-label">List View</span>
              </a>
              <a class="item" :class="{active: layout === 'dbGrid'}" @click="setLayout('dbGrid')">
                <i class="block layout icon"></i>
                <span class="view-label">Grid View</span>
              </a>
            </div>
          </div>
        </div>
        <div class="item">
          <button class="ui button green" style="width: 100%;" @click="generateCSV()">
            <i class="download icon"></i>
            Download CSV
          </button>
        </div>
      </div>
    </div>
    <div id="search-bar">
      <div class="university field">
        <uSelect :uIds="$store.state.uIds"></uSelect>
      </div>
      <div class="faculty field">
        <fSelect :fId="$store.state.fId"></fSelect>
      </div>
    </div>
    <!-- <dbList :professors="professors"></dbList> -->
    <component :is="layout" :professors="professors" :selectedProfs="selectedProfs"></component>
    <pModal :prof="pModalp"></pModal>
    <sModal></sModal>
  </div>
</template>

<script>
import $ from 'jquery'
import uSelect from '@/components/university-selector'
import fSelect from '@/components/faculty-selector'
import dbList from '@/components/database-list'
import dbGrid from '@/components/database-grid'
import pModal from '@/components/professor-modal'
import sModal from '@/components/save-selection-modal'
export default {
  components: {
    uSelect: uSelect,
    fSelect: fSelect,
    dbList: dbList,
    dbGrid: dbGrid,
    pModal: pModal,
    sModal: sModal
  },
  mounted: function () {
    $(this.$el).find('.menu.sub').css('overflow', 'auto')
    $(this.$el).find('#mouseover-zone').on('mouseover', function (e) {
      $('#filter-menu').addClass('visible')
    }).on('mouseout', function (e) {
      $('#filter-menu').removeClass('visible')
    })
    this.pModal = $(this.$el).find('#professor-modal').modal({
      onApprove: function () {
        return false
      },
      duration: 300
    })
    this.sModal = $(this.$el).find('#save-modal').modal({
      onApprove: function () {
        return false
      },
      duration: 300
    })
    this.$on('selectUniversity', function (v) {
      if (!this.$store.state.fId) {
        return
      }
      this.resetFilters()
      this.$store.dispatch('searchProfessors', {
        uIds: v,
        fId: this.$store.state.fId,
        router: this.$router
      })
    }.bind(this))
    this.$on('selectFaculty', function (v) {
      if (!(0 in this.$store.state.uIds)) {
        return
      }
      this.resetFilters()
      this.$store.dispatch('searchProfessors', {
        uIds: this.$store.state.uIds,
        fId: v,
        router: this.$router
      })
    }.bind(this))
    this.$on('editProfessor', function (p) {
      this.editProfessor(p)
    }.bind(this))
    this.$on('saveProfessor', function (p) {
      this.saveProfessor(p)
    }.bind(this))
    this.$on('selectProf', function (profId) {
      if (this.selectedProfs.includes(profId)) {
        this.selectedProfs.splice(this.selectedProfs.indexOf(profId), 1)
      } else {
        this.selectedProfs.push(profId)
      }
    }.bind(this))
    this.$on('saveSelection', function (name) {
      this.saveSelection(name)
    }.bind(this))
  },
  data: function () {
    return {
      layout: 'dbList',
      k: 'name',
      minPhdYear: '',
      minPromotionYear: '',
      selPhdInsts: {},
      selPromotionInsts: {},
      selRanks: {},
      pModal: null,
      sModal: null,
      pModalp: this.$store.state.professorsList[0],
      selectedProfs: [],
      slotId: 0
    }
  },
  methods: {
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
    saveSelectionModal: function (slotId) {
      this.slotId = slotId
      this.sModal.modal('show')
    },
    saveSelection: function (name) {
      this.$store.dispatch('callMethodAndCallback', {
        params: ['setSaveSlot', this.slotId, {
          professorIds: 0 in this.selectedProfs ? this.selectedProfs : this.professors.map(e => e._id),
          name: name,
          universityIds: this.$store.state.uIds,
          facultyId: this.$store.state.fId
        }],
        callback: function (r) {
          this.sModal.modal('hide')
        }.bind(this)
      })
    },
    loadSelection: function (slotId) {
      console.log(this.saveslots[slotId])
      this.$store.dispatch('searchProfessors', {
        uIds: this.saveslots[slotId].universityIds,
        fId: this.saveslots[slotId].facultyId,
        router: this.$router
      })
      this.selectedProfs = this.saveslots[slotId].professorIds
    },
    setLayout: function (l) {
      this.layout = l
    },
    crawlRequest: function () {
      this.$store.commit('setCrawlRequest', {
        uIds: this.$store.state.uIds,
        fId: this.$store.state.fId,
        router: this.$router
      })
    },
    sortList: function (sortKey) {
      this.k = sortKey
    },
    selectFilter: function (id, s) {
      if (id in s) {
        this.$delete(s, id)
      } else {
        this.$set(s, id, true)
      }
    },
    resetFilters: function () {
      this.minPhdYear = ''
      this.minPromotionYear = ''
      this.selPhdInsts = {}
      this.selPromotionInsts = {}
      this.selRanks = {}
    },
    generateCSV: function () {
      var csvContent = 'data:text/csv;charset=utf-8,'
      var keys = ['universityId', 'facultyId', 'name', 'rank', 'phdYear', 'phdInstitution', 'promotionYear', 'promotionInstitution', 'researchInterests']
      var headers = ['"University"', '"Faculty"', '"Name"', '"Academic Rank"', '"Year of Phd"', '"PhD Institution"', '"Research Interests"', '"Year of Promotion"', '"Promotion Institution"']
      csvContent += headers.join(',') + '\n'
      for (var i in this.professors) {
        var p = this.professors[i]
        var dataString = ''
        keys.forEach(function (e) {
          if (e in p) {
            switch (e) {
              case 'universityId':
                dataString += '"' + this.universities[p[e]].name + '"' + ','
                break
              case 'facultyId':
                dataString += '"' + this.faculties[p[e]].name + '"' + ','
                break
              default:
                dataString += '"' + p[e] + '"' + ','
                break
            }
          } else {
            dataString += ','
          }
        }.bind(this))
        csvContent += dataString + '\n'
      }
      var encodedUri = encodeURI(csvContent)
      var link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', 'test.csv')
      document.body.appendChild(link)
      link.click()
    }
  },
  computed: {
    results: function () {
      return this.$store.state.dbSearchResults
    },
    professors: function () {
      var cmpFn = function (key) {
        return function (a, b) {
          if (a[key] > b[key] || !a[key]) {
            return 1
          } else if (a[key] < b[key] || !b[key]) {
            return -1
          }
          return 0
        }
      }
      if (this.k === 'university') {
        cmpFn = function (key) {
          return function (a, b) {
            if (this.universities[a.universityId].name > this.universities[b.universityId].name) {
              return 1
            } else if (this.universities[a.universityId].name < this.universities[b.universityId].name) {
              return -1
            }
            return 0
          }.bind(this)
        }.bind(this)
      }
      var academicRanksRejected = new Set(this.academicRanks.filter((_, i) => i in this.selRanks))
      var phdInstitutionsRejected = new Set(this.phdInstitutions.filter((_, i) => i in this.selPhdInsts))
      var promotionInstitutionsRejected = new Set(this.promotionInstitutions.filter((_, i) => i in this.selPromotionInsts))
      var filterFn = function (e) {
        var phdYearFilter = true
        if (!isNaN(this.minPhdYear) && ('phdYear' in e && e.phdYear < parseInt(this.minPhdYear))) {
          phdYearFilter = false
        } else if (!isNaN(this.minPhdYear) && !('phdYear' in e)) {
          phdYearFilter = false
        }
        var promotionYearFilter = true
        if (!isNaN(this.minPromotionYear) && ('promotionYear' in e && e.promotionYear < parseInt(this.minPromotionYear))) {
          promotionYearFilter = false
        } else if (!isNaN(this.minPromotionYear) && !('promotionYear' in e)) {
          promotionYearFilter = false
        }
        return (phdYearFilter || this.minPhdYear === '') && (promotionYearFilter || this.minPromotionYear === '') && !academicRanksRejected.has(e.rank) && !phdInstitutionsRejected.has(e.phdInstitution) && !promotionInstitutionsRejected.has(e.promotionInstitution)
      }.bind(this)
      return this.$store.state.dbSearchResults.sort(cmpFn(this.k)).filter(filterFn)
    },
    universities: function () {
      return this.$store.state.universities
    },
    faculties: function () {
      return this.$store.state.faculties
    },
    academicRanks: function () {
      return [...new Set(this.results.map(i => i.rank || '(Blank)'))]
    },
    phdInstitutions: function () {
      return [...new Set(this.results.map(i => i.phdInstitution || '(Blank)'))]
    },
    promotionInstitutions: function () {
      return [...new Set(this.results.map(i => i.promotionInstitution || '(Blank)'))]
    },
    saveslots: function () {
      return this.$store.state.saveslots
    }
  },
  watch: {
    'this.$store.state.uIds': function (v) {
      if (v) {
        this.uSelect.dropdown('set exactly', v)
      }
    }
  }
}
</script>

<style scoped>
#database-page {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  position: relative;
}

#mouseover-zone {
  height: 700px;
  width: 250px;
  position: absolute;
  top: calc(50vh - 350px);
  left: 0;
  z-index: 4;
}

#filter-menu {
  position: absolute;
  top: 0;
  left: 5px;
  z-index: 4;
  text-align: left;
  transform: translate3d(-255px, 0, 0);
  transition: transform .3s ease;
  opacity: 1;
}

#filter-menu.visible {
  transform: translate3d(0px, 0, 0);
}

#filters-menu > .ui.input {
  margin: 5px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

#view-menu > .menu {
  border: none;
  box-shadow: none;
}

#view-menu .item {
  display: flex;
  flex-direction: column;
  height: 56px;
  width: 88px;
  color: black;
  padding: 5px;
}

#view-menu .icon {
  font-size: large;
}

#view-menu .view-label {
  font-size: small;
}

#view-menu .item {
  border-radius: 0.28571429rem;
}

#view-menu .item.active {
  background-color: rgba(0, 0, 0, .1) !important;
}

#search-bar {
  padding: 10px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex: 0 0 auto;
}

.field.university {
  width: calc(75% - 10px);
}

.field.faculty {
  width: calc(25% - 10px);
}

.menu.sub {
  max-height: 300px;
  transform: translateY(-40px);
}
</style>
