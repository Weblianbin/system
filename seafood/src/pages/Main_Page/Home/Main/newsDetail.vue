<template>
  <div class="newsDetailBox">
    <div ref="newsDatailShow" v-html="content" class="content newsDatailShow">
    </div>
  </div>
</template>
<script>
export default {
  props: {
    content: ''
  },
  updated () {
    let arr = []
    arr.push(...this.$refs['newsDatailShow'][0].getElementsByTagName('img'))
    arr.map((item) => {
      item.style.height = 'auto'
      item.style.width = '80%'
    })
  }
}
</script>
<style scoped>
.newsDetailBox{
  width: 100%;
}
.newsDatailShow{
  width: 80%;
  margin: 0 auto;
}
</style>
