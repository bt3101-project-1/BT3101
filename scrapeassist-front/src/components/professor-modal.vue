<template>
  <div class="ui modal" id="professor-modal">
    <i class="close icon"></i>
    <div class="header">
      Edit Professor
    </div>
    <div class="content">
      <div class="ui form">
        <h4 class="ui dividing header">Personal Information</h4>
        <div class="field">
          <div class="fields">
            <div class="twelve wide field">
              <input type="text" placeholder="Name" v-model="prof.name">
            </div>
            <div class="four wide field">
              <input type="text" placeholder="Academic Rank" v-model="prof.rank">
            </div>
          </div>
        </div>
        <h4 class="ui dividing header">PhD Information</h4>
        <div class="field">
          <div class="fields">
            <div class="twelve wide field">
              <input type="text" placeholder="PhD Institution" v-model="prof.phdInstitution">
            </div>
            <div class="four wide field">
              <input type="text" placeholder="PhD Year" v-model="prof.phdYear">
            </div>
          </div>
        </div>
        <h4 class="ui dividing header">Last Promotion</h4>
        <div class="field">
          <div class="fields">
            <div class="twelve wide field">
              <input type="text" placeholder="Promotion Institution" v-model="prof.promotionInstitution">
            </div>
            <div class="four wide field">
              <input type="text" placeholder="Promotion Year" v-model="prof.promotionYear">
            </div>
          </div>
        </div>
        <h4 class="ui dividing header">Research Interests</h4>
        <div class="field">
          <div class="fields">
            <div class="sixteen wide field">
              <input type="text" placeholder="Research Interests" v-model="prof.researchInterests">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="ui black deny button">
        Cancel
      </div>
      <div class="ui positive right labeled icon button">
        Save
        <i class="checkmark icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prof: {
      default: function () {
        return {
          name: '',
          rank: '',
          phdYear: '',
          phdInstitution: '',
          researchInterests: '',
          promotionYear: '',
          promotionInstitution: ''
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
