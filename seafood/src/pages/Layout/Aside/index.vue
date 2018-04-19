<template>
  <el-menu default-active="1-4-1" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="showAsideBoolean">
      <el-menu-item index="/home">
        <i class="fa fa-fort-awesome faIcon" aria-hidden="true"></i>
        前台主界面
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-user faIcon"></i>
          <span slot="title">客户信息管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/customerList">
            <i class="el-icon-menu"></i>
            客户信息列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-university faIcon"></i>
          <span slot="title">海鲜进货管理</span>
        </template>
        <el-submenu index="2-1">
          <template slot="title">海鲜种类</template>
          <el-menu-item index="/seafoodTypeList">
            <i class="el-icon-menu"></i>
            海鲜种类列表
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2-2">
          <template slot="title">海鲜名称</template>
          <el-menu-item index="/seafoodList">
            <i class="el-icon-menu"></i>
            海鲜名称列表
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-line-chart faIcon"></i>
          <span slot="title">海鲜销售管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/sellList">
            <i class="el-icon-menu"></i>海鲜销售列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="fa fa-file-word-o faIcon" aria-hidden="true"></i>
          <span slot="title">精致生活文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/lifeList">
            <i class="el-icon-menu"></i>精致生活文章列表
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="fa fa-file-word-o faIcon" aria-hidden="true"></i>
          <span slot="title">海鲜圈文章管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/circleList">
            <i class="el-icon-menu"></i>海鲜圈文章列表
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
    }
  }
}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-height: 400px;
}
</style>
