<template>
  <div class="header">
   <el-row>
      <el-col :span="2">
        <div class="iconBox" @click="showAside()">
          <el-button v-if="showAsideBoolean" type="primary" class="iconShow" icon="el-icon-arrow-right"></el-button>
          <el-button v-else type="primary" class="iconShow" icon="el-icon-arrow-left"></el-button>
        </div>
      </el-col>
      <el-col :span="22">
        <div class="titleBox">
          <div class="box">
            <div class="title">
              <!-- 海鲜销售管理系统的设计与实现 -->
              <b>海鲜销售管理系统</b>
            </div>
            <el-menu default-active="" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-submenu index="1">
                <template slot="title">欢迎管理员:<span class="account">{{account}}</span></template>
                <el-menu-item index='1-1' @click='managerDetail'>个人信息</el-menu-item>
                <el-menu-item index='1-2' @click='loginOutHandle'>退出</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  created () {
    this.getAccount()
  },
  computed: {
    account () {
      var result = null
      if (this.$store.state.user.account) {
        result = this.$store.state.user.account
      } else {
        result = JSON.parse(window.localStorage.getItem('userInfo')).account
      }
      return result
    }
  },
  watch: {
    account (val) {
      // this.userIcons = val
    }
  },
  data () {
    return {
      showAsideBoolean: false,
      activeIndex: '1'
    }
  },
  methods: {
    showAside () {
      if (this.showAsideBoolean) {
        this.showAsideBoolean = false
      } else {
        this.showAsideBoolean = true
      }
      this.$emit('showAside', this.showAsideBoolean)
    },
    loginOutHandle () {
      this.$store.dispatch('loginOut')
      this.$router.push('/login')
    },
    // 从本地读取信息
    getAccount () {
    },
    // 个人信息
    managerDetail () {
      this.$router.push('/managerDetail')
    },
    handleSelect (key, keyPath) {
    }
  }
}
</script>
<style scoped>
.header{
  height: 100%;
  width: 100%;
  border-bottom: 1px solid lightgray;
}
.iconBox{
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.iconBox .iconShow{
  /* color: pink; */
  /* font-size: 20px; */
  /* cursor: pointer; */
}
.titleBox{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  line-height: 60px;
  /* padding: 0 0 0 15px; */
}
.box{
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.title{
  font-size: 20px;
}

</style>
