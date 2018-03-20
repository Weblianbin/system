<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
  height: 100%;
  width: 100%;
}
.el-container{
  height: 100%;
  width: 100%;
}
.el-form-item__label{
  font-size: 17px !important;
  /* color: white; */
}
</style>
