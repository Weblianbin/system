<template>
  <div class="box app-container">
    <div class="top">
      <el-button type="primary" @click="clickAddProject()" icon="el-icon-plus" >新增</el-button>
    </div>
    <div class="table">
      <el-table
        stripe
        border
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentTableChange"
        style="width: 100%">
        <el-table-column
          align='center'
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          align='center'
          property="item_name"
          label="项目名称"
          >
        </el-table-column>
        <el-table-column
          align='center'
          property="integrator"
          label="集成商名称"
          >
        </el-table-column>
        <el-table-column
          align='center'
          property="area"
          label="所属区域">
        </el-table-column>
        <el-table-column
          align='center'
          property="deploy_time"
          label="部署时间">
        </el-table-column>
        <el-table-column
          align='center'
          width='100'
          property="auth_num"
          label="授权数量">
        </el-table-column>
        <el-table-column
          align='center'
          width='100'
          property="client_num"
          label="终端数量">
        </el-table-column>
        <el-table-column label="操作" fixed="right" width='240' align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleLook(scope.$index, scope.row)" plain>
              查看
            </el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)" plain>
              编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)" plain>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pageBox block" v-if="tableData.length>0">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[50, 100, 200, 500]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
    <!-- 新增,修改 -->
    <el-dialog :title="titleText" modal center :visible.sync="projcetAddOrEditShow">
      <projcetAddOrEdit
      v-if="projcetAddOrEditShow"
      :form='formObj'
      @cancleHandle='cancleHandle'
      @sumitHandle='sumitHandle'
      >
      </projcetAddOrEdit>
    </el-dialog>
  </div>
</template>
<script>
import { projcetList, deleteProjcet, editProjcet, addProjcet } from '@/api/projectManager.js'
import projcetAddOrEdit from '@/components/projectAddOrEdit/index.vue'
import { arrToStr, strToArr } from '@/utils/arrOrStr.js'
export default {
  components: {
    projcetAddOrEdit
  },
  data () {
    return {
      tableData: [],
      currentRow: null,
      currentPage: null,
      pageSize: 10,
      totalCount: null,
      titleText: '',
      dialogFormVisible: false,
      formObj: null,
      projcetAddOrEditShow: false
    }
  },
  created () {
    this.projcetListHandle()
  },
  methods: {
    setCurrent (row) {
      this.$refs.singleTable.setCurrentRow(row)
    },
    handleCurrentTableChange (val) {
      this.currentRow = val
    },
    // 查看
    handleLook (index, row) {
      this.$router.push({
        path: '/detail',
        query: {
          item_id: row.item_id
        }
      })
    },
    // 编辑
    handleEdit (index, row) {
      var obj = {}
      for (var key in row) {
        if (row.hasOwnProperty(key)) {
          obj[key] = row[key]
        }
      }
      // obj = row
      // 这个不是在这里处理的
      obj.area = strToArr(obj.area)
      this.formObj = obj
      this.projcetAddOrEditShow = true
      this.titleText = '编辑项目'
    },
    // 删除
    handleDelete (index, row) {
      this.$alert('是否删除?', '删除项目', {
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        callback: action => {
          if (action === 'confirm') {
            this.projcetDeleteHandle(row.item_id)
            // 假效果
            var arr = []
            arr.push(...this.tableData)
            for (let i = 0; i < arr.length; i++) {
              if (i === index) {
                arr.splice(index, 1)
              }
            }
            this.tableData = arr
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
      // this.projcetDeleteHandle(row.item_id)
    },
    // 删除
    async projcetDeleteHandle (id) {
      try {
        await deleteProjcet({
          'item_id': id
        })
      } catch (e) {
        console.log('e', e)
      }
    },
    // 请求数据
    async projcetListHandle () {
      try {
        var res = await projcetList()
        console.log('res', res)
        this.tableData = res.list
        this.totalCount = res.total_count
        this.currentPage = res.current_page
      } catch (e) {
        console.log('e', e)
      }
    },
    // 分页
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    // 新增
    clickAddProject () {
      var obj = {}
      // select 设置初始值
      obj.area = []
      this.formObj = obj
      this.projcetAddOrEditShow = true
      this.titleText = '新增项目'
    },
    // 新增项目
    async addProjcetHandle (obj) {
      try {
        await addProjcet(obj)
      } catch (e) {
        console.log('e', e)
      }
    },
    // 修改
    async editProjcetHandle (obj) {
      try {
        await editProjcet(obj)
      } catch (e) {
        console.log('e', e)
      }
    },
    // 组件--修改,新增的取消和提交
    cancleHandle () {
      this.projcetAddOrEditShow = false
    },
    sumitHandle (obj, flag) {
      var str = null
      str = arrToStr(obj.area)
      obj.area = str
      this.projcetAddOrEditShow = false
      // 判断传入到组件中是否有这个键存在
      if (flag === '修改') {
        this.editProjcetHandle(obj)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      } else {
        this.addProjcetHandle(obj)
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.top
  margin 15px 0
.pageBox
  margin 15px 0
</style>
