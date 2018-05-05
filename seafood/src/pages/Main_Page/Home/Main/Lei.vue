<template>
  <div class="seafoodTypeBox">
    <!-- <div class="imgBox" style="height:600px;width:100%;">
      <img src="@/assets/Main/海产品.jpg" alt="" style="width:100%;height:100%;">
    </div> -->
    <div class="seafoodType">
      <el-form>
        <el-form-item label="" label-width="0px">
          <el-input  style="width:300px;margin: 0 auto" size="large" placeholder="请输人查询内容..." v-model="search" suffix-icon="el-icon-search"></el-input>
        </el-form-item>
      </el-form>
      <div class="title">
        <div class="name">海鲜种类:&nbsp;&nbsp;{{leiHandle}}</div>
      </div>
      <el-row :gutter="24" class="rowBox">
        <el-col :span="12" class="box" v-for="(item,index) in tableData1" :key="index">
          <div>
            <el-card class="box-card" style="height: 250px;">
              <div slot="header" class="clearfix">
                <span>{{item.seafoodName}}</span>
                <el-tooltip class="item" effect="dark" content="点击查看详细信息" placement="right-start">
                  <el-button style="float: right; padding: 3px 0" type="text" @click="openNews(index, item)">查看详情</el-button>
                </el-tooltip>
              </div>
              <div class="text item">
                <el-row :gutter="24">
                  <el-col :span="10">
                    <img :src="item.photo" alt="" style="width:80%;">
                  </el-col>
                  <el-col :span="14">
                    <div>
                      上市时间:&nbsp;&nbsp;{{item.time}}
                    </div>
                    <div>
                      价格:&nbsp;&nbsp;{{item.sale}}
                    </div>
                    <div>
                      库存量(kg):&nbsp;&nbsp;{{item.count}}
                    </div>
                    <div>
                      产地:&nbsp;&nbsp;{{item.source}}
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <!-- <div class="footer">
        <el-pagination layout="prev, pager, next,jumper" :current-page="pageIndex" :page-count="pageCount || 1" @current-change="pageChange">
        </el-pagination>
      </div> -->
    </div>
    <el-dialog
      :title="title"
      :visible.sync="centerDialogVisible"
      center>
      <seafoodDetail v-if="centerDialogVisible" :content='content'></seafoodDetail>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { leiList } from '@/api/seafood.js'
import seafoodDetail from './seafoodDetail'
import { transformDate } from '@/utils/dateTransform.js'
export default {
  components: {
    seafoodDetail
  },
  created () {
    let text = null
    text = this.leiHandle
    this.seafoodListHandle(text)
  },
  watch: {
    leiHandle (val) {
      this.seafoodListHandle(val)
    }
  },
  computed: {
    tableData1: function () {
      var arr = this.cardArr
      var search = this.search
      if (!search) {
        return arr
      }
      search = search.trim().toLowerCase()
      arr = arr.filter(function (item) {
        if (item.seafoodName.toLowerCase().indexOf(search) !== -1) {
          return item
        }
      })
      return arr
    },
    leiHandle () {
      let result = ''
      result = this.$store.getters.lei
      return result
    }
  },
  data () {
    return {
      pageIndex: 1,
      pageCount: '',
      cardArr: [],
      content: {},
      title: '',
      centerDialogVisible: false,
      search: '',
      lei: ''
    }
  },
  methods: {
    test () {
    },
    pageChange (page) {
      this.pageIndex = page
      this.seafoodListHandle()
    },
    async seafoodListHandle (text) {
      // 用于清空,避免重复
      // let obj = {}
      // obj.index = this.pageIndex
      // obj.size = 4
      // this.pageObj = obj
      let res = await leiList({
        text: text
      })
      let arr = [...res.data.data]
      arr.forEach((item) => {
        item.time = transformDate(item.time)
      })
      this.cardArr = arr
      // this.pageCount = res.data.count
    },
    openNews (index, item) {
      this.content = item
      this.title = item.seafoodName
      this.centerDialogVisible = true
    }
  }
}
</script>

<style scoped>
.seafoodTypeBox{
  width: 100%;
  height: 100%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.seafoodType{
  width: 1092px;
  /* background-color: red; */
  margin: 0 auto;
  /* margin-left: 17px; */
}
.title{
  font-size: 20px;
  /* margin-top: 20px; */
  text-align: center;
  color: white;
  height: 50px;
  line-height: 50px;
}
.title .name{
  width: 20%;
  border-radius: 50px;
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
  cursor: pointer;
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
