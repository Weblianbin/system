<template>
  <div class="asideBox">
    <!-- :router="true" 使用这个可以实现路由跳转,框架封装的 -->
    <el-menu default-active="1" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-user faIcon"></i>
          <span slot="title">客户信息</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addCustomer">添加客户信息</el-menu-item>
          <el-menu-item index="/customerList">客户信息列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-university faIcon"></i>
          <span slot="title">库存管理</span>
        </template>
        <el-submenu index="2-1">
          <template slot="title">海鲜种类</template>
          <el-menu-item index="/addSeafoodType">添加海鲜种类</el-menu-item>
          <el-menu-item index="/seafoodTypeList">海鲜种类列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2-2">
          <template slot="title">海鲜名称</template>
          <el-menu-item index="/addSeafood">添加海鲜</el-menu-item>
          <el-menu-item index="/seafoodList">海鲜列表</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-line-chart faIcon"></i>
          <span slot="title">销售管理</span>
        </template>
        <el-menu-item-group>
         <el-menu-item index="/addSell">添加销售记录</el-menu-item>
          <el-menu-item index="/sellList">销售记录列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">海鲜销售管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addSell">添加销售记录</el-menu-item>
          <el-menu-item index="/sellList">销售记录列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
  </div>
</template>
<script>
export default {
  props: {
    isOpenOrClose: {
      type: Boolean,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    isOpenOrClose (val) {
      this.isCollapse = val
    }
  },
  data () {
    return {
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style scoped>
.asideBox{
  height: 100%;
}
.el-menu{
  background: rgb(230, 238, 247);
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}
</style>
