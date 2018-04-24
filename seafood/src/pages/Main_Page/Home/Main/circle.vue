<template>
  <div class="seafoodTypeBox">
    <div class="seafoodType">
      <!-- <div class="title">
        海鲜新闻资讯:
      </div> -->
      <el-form>
        <el-form-item label="" label-width="0px">
          <el-input  style="width:300px;margin: 0 auto" size="large" placeholder="请输人查询内容..." v-model="search" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
      </el-form>
      <el-row :gutter="24" class="rowBox">
        <el-col :span="11" class="box" v-for="(item,index) in tableData1" :key="index">
          <div @click="openNews(index, item)">
            <el-row :gutter="24" style="padding:12px 0">
              <el-col :span="24" class="smallTitle">
                {{index+1}}、{{item.title}}
              </el-col>
            </el-row>
            <el-row :gutter="24">
              <el-col :span="8">
                <img :src="item.photo" alt="" style="width:100%;height:100%;">
              </el-col>
              <el-col :span="16">
                <div class="content ">
                  {{strTextSliceHandle(item.info)}}
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
      <!-- <div class="footer">
        <el-pagination layout="prev, pager, next,jumper" :current-page="pageIndex" :page-count="pageCount || 1" @current-change="pageChange">
        </el-pagination>
      </div> -->
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
import { allList } from '@/api/circle.js'
import newsDetail from './newsDetail'
import { strTextSlice } from '@/utils/arrOrStr.js'
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
      content: '',
      search: ''
    }
  },
  computed: {
    tableData1 () {
      var arr = this.cardArr
      var search = this.search
      if (!search) {
        return arr
      }
      search = search.trim().toLowerCase()
      arr = arr.filter(function (item) {
        if (item.title.toLowerCase().indexOf(search) !== -1) {
          return item
        }
      })
      // this.pageCount = Math.ceil(arr.length / 1)
      console.log('arr', arr)
      return arr
    }
  },
  methods: {
    strTextSliceHandle (str) {
      return strTextSlice(str)
    },
    pageChange (page) {
      this.pageIndex = page
      this.circleListHandle()
    },
    async circleListHandle () {
      // 用于清空,避免重复
      // let obj = {}
      // obj.index = this.pageIndex
      // obj.size = 1
      // this.pageObj = obj
      let res = await allList()
      this.cardArr = res.data.data
      // this.pageCount = res.data.count
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
  display: flex;
  justify-content: space-around;
}
.box{
  margin-bottom: 30px;
  padding-bottom: 15px;
  line-height: 20px;
  border-bottom: 1px solid white;
  cursor: pointer;
  border: 1px solid lightgray;
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
.el-form{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
</style>
