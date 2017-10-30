<template>
  <div class="ui mini modal" id="save-modal">
    <i class="close icon"></i>
    <div class="header">
      Save Selection
    </div>
    <div class="content">
      <div class="ui input">
        <input placeholder="Name this selection..." type="text" v-model="name">
      </div>
    </div>
    <div class="actions">
      <div class="ui black deny button">
        Cancel
      </div>
      <div class="ui positive right labeled icon button" @click="save">
        Save
        <i class="checkmark icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      name: ''
    }
  },
  methods: {
    save: function () {
      if (this.name) {
        this.$parent.$emit('saveSelection', this.name)
      }
    }
  }
}
</script>

<style>
.ui.input {
  width: 100%;
}
</style>
