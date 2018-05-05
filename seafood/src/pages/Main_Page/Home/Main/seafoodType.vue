<template>
  <div class="seafoodTypeBox">
    <div class="seafoodType ">
      <div class="title">
        <div class="name">海鲜种类简介:</div>
      </div>
      <el-row :gutter="24" class="rowBox" v-if="cardArr.length > 0">
        <el-col :span="8" class="box" v-for="(item,index) in cardArr" :key="index">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>{{item.name}}</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <div class="text item" style="height: 250px">
              <el-row :gutter="24">
                <el-col :span="5">
                  简介:
                </el-col>
                <el-col :span="19">
                  {{item.info}}
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { seafoodTypeListAll } from '@/api/seafoodType.js'
export default {
  created () {
    this.seafoodTypeListAllHandle()
  },
  data () {
    return {
      cardArr: []
    }
  },
  methods: {
    async seafoodTypeListAllHandle () {
      let res = await seafoodTypeListAll()
      this.cardArr = res.data.data
    }
  }
}
</script>

<style scoped>
.seafoodTypeBox{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.seafoodType{
  width: 1092px;
  /* background-color: red; */
  /* margin: 0 auto; */
  margin-left: 17px;
}
.title{
  font-size: 20px;
  margin-top: 20px;
  text-align: center;
  color: white;
  height: 50px;
  line-height: 50px;
}
.title .name{
  width: 30%;
  border-radius: 50%;
  height: 50px;
  background-color: #409EFF;
  margin: 0 auto;
}
.rowBox{
  padding: 20px;
}
.box{
  margin-bottom: 30px;
  line-height: 20px;
}
</style>
