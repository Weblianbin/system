<template>
  <el-container>
    <Aside :showAsideBoolean='showAsideBoolean' :class="{widthBox: !showAsideBoolean}"></Aside>
    <el-container>
      <el-header>
        <Header @showAside='showAside'></Header>
      </el-header>
      <el-main>
        <!-- 子路由展示 -->
        <div class="breadCrumbBox">
          <Breadcrumb></Breadcrumb>
        </div>
        <div>
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Aside from '@/pages/Layout/Aside/index.vue'
import Header from '@/pages/Layout/Header/index.vue'
// 面包屑
import Breadcrumb from '@/components/Breadcrumb/index.vue'
export default {
  components: {
    Aside,
    Header,
    Breadcrumb
  },
  watch: {
    $route (val) {
    }
  },
  data () {
    return {
      showAsideBoolean: false
    }
  },
  methods: {
    showAside (val) {
      this.showAsideBoolean = val
    }
  }
}
</script>

<style scoped>
.el-container{
  height: 100%;
  width: 100%;
}
.el-header {
  color: #333;
  font-size: 20px;
  padding: 0 15px 0 0!important;
}
.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  height: 100%;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  /* text-align: center; */
  height: 100%;
  padding: 0 15px !important;
}
.widthBox{
  width: 300px;
}
.breadCrumbBox{
  height: 50px;
  width: 100%;
}
</style>
