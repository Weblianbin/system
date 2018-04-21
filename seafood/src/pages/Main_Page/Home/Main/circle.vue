<template>
  <div class="seafoodTypeBox">
    <div class="seafoodType base_background">
      <div class="title">
        海鲜新闻资讯:
      </div>
      <el-row :gutter="24" class="rowBox">
        <el-col :span="24" class="box" v-for="(item,index) in cardArr" :key="index">
          <div @click="openNews(index, item)">
            <el-row :gutter="24" style="padding:12px 0">
              <el-col :span="24" class="smallTitle">
                {{index+1}}、{{item.title}}
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="5">
                <img :src="item.photo" alt="" style="width:100%;height:100%;">
              </el-col>
              <el-col :span="19">
                <div class="content ">
                  {{item.info}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <div class="footer">
        <el-pagination layout="prev, pager, next,jumper" :current-page="pageIndex" :page-count="pageCount || 1" @current-change="pageChange">
        </el-pagination>
      </div>
      <el-dialog
        :title="title"
        :visible.sync="centerDialogVisible"
        :fullscreen='true'
        center>
        <newsDetail v-if="centerDialogVisible" :content='content'></newsDetail>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">关闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { circleList } from '@/api/circle.js'
import newsDetail from './newsDetail'
export default {
  components: {
    newsDetail
  },
  created () {
    this.circleListHandle()
  },
  data () {
    return {
      cardArr: [],
      pageIndex: 1,
      pageCount: '',
      title: '',
      centerDialogVisible: false,
      content: ''
    }
  },
  methods: {
    pageChange (page) {
      this.pageIndex = page
      this.circleListHandle()
    },
    async circleListHandle () {
      // 用于清空,避免重复
      let obj = {}
      obj.index = this.pageIndex
      obj.size = 1
      this.pageObj = obj
      let res = await circleList({
        'pageInfo': this.pageObj
      })
      this.cardArr = res.data.data
      this.pageCount = res.data.count
    },
    openNews (index, item) {
      console.log('>>>>>>>', item)
      this.content = item.content
      this.title = item.title
      this.centerDialogVisible = true
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
  cursor: pointer;
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
