<template>
  <div class="mainHeaderBox">
    <div class="mainHeader">
      <div class="imgBox">
        <img src="@/assets/Main/logo.jpg" alt="" style="height:60px;">
        <div class="name">Seafood</div>
      </div>
      <div class="guide">
        <div
          v-for="(item,index) in navArr"
          :key="index"
          class="title"
          @click="goItem(item, index)"
          :class="{active: index===activeIndex}"
        >
          <div>
            {{item.name}}
          </div>
        </div>
      </div>
      <div class="userBox" v-if="!account">
        <div @click="userLogin" class="userShow">
          用户登录
        </div>
        <div>
          |
        </div>
        <div @click="userRegister" class="userShow">
          管理员登录
        </div>
      </div>
      <div v-else>
        <el-menu default-active="" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">欢迎:<span class="account">{{account}}</span></template>
            <el-menu-item index='1-1' @click='userDetail' v-if="radio">个人信息</el-menu-item>
            <el-menu-item index='1-1' @click='goSystem' v-else>返回后台</el-menu-item>
            <el-menu-item index='1-2' @click='loginOutHandle'>退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // watch: {
  //   $route (val) {
  //     console.log('>>>>>>>>>>>', val)
  //     var arr = ['/home', '/seafood', '/life', '/circle', 'about']
  //     for (let i = 0; i < arr.length; i++) {
  //       if (arr[i] === val.path) {
  //         console.log('i', i)
  //         this.activeIndex = i
  //       }
  //     }
  //   }
  // },
  data () {
    return {
      activeIndex: 0,
      navArr: [
        {
          name: '首页',
          routeSrc: '/home'
        },
        // {
        //   name: '海产品种类',
        //   routeSrc: '/seafoodType'
        // },
        {
          name: '海鲜产品',
          routeSrc: '/seafood'
        },
        {
          name: '海鲜烹饪',
          routeSrc: '/life'
        },
        {
          name: '海鲜资讯',
          routeSrc: '/circle'
        },
        {
          name: '联系我们',
          routeSrc: '/about'
        }
      ],
      isLogin: true,
      isManager: true
    }
  },
  created () {
    // console.log('this---', this.$route.query)
    // console.log('store', this.$store.getters.radio)
    // if (this.$route.query.hasOwnProperty('show')) {
    //   this.isLogin = false
    //   this.account()
    // }
  },
  computed: {
    account () {
      let result = ''
      if (JSON.parse(window.localStorage.getItem('userInfo'))) {
        result = JSON.parse(window.localStorage.getItem('userInfo')).account
      } else {
        result = ''
      }
      return result
    },
    radio () {
      let result = ''
      if (JSON.parse(window.localStorage.getItem('userInfo'))) {
        result = JSON.parse(window.localStorage.getItem('userInfo')).radio
      } else {
        result = ''
      }
      return result
    }
  },
  methods: {
    goItem (item, index) {
      this.$router.push(item.routeSrc)
      this.activeIndex = index
    },
    userLogin () {
      console.log('用户登录')
      this.$router.push('/userLogin')
    },
    userRegister () {
      console.log('用户注册')
      this.$router.push('/login')
    },
    loginOutHandle () {
      this.$store.dispatch('loginOut')
      this.$router.push('/')
      window.location.reload()
    },
    handleSelect (key, keyPath) {
    },
    // 个人信息
    userDetail () {
      this.$router.push('/userDetail')
    },
    goSystem () {
      this.$router.push('/customerList')
    }
  }
}
</script>
<style scoped>
.mainHeaderBox{
  width: 100%;
  /* height: 120px; */
  background-color: white;
}
.mainHeader{
  width: 1092px;
  height: 60px;
  /* background-color: red; */
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.imgBox{
  font-size: 30px;
  color: #409EFF;
  position: relative;
}
.name{
  position: absolute;
  top: 15px;
  left: 65px;
}
.userBox{
  display: flex;
  width: 200px;
  justify-content: space-between;
  line-height: 60px;
  text-align: center;
  color:  #409Eff;
}
.userShow{
  cursor: pointer;
  /* background-color: #409Eff; */
  /* height: 30; */
}
.guide{
  width: 60%;
  /* margin: 0 auto; */
  display: flex;
  /* justify-content: space-between; */
  height: 60px;
  margin-left: 350px;
  /* background-color: rgba(30, 144, 255, 0.5); */
  /* color: white; */
}
.title{
  cursor: pointer;
  width: 100px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  margin-top: 15px;
  border-radius: 15px;
}
.active{
  background-color: #409EFF;
  color: white;
}
</style>
