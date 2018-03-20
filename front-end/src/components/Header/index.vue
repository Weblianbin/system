<template>
  <div class="header">
   <el-row>
      <el-col :span="4">
        <div class="iconBox" @click="openOrClose()">
          <el-button v-if="iconShow" type="primary" class="iconShow" icon="el-icon-arrow-right"></el-button>
          <el-button v-else type="primary" class="iconShow" icon="el-icon-arrow-left"></el-button>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="titleBox">
          <div class="title">
            <!-- 海鲜销售管理系统的设计与实现 -->
            海鲜销售管理系统
          </div>
          <div>
            用户名
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      iconShow: false
    }
  },
  methods: {
    openOrClose () {
      if (this.iconShow) {
        this.iconShow = false
      } else {
        this.iconShow = true
      }
      this.$emit('openOrClose', this.iconShow)
    }
  }
}
</script>
<style scoped>
.header{
  height: 50px;
  width: 100%;
  background: #409EFF;
}
.iconBox{
  height: 50px;
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
  justify-content: space-between;
  padding: 15px;
}
.title{
  font-size: 20px;
}
</style>
