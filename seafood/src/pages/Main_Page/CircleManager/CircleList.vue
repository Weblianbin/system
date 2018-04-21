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
          prop="title"
          label="文章标题"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="author"
          label="作者"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="time"
          label="日期"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="info"
          label="新闻简介"
          >
        </el-table-column>
        <el-table-column
          align="center"
          prop="content"
          label="内容"
          >
        </el-table-column>
        <el-table-column prop="photo" label="文章相关图片" width="120">
            <template slot-scope="scope">
              <img :src="scope.row.photo" class="img" width="100" height="100" />
            </template>
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
    <el-dialog :title="titleText" modal center :visible.sync="circleAddOrEdit">
      <CircleAddOrEdit
        v-if="circleAddOrEdit"
        :form='formObj'
        :imgSrc='imgSrc'
        :locationUrl='locationUrl'
        @cancleHandle='cancleHandle'
        @sumitHandle='sumitHandle'
      >
      </CircleAddOrEdit>
    </el-dialog>
  </div>
</template>
<script>
import { circleList, addCircle, editCircle, deleteCircle } from '@/api/circle.js'
import CircleAddOrEdit from '@/components/CircleAddOrEdit/index.vue'
import { transformDate } from '@/utils/dateTransform.js'
export default {
  components: {
    CircleAddOrEdit
  },
  data () {
    return {
      tableData: [],
      pageIndex: 1,
      pageCount: '',
      pageObj: {},
      circleAddOrEdit: false,
      titleText: '',
      formObj: {},
      seafoodTypes: [],
      imgSrc: '',
      locationUrl: 'http://localhost:3000/circle/add'
    }
  },
  created () {
    this.circleListHandle()
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
      obj.size = 2
      this.pageObj = obj
      let res = await circleList({
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
      this.imgSrc = this.formObj.photo
      this.circleAddOrEdit = true
      this.titleText = '编辑'
    },
    // 编辑请求
    async editCircleHandle (data) {
      let res = await editCircle({
        'circle': data
      })
      if (res.data.code === '1111') {
        // 修改成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.circleListHandle()
        this.circleAddOrEdit = false
        this.imgSrc = ''
      } else {
        // 添加失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.circleAddOrEdit = true
        this.imgSrc = ''
      }
    },
    // 删除事件
    handleDelete (index, row) {
      if (JSON.parse(window.localStorage.getItem('userInfo')).account === 'lianbin') {
        this.$alert('是否删除' + row.title + '这条篇?', '删除', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          callback: action => {
            if (action === 'confirm') {
              this.deleteCircleHandle(row)
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
    async deleteCircleHandle (data) {
      let res = await deleteCircle({
        'circle': data
      })
      if (res.data.code === '1111') {
        // 删除成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.circleListHandle()
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
      this.circleAddOrEdit = true
      this.titleText = '新增'
    },
    // 新增请求
    async addCircleHandle (data) {
      let res = await addCircle({
        'circle': data
      })
      if (res.data.code === '1111') {
        // 添加成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.circleListHandle()
        this.circleAddOrEdit = false
      } else {
        // 添加失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.circleAddOrEdit = true
      }
    },
    // 组件--修改,新增的取消和提交
    cancleHandle () {
      this.circleAddOrEdit = false
    },
    sumitHandle (obj, flag) {
      // 判断传入到组件中是否有这个键存在
      if (flag === '修改') {
        this.editCircleHandle(obj)
      } else {
        this.addCircleHandle(obj)
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
