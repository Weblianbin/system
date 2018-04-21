<template>
  <div class="seafoodTypeBox">
    <div class="seafoodType base_background">
      <div class="title">
        海鲜做法大全:
      </div>
      <el-row :gutter="24" class="rowBox">
        <el-col :span="24" class="box" v-for="(item,index) in cardArr" :key="index">
          <el-row :gutter="24" style="padding:12px 0">
            <el-col :span="5" class="smallTitle">
              {{item.title}}
            </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="5">
              <img :src="item.photo" alt="">
            </el-col>
            <el-col :span="19">
              <div v-html="item.content" class="content">
              </div>
            </el-col>
          </el-row>
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
import { lifeList } from '@/api/life.js'
export default {
  created () {
    this.lifeListHandle()
  },
  data () {
    return {
      cardArr: [],
      pageIndex: 1,
      pageCount: ''
    }
  },
  methods: {
    // async allListHandle () {
    //   let res = await allList()
    //   this.cardArr = res.data.data
    //   console.log('res', res)
    // },
    pageChange (page) {
      this.pageIndex = page
      this.lifeListHandle()
    },
    async lifeListHandle () {
      // 用于清空,避免重复
      let obj = {}
      obj.index = this.pageIndex
      obj.size = 1
      this.pageObj = obj
      let res = await lifeList({
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
  /* margin-left: 12px; */
}
.title{
  font-size: 20px;
  padding: 20px 15px;
}
.rowBox{
  padding: 20px;
}
.box{
  margin-bottom: 30px;
  padding-bottom: 15px;
  line-height: 20px;
  border-bottom: 1px solid white;
}
.content{
  line-height: 22px;
}
.footer{
  margin: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
