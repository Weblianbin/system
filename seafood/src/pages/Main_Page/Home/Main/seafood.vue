<template>
  <div class="seafoodTypeBox">
    <div class="seafoodType base_background">
      <div class="title">
        海产品:
      </div>
      <el-row :gutter="24" class="rowBox">
        <el-col :span="12" class="box" v-for="(item,index) in cardArr" :key="index">
          <el-card class="box-card" style="height: 200px">
            <div slot="header" class="clearfix">
              <span>{{item.seafoodName}}</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <div class="text item">
              <el-row :gutter="24">
                <el-col :span="5">
                  <img :src="item.photo" alt="" style="width:100%;">
                </el-col>
                <el-col :span="19">
                  {{item.seafoodInfo}}
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div class="footer">
        <el-pagination layout="prev, pager, next,jumper" :current-page="pageIndex" :page-count="pageCount || 1" @current-change="pageChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { seafoodList } from '@/api/seafood.js'
export default {
  created () {
    this.seafoodListHandle()
  },
  data () {
    return {
      pageIndex: 1,
      pageCount: '',
      cardArr: []
    }
  },
  methods: {
    pageChange (page) {
      this.pageIndex = page
      this.seafoodListHandle()
    },
    async seafoodListHandle () {
      // 用于清空,避免重复
      let obj = {}
      obj.index = this.pageIndex
      obj.size = 2
      this.pageObj = obj
      let res = await seafoodList({
        'pageInfo': this.pageObj
      })
      this.cardArr = res.data.data
      this.pageCount = res.data.count
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
  /* margin-left: 17px; */
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
.footer{
  margin: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
