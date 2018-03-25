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
        <span @click="test(item.path)">{{item.meta.title}}</span>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  watch: {
    $route () {
      console.log(this.$route)
      console.log(this.$route.matched)
      let arr = this.$route.matched
      // 路由输出是空的,导致点击无效
      arr[0].path = '/home'
      this.routesArr = arr
      console.log('this.routesArr--watch', this.routesArr)
    }
  },
  mounted () {
    let arr = this.$route.matched
    arr[0].path = '/home'
    this.routesArr = arr
    console.log('this.routesArr--mounted', this.routesArr)
  },
  data () {
    return {
      routesArr: []
    }
  },
  methods: {
    test (path) {
      console.log('path', path)
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
