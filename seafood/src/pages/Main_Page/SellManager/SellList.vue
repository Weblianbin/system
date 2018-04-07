<template>
  <div class="box">
    <div class="title">
      <el-button type="primary" @click="clickAdd()" icon="el-icon-plus" >新增</el-button>
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
          prop="seafoodName"
          label="海鲜名称"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="sellTotal"
          label="销售总量(单位kg)"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="time"
          label="日期"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination layout="prev, pager, next,jumper" :current-page="pageIndex" :page-count="pageCount || 1" @current-change="pageChange">
      </el-pagination>
    </div>
    <!-- 新增,修改 -->
    <el-dialog :title="titleText" modal center :visible.sync="sellAddOrEdit">
      <SellAddOrEdit
        v-if="sellAddOrEdit"
        :form='formObj'
        @cancleHandle='cancleHandle'
        @sumitHandle='sumitHandle'
      >
      </SellAddOrEdit>
    </el-dialog>
  </div>
</template>
<script>
import { seafoodTypeListAll } from '@/api/seafoodType.js'
import { sellList, addSell, editSell, deleteSell } from '@/api/sell.js'
import SellAddOrEdit from '@/components/sellAddOrEdit/index.vue'
import { transformDate } from '@/utils/dateTransform.js'
export default {
  components: {
    SellAddOrEdit
  },
  data () {
    return {
      tableData: [],
      pageIndex: 1,
      pageCount: '',
      pageObj: {},
      sellAddOrEdit: false,
      titleText: '',
      formObj: {},
      seafoodTypes: []
    }
  },
  created () {
    this.sellListHandle()
    this.seafoodTypeListAllHandle()
  },
  methods: {
    pageChange (page) {
      this.pageIndex = page
      this.sellListHandle()
    },
    // 请求海鲜种类列表,不分页
    async seafoodTypeListAllHandle () {
      let res = await seafoodTypeListAll()
      this.seafoodTypes = res.data.data
    },
    async sellListHandle () {
      // 用于清空,避免重复
      let obj = {}
      obj.index = this.pageIndex
      obj.size = 2
      this.pageObj = obj
      let res = await sellList({
        'pageInfo': this.pageObj
      })
      let arr = [...res.data.data]
      arr.forEach((item) => {
        item.time = transformDate(item.time)
      })
      this.tableData = arr
      this.pageCount = res.data.count
    },
    // 编辑事件
    handleEdit (index, row) {
      var obj = {}
      for (var key in row) {
        if (row.hasOwnProperty(key)) {
          obj[key] = row[key]
        }
      }
      this.formObj = obj
      this.sellAddOrEdit = true
      this.titleText = '编辑销售记录'
    },
    // 编辑请求
    async editSellHandle (data) {
      let res = await editSell({
        'sell': data
      })
      if (res.data.code === '1111') {
        // 修改成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.sellListHandle()
        this.sellAddOrEdit = false
      } else {
        // 添加失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.sellAddOrEdit = true
      }
    },
    // 删除事件
    handleDelete (index, row) {
      if (JSON.parse(window.localStorage.getItem('userInfo')).account === 'lianbin') {
        this.$alert('是否删除' + row.seafoodName + '这条销售记录?', '删除', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          callback: action => {
            if (action === 'confirm') {
              this.deleteSellHandle(row)
              this.$message({
                type: 'success',
                message: '删除成功'
              })
            } else {
              this.$message({
                type: 'info',
                message: '取消'
              })
            }
          }
        })
      } else {
        this.$message({
          type: 'error',
          message: '您好,您不是超级管理员,不能删除'
        })
      }
    },
    // 删除请求
    async deleteSellHandle (data) {
      let res = await deleteSell({
        'sell': data
      })
      if (res.data.code === '1111') {
        // 删除成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.sellListHandle()
      } else {
        // 删除失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
      }
    },
    // 新增事件
    clickAdd () {
      var obj = {}
      // select 设置初始值
      obj.seafoodTypes = this.seafoodTypes
      this.formObj = obj
      this.sellAddOrEdit = true
      this.titleText = '新增销售记录'
    },
    // 新增请求
    async addSellHandle (data) {
      let res = await addSell({
        'sell': data
      })
      if (res.data.code === '1111') {
        // 海鲜种类,添加成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.sellListHandle()
        this.sellAddOrEdit = false
      } else {
        // 海鲜种类,添加失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.sellAddOrEdit = true
      }
    },
    // 组件--修改,新增的取消和提交
    cancleHandle () {
      this.sellAddOrEdit = false
    },
    sumitHandle (obj, flag) {
      // 判断传入到组件中是否有这个键存在
      if (flag === '修改') {
        this.editSellHandle(obj)
      } else {
        this.addSellHandle(obj)
      }
    }
  }
}
</script>
<style scoped>
.box{
  width: 100%;
}
.title{
  margin-bottom: 15px;
}
.footer{
  margin: 15px 0;
}
</style>
