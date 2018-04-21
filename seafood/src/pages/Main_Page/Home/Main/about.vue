<template>
  <div class="seafoodTypeBox">
    <div class="seafoodType base_background">
      <div class="title">
        本海鲜超市拥有的海鲜分类:
      </div>
      <el-row :gutter="24" class="rowBox">
        <el-col :span="8" class="box" v-for="(item,index) in cardArr" :key="index">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{item.name}}</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <div class="text item">
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
      console.log('res', res)
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
  font-size: 16px;
  padding: 20px 15px;
}
.rowBox{
  padding: 20px;
}
.box{
  margin-bottom: 30px;
  line-height: 20px;
}
</style>
