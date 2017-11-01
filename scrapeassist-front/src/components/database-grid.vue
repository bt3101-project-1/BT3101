<template>
  <div class="ui segment" id="segment">
    <div class="ui six cards">
      <profCard v-for="(i,id) in professors" :showCheckbox="true" :prof="i" :key="id" :selected="selectedProfs.includes(i._id)"></profCard>
    </div>
  </div>
</template>

<script>
import profCard from '@/components/professor-card'
export default {
  components: {
    profCard: profCard
  },
  mounted: function () {
    this.$on('editProfessor', function (p) {
      this.$parent.$emit('editProfessor', p)
    }.bind(this))
    this.$on('selectProf', function (profId) {
      this.selectProf(profId)
    }.bind(this))
  },
  props: ['professors', 'selectedProfs'],
  methods: {
    selectProf: function (profId) {
      this.$parent.$emit('selectProf', profId)
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
  margin-top: 0px;
  padding: 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

.ui.six.cards {
  margin: 0px;
  overflow: auto;
}

.ui.card {
  text-align: left;
  margin: 3px !important;
  width: calc( 16.666666666% - 6px) !important;
  color: black;
}

.ui.card.selected {
  background-color: rgba(0, 0, 0, 0.05);
}
</style>
