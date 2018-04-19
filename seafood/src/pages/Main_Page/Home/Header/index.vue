<template>
  <div class="headerBox">
    <div class="header">
      <div class="imgBox">
        海鲜超市信息管理系统的设计与实现
      </div>
      <div class="userBox">
        <div>
          登陆
        </div>
        <div>
          |
        </div>
        <div>
          注册
        </div>
      </div>
    </div>
    <div class="nav">
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: 0,
      navArr: [
        {
          name: '首页',
          routeSrc: '/home'
        },
        {
          name: '海鲜种类',
          routeSrc: '/seafoodType'
        },
        {
          name: '海鲜名称',
          routeSrc: '/seafood'
        },
        {
          name: '精致生活',
          routeSrc: '/life'
        },
        {
          name: '海鲜圈',
          routeSrc: '/circle'
        },
        {
          name: '关于',
          routeSrc: '/about'
        }
      ]
    }
  },
  methods: {
    goItem (item, index) {
      this.$router.push(item.routeSrc)
      this.activeIndex = index
    }
  }
}
</script>
<style scoped>
.headerBox{
  width: 100%;
  height: 120px;
  background-color: white;
}
.header{
  width: 80%;
  height: 60px;
  /* background-color: red; */
  margin: 0 auto;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}
.imgBox{
  font-size: 20px;
}
.userBox{
  display: flex;
  width: 120px;
  justify-content: space-between;
}
.nav{
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 60px;
  background-color: rgba(64, 158, 225, 0.5);
  color: white;
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
  background-color: black;
}
</style>
