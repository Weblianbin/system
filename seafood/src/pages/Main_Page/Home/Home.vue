<template>
  <div class="box">
    <Header></Header>
    <div>
      <router-view></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/pages/Main_page/Home/Header/index'
import Aside from '@/pages/Main_page/Home/Aside/index'
// import Main from '@/pages/Main_page/Home/Main/index'
import Footer from '@/pages/Main_page/Home/Main/footer'
export default {
  components: {
    Header,
    Aside,
    Footer
  }
}
</script>

<style scoped>
.box{
  /* width: 100vw !important; */
  /* overflow-x: hidden; */
}
.el-container{
  /* width: 80%; */
  padding: 0 !important;
  margin: 0 !important;
  height: 100%;
}
.el-header{
  padding: 0 !important;
  margin: 0 !important;
  /* height: 120px !important; */
}
.el-main{
  padding: 0 !important;
  margin: 0 !important;
}
</style>
