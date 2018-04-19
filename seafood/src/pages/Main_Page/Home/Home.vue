<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import Header from '@/pages/Main_page/Home/Header/index'
import Aside from '@/pages/Main_page/Home/Aside/index'
// import Main from '@/pages/Main_page/Home/Main/index'
export default {
  components: {
    Header,
    Aside
  }
}
</script>

<style scoped>
.el-container{
  /* width: 80%; */
  padding: 0 !important;
  margin: 0 !important;
  height: 100%;
}
.el-header{
  padding: 0 !important;
  margin: 0 !important;
  height: 120px !important;
}
.el-main{
  padding: 0 !important;
  margin: 0 !important;
}
</style>
