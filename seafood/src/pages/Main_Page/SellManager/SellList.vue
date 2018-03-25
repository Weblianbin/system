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
    <el-dialog :title="titleText" modal center :visible.sync="seafoodTypeAddOrEdit">
      <SeafoodTypeAddOrEdit
        v-if="seafoodTypeAddOrEdit"
        :form='formObj'
        @cancleHandle='cancleHandle'
        @sumitHandle='sumitHandle'
      >
      </SeafoodTypeAddOrEdit>
    </el-dialog>
  </div>
</template>
<script>
import { seafoodTypeList, addSeafoodType, editSeafoodType, deleteSeafoodType } from '@/api/seafoodType.js'
import SeafoodTypeAddOrEdit from '@/components/SeafoodTypeAddOrEdit/index.vue'
export default {
  components: {
    SeafoodTypeAddOrEdit
  },
  data () {
    return {
      tableData: [],
      pageIndex: 1,
      pageCount: '',
      pageObj: {},
      seafoodTypeAddOrEdit: false,
      titleText: ''
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
    // 编辑事件
    handleEdit (index, row) {
      var obj = {}
      for (var key in row) {
        if (row.hasOwnProperty(key)) {
          obj[key] = row[key]
        }
      }
      this.formObj = obj
      this.seafoodTypeAddOrEdit = true
      this.titleText = '编辑海鲜种类'
    },
    // 编辑请求
    async editSeafoodTypeHandle (data) {
      console.log('编辑', data)
      let res = await editSeafoodType({
        'seafoodType': data
      })
      console.log('res', res)
      if (res.data.code === '1111') {
        // 海鲜种类,修改成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.seafoodTypeListHandle()
        this.seafoodTypeAddOrEdit = false
      } else {
        // 海鲜种类,添加失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.seafoodTypeAddOrEdit = true
      }
    },
    // 删除事件
    handleDelete (index, row) {
      this.$alert('是否删除?', '删除项目', {
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
          if (action === 'confirm') {
            this.deleteSeafoodTypeHandle(row)
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
    },
    // 删除请求
    async deleteSeafoodTypeHandle (data) {
      console.log('删除', data)
      let res = await deleteSeafoodType({
        'seafoodType': data
      })
      console.log('res', res)
      if (res.data.code === '1111') {
        // 删除成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.seafoodTypeListHandle()
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
      obj.area = []
      this.formObj = obj
      this.seafoodTypeAddOrEdit = true
      this.titleText = '新增海鲜种类'
    },
    // 新增请求
    async addSeafoodTypeHandle (data) {
      let res = await addSeafoodType({
        'seafoodType': data
      })
      console.log('res', res)
      if (res.data.code === '1111') {
        // 海鲜种类,添加成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.seafoodTypeListHandle()
        this.seafoodTypeAddOrEdit = false
      } else {
        // 海鲜种类,添加失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.seafoodTypeAddOrEdit = true
      }
    },
    // 组件--修改,新增的取消和提交
    cancleHandle () {
      this.seafoodTypeAddOrEdit = false
    },
    sumitHandle (obj, flag) {
      // 判断传入到组件中是否有这个键存在
      if (flag === '修改') {
        this.editSeafoodTypeHandle(obj)
      } else {
        this.addSeafoodTypeHandle(obj)
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
