<template>
  <el-menu default-active="1-4-1" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="showAsideBoolean">
      <!-- <el-submenu index="0">
        <template slot="title">
          <i class="fa fa-home faIcon"></i>
          <span slot="title">主页</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            Home
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
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
          <span slot="title">海鲜库存管理</span>
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
            海鲜列表
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
