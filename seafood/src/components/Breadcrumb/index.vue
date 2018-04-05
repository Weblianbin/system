<template>
  <div class="box">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"  v-if="routesArr.length===0">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        :to="{ path: item.path }"
        v-for="(item,index) in routesArr"
        :key="index"
        v-else-if="routesArr.length>0"
      >
        <span>{{item.meta.title}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  watch: {
    $route () {
      let arr = this.$route.matched
      // 路由输出是空的,导致点击无效
      arr[0].path = '/customerList'
      this.routesArr = arr
    }
  },
  mounted () {
    let arr = this.$route.matched
    arr[0].path = '/customerList'
    this.routesArr = arr
  },
  data () {
    return {
      routesArr: []
    }
  }
}
</script>
<style scoped>
.box{
  height: 50px;
  line-height: 50px;
}
.box .el-breadcrumb{
  font-size: 20px !important;
  line-height: 50px !important;
}
</style>
