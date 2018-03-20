<template>
  <div class="box">
    <div class="title">
      种类列表
    </div>
    <div class="tableBox">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%">
         <el-table-column
          align="center"
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="海鲜类型"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="info"
          label="简介"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleEdit(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination layout="prev, pager, next,jumper" :current-page="pageIndex" :page-count="pageCount || 1" @current-change="pageChange">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { seafoodTypeList } from '@/api/seafoodType.js'
export default {
  data () {
    return {
      tableData: [],
      pageIndex: 1,
      pageCount: '',
      pageObj: {}
    }
  },
  created () {
    this.seafoodTypeListHandle()
  },
  methods: {
    pageChange (page) {
      this.pageIndex = page
      this.seafoodTypeListHandle()
    },
    async seafoodTypeListHandle () {
      // 用于清空,避免重复
      let obj = {}
      obj.index = this.pageIndex
      obj.size = 2
      this.pageObj = obj
      console.log('this.pageObj', this.pageObj)
      let res = await seafoodTypeList({
        'pageInfo': this.pageObj
      })
      console.log('res', res)
      this.tableData = res.data.data
      this.pageCount = res.data.count
    },
    handleEdit () {
      console.log('>>>>>>>')
    }
  }
}
</script>
<style scoped>
.box{
  width: 100%;
}
.title{
  text-align: center;
  margin: 15px;
}
.footer{
  margin: 15px 0;
}
</style>
