<template>
  <div class="Main">
    <div class="imgBox">
      <el-carousel :interval="1500" arrow="always" height="600px">
        <el-carousel-item v-for="(item,index) in imgArr" :key="index" style="text-align: center;">
          <img :src="item.src" alt="" style="width:100%;height:100%;">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="mainBox">
      <div class="main">
        <SeafoodType></SeafoodType>
        <Sell></Sell>
      </div>
    </div>
  </div>
</template>
<script>
import SeafoodType from '@/pages/Main_Page/Home/Main/seafoodType'
import Sell from '@/pages/Main_Page/Home/Main/sell'
export default {
  components: {
    SeafoodType,
    Sell
  },
  data () {
    return {
      imgArr: [
        {
          src: require('@/assets/Main/1.jpg')
        },
        {
          src: require('@/assets/Main/longxia.png')
        },
        {
          src: require('@/assets/Main/baoyu.png')
        },
        {
          src: require('@/assets/Main/qingxie.png')
        },
        {
          src: require('@/assets/Main/xia.png')
        },
        {
          src: require('@/assets/Main/luyu.png')
        }
      ],
      resTitle: '展示',
      resArr: []
    }
  },
  methods: {
    goItem (item) {
      this.$router.push(item.routeSrc)
    }
  }
}
</script>
<style scoped>
.Main{
  height: 100%;
}
.nav{
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 60px;
  line-height: 60px;
  /* background-color: rgba(64, 158, 225, 0.5);
  color: white; */
}
.title{
  cursor: pointer;
}
.imgBox{
  /* height: 300px; */
  width: 100%;
  /* padding: 15px 0; */
  /* background-color: rgba(245, 245, 245, 0.5); */
}
.el-carousel{
  margin: 0 auto;
}
.el-carousel-item{
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 300px; */
  width: 100%
}
.el-carousel-item>.img{
  width: 100%;
  height: 500px;
}
.routesBox{
  width: 100%;
}
.mainBox{
  width: 100%;
  height: 100%;
}
.main{
  width: 80%;
  /* background-color: red; */
  margin: 0 auto;
  /* padding: 30px 0; */
}
</style>
