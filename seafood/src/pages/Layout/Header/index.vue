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
            <div>
              用户名
            </div>
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
      showAsideBoolean: false
    }
  },
  methods: {
    showAside () {
      if (this.showAsideBoolean) {
        this.showAsideBoolean = false
      } else {
        this.showAsideBoolean = true
      }
      console.log('this.showAsideBoolean', this.showAsideBoolean)
      this.$emit('showAside', this.showAsideBoolean)
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
