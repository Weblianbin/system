<template>
  <div class="Main">
    <div class="imgBox">
      <el-carousel>
        <el-carousel-item v-for="(item,index) in imgArr" :key="index">
          <img :src="item.src" class="img">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="routesBox">
      <div class="routes">
        <div class="resTitle">
          {{resTitle}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      imgArr: [
        {
          src: require('@/assets/Main/1.jpg')
        }
        // {
        //   src: require('@/assets/Main/2.jpg')
        // },
        // {
        //   src: require('@/assets/Main/3.jpg')
        // },
        // {
        //   src: require('@/assets/Main/4.jpg')
        // }
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
  padding: 15px 0;
  background-color: red;
}
.el-carousel{
  width: 80%;
  margin: 0 auto;
  /* background-color: red; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
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
.routes{
  width: 80%;
  margin: 0 auto;
}
.resTitle{
  height: 30px;
  width: 100%;
  background-color: pink;
  font-size: 20px;
  line-height: 30px;
  margin: 15px 0;
}
</style>
