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
@import './style/reset.css';
@import './style/common.css';
.el-form-item__label{
  font-size: 17px !important;
  color: white;
}
</style>
