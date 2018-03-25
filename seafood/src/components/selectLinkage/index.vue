<template>
  <div class="selectContent">
    <area-cascader class="selectBox" type='text' :level='1' v-model="selected"></area-cascader>
  </div>
</template>
<script>
export default {
  props: {
    selectedArr: {
      type: Array,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    selected (val) {
      console.log('val', val)
      this.$emit('selectedHandle', val)
    }
  },
  data () {
    return {
      selected: this.selectedArr
    }
  }
}
</script>
<style lang="stylus" scoped>
.selectBox
  .area-select
    span.area-selected-trigger
      padding 1px 5px
</style>
