<template>
  <div class="ui segment" id="segment">
    <div class="ui item small header">
      <div class="ui grid">
        <div class="two wide column">Name</div>
        <div class="two wide column">Current Institution</div>
        <div class="one wide column">Academic Rank</div>
        <div class="one wide column">Year of PhD</div>
        <div class="two wide column">PhD Institution</div>
        <div class="one wide column">Year of Promotion</div>
        <div class="two wide column">Promotion Institution</div>
        <div class="four wide column">Research Interests</div>
        <div class="one wide column">Actions</div>
      </div>
    </div>
    <div class="list-outer" id="results-list">
      <div class="ui relaxed divided list" tag="div" id="results-list-inner">
        <div class="ui item prof" v-for="(i, id) in professors" :class="{selected: selectedProfs.includes(i._id)}">
          <div class="ui grid">
            <div class="two wide column">{{i.name}}</div>
            <div class="two wide column">{{universities[i.universityId].name}}</div>
            <div class="one wide column">{{i.rank}}</div>
            <div class="one wide column">{{i.phdYear}}</div>
            <div class="two wide column">{{i.phdInstitution}}</div>
            <div class="one wide column">{{i.promotionYear}}</div>
            <div class="two wide column">{{i.promotionInstitution}}</div>
            <div class="four wide column">{{i.researchInterests}}</div>
            <div class="one wide column">
              <a @click="editProfessor(i)">
                <i class="pencil icon" style="color: black"></i>
              </a>
              <a>
                <i class="square icon" style="color: black" :class="{outline: !selectedProfs.includes(i._id), check: selectedProfs.includes(i._id)}" @click="selectProf(i._id)"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['professors', 'selectedProfs'],
  methods: {
    editProfessor: function (p) {
      this.$parent.$emit('editProfessor', p)
    },
    selectProf: function (profId) {
      this.$parent.$emit('selectProf', profId)
    }
  },
  computed: {
    universities: function () {
      return this.$store.state.universities
    }
  }
}
</script>

<style scoped>
#segment {
  flex: 1 1 auto;
  margin: 0px;
  border: none;
  position: relative;
  margin-top: 2px;
  padding: 0px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

#results-list {
  flex: 0 1 auto;
  overflow: auto;
}

.column {
  padding: 5px !important;
}

.ui.item.header {
  width: 100%;
  flex: 0 0 auto;
  border-bottom: 2px solid rgba(34, 36, 38, 0.15);
  margin-bottom: 0px;
}

.ui.item.prof {
  margin: 0px;
  color: rgba(0, 0, 0, 0.8);
}

.ui.grid {
  position: relative;
  width: 100%;
  margin: 0px;
}

.selected {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
