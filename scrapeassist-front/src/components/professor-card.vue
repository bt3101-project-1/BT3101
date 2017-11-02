<template>
  <div class="ui card" :class="{selected: selected}">
    <div class="content header" :class="{selected: selected}">
      <!-- <a><i class="right floated remove icon"></i></a> -->
      <a @click="editProfessor"><i class="right floated pencil icon"></i></a>
      <a><i class="right floated square icon" v-if="showCheckbox" :class="{outline: !selected, check: selected}" @click="selectProf"></i></a>
      <div class="header">{{prof.name}}</div>
      <div class="meta">
        <span :class="{unknown: !prof.rank, 'selected-field': selectedField === 'rank' && selected}" @click="selectField('rank')">
          {{prof.rank ? prof.rank : 'Unknown Academic Rank'}}
        </span> <br>
        {{universities[prof.universityId].name}}
      </div>
    </div>
    <div class="content">
      <h4 class="ui sub header">PhD</h4>
      <span :class="{unknown: !prof.phdInstitution, 'selected-field': selectedField === 'phdInstitution' && selected}" @click="selectField('phdInstitution')">
        {{prof.phdInstitution ? prof.phdInstitution : 'Unknown Institution'}}
      </span>,
      <span :class="{unknown: !prof.phdYear, 'selected-field': selectedField === 'phdYear' && selected}" @click="selectField('phdYear')">
        {{prof.phdYear ? prof.phdYear : 'Unknown Year'}}
      </span>
      <h4 class="ui sub header">Last Promotion</h4>
      <span :class="{unknown: !prof.promotionInstitution, 'selected-field': selectedField === 'promotionInstitution' && selected}" @click="selectField('promotionInstitution')">
        {{prof.promotionInstitution ? prof.promotionInstitution : 'Unknown Institution'}}
      </span>,
      <span :class="{unknown: !prof.promotionYear, 'selected-field': selectedField === 'promotionYear' && selected}" @click="selectField('promotionYear')">
        {{prof.promotionYear ? prof.promotionYear : 'Unknown Year'}}
      </span>
      <h4 class="ui sub header">Research Interests</h4>
      <span :class="{unknown: !prof.researchInterests, 'selected-field': selectedField === 'researchInterests' && selected}" @click="selectField('researchInterests')">
        {{prof.researchInterests ? prof.researchInterests : 'Unknown'}}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['prof', 'selected', 'idx', 'showCheckbox', 'selectedField'],
  methods: {
    select: function () {
      this.$parent.$emit('select', this.idx)
    },
    editProfessor: function () {
      this.$parent.$emit('editProfessor', this.prof)
    },
    selectProf: function () {
      this.$parent.$emit('selectProf', this.prof._id)
    },
    selectField: function (field) {
      console.log('clicked!')
      this.$parent.$emit('selectField', field)
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
i.right.floated {
  color: black;
}

.content.header {
  flex: 0 1 auto !important;
}

.ui.card .unknown {
  color: red;
}

.ui.card .selected-field {
  background-color: yellow;
}

.ui.card.selected {
  box-shadow: 0px 1px 3px 0px #777777, 0px 0px 0px 1px #777777;
  background-color: rgba(0, 0, 0, 0.07);
}
</style>
