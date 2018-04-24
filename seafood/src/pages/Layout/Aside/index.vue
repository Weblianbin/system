<template>
  <el-menu default-active="1-4-1" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="showAsideBoolean">
      <el-submenu index="0">
        <template slot="title">
          <i class="fa fa-university faIcon"></i>
          <span slot="title">前台展示</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="" @click="goSeafood">
            <i class="el-icon-menu"></i>
            前台主界面
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-sitemap faIcon" aria-hidden="true"></i>
          <span slot="title">客户信息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/customerList">
            <i class="el-icon-menu"></i>
            客户信息列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-sitemap faIcon" aria-hidden="true"></i>
          <span slot="title">海鲜种类管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/seafoodTypeList">
            <i class="el-icon-menu"></i>
            海鲜种类列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-sitemap faIcon" aria-hidden="true"></i>
          <span slot="title">海鲜产品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/seafoodList">
            <i class="el-icon-menu"></i>
            海鲜产品列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="fa fa-sitemap faIcon" aria-hidden="true"></i>
          <span slot="title">海鲜销量管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/sellList">
            <i class="el-icon-menu"></i>海鲜销量列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="fa fa-sitemap faIcon" aria-hidden="true"></i>
          <span slot="title">海鲜烹饪文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/lifeList">
            <i class="el-icon-menu"></i>海鲜烹饪文章列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="fa fa-sitemap faIcon" aria-hidden="true"></i>
          <span slot="title">海鲜资讯管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/circleList">
            <i class="el-icon-menu"></i>海鲜资讯列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
  </el-menu>
</template>
<script>
export default {
  props: {
    showAsideBoolean: {
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
    },
    handleClose (key, keyPath) {
    },
    goSeafood () {
      this.$router.push({path: '/home', query: {show: 1}})
    }
  }
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}
</style>
