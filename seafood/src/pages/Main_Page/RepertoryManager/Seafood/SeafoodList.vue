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
          prop="seafoodInfo"
          label="简介"
          >
        </el-table-column>
         <el-table-column prop="photo" label="文章相关图片" width="120">
            <template slot-scope="scope">
              <img :src="scope.row.photo" class="img" width="100" height="100"/>
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
    <el-dialog :title="titleText" modal center :visible.sync="seafoodAddOrEdit">
      <SeafoodAddOrEdit
        v-if="seafoodAddOrEdit"
        :form='formObj'
        :imgSrc='imgSrc'
        :locationUrl='locationUrl'
        @cancleHandle='cancleHandle'
        @sumitHandle='sumitHandle'
      >
      </SeafoodAddOrEdit>
    </el-dialog>
  </div>
</template>
<script>
import { seafoodTypeListAll } from '@/api/seafoodType.js'
import { seafoodList, addSeafood, editSeafood, deleteSeafood } from '@/api/seafood.js'
import SeafoodAddOrEdit from '@/components/SeafoodAddOrEdit/index.vue'
export default {
  components: {
    SeafoodAddOrEdit
  },
  data () {
    return {
      tableData: [],
      pageIndex: 1,
      pageCount: '',
      pageObj: {},
      seafoodAddOrEdit: false,
      titleText: '',
      seafoodTypes: [],
      formObj: {},
      imgSrc: '',
      locationUrl: 'http://localhost:3000/life/add'
    }
  },
  created () {
    this.seafoodTypeListAllHandle()
    this.seafoodListHandle()
  },
  methods: {
    pageChange (page) {
      this.pageIndex = page
      this.seafoodListHandle()
    },
    // 请求海鲜种类列表,不分页
    async seafoodTypeListAllHandle () {
      let res = await seafoodTypeListAll()
      this.seafoodTypes = res.data.data
    },
    // 请求海鲜名称列表
    async seafoodListHandle () {
      // 用于清空,避免重复
      let obj = {}
      obj.index = this.pageIndex
      obj.size = 2
      this.pageObj = obj
      let res = await seafoodList({
        'pageInfo': this.pageObj
      })
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
      this.imgSrc = obj.photo
      this.seafoodAddOrEdit = true
      this.titleText = '编辑海鲜名称'
    },
    // 编辑请求
    async editSeafoodHandle (data) {
      let res = await editSeafood({
        'seafood': data
      })
      if (res.data.code === '1111') {
        // 海鲜名称,修改成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.seafoodListHandle()
        this.seafoodAddOrEdit = false
        this.imgSrc = ''
      } else {
        // 海鲜名称,添加失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.seafoodAddOrEdit = true
        this.imgSrc = ''
      }
    },
    // 删除事件
    handleDelete (index, row) {
      if (JSON.parse(window.localStorage.getItem('userInfo')).account === 'lianbin') {
        this.$alert('是否删除' + row.seafoodName + '这条海鲜名称信息?', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          callback: action => {
            if (action === 'confirm') {
              this.deleteSeafoodHandle(row)
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
    async deleteSeafoodHandle (data) {
      let res = await deleteSeafood({
        'seafood': data
      })
      if (res.data.code === '1111') {
        // 删除成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.seafoodListHandle()
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
      // this.urlaction = 'http://localhost:3000/seafood/add'
      this.seafoodAddOrEdit = true
      this.titleText = '新增海鲜名称'
    },
    // 新增请求
    async addSeafoodHandle (data) {
      let res = await addSeafood({
        'seafood': data
      })
      if (res.data.code === '1111') {
        // 海鲜种类,添加成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.seafoodListHandle()
        this.seafoodAddOrEdit = false
      } else {
        // 海鲜名称,添加失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.seafoodAddOrEdit = true
      }
    },
    // 组件--修改,新增的取消和提交
    cancleHandle () {
      this.seafoodAddOrEdit = false
    },
    sumitHandle (obj, flag) {
      // 判断传入到组件中是否有这个键存在
      if (flag === '修改') {
        this.editSeafoodHandle(obj)
      } else {
        this.addSeafoodHandle(obj)
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
