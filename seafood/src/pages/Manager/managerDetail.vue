<template>
<div>
  <el-row :gutter="24">
    <el-col :span="16" :offset="4">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class='title'>管理员信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="changPsw()">修改信息</el-button>
        </div>
        <div class="managerBox">
          <div class="box">
            用户名: <span class="account">{{userInfo.account}}</span>
          </div>
        </div>
      </el-card>
      </div>
    </el-col>
  </el-row>
  <el-dialog title="修改信息" center :visible.sync="dialogFormVisible">
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div> -->
    <manager
    @cancle='cancle'
    @update='update'
    >
    </manager>
  </el-dialog>
</div>
</template>
<script>
import manager from '@/components/managerDialog/index.vue'
import { userInfoUpdate, userDetail } from '@/api/auth.js'
export default {
  components: {
    manager
  },
  created () {
    this.userDetailHandle()
  },
  data () {
    return {
      userInfo: '',
      dialogFormVisible: false
    }
  },
  methods: {
    async userDetailHandle () {
      var data = null
      data = JSON.parse(window.localStorage.getItem('userInfo')).account
      var res = await userDetail({
        'user': {
          account: data
        }
      })
      this.userInfo = res.data.dataObj[0]
    },
    // 修改密码
    changPsw () {
      this.dialogFormVisible = true
    },
    cancle () {
      this.dialogFormVisible = false
    },
    update (obj) {
      this.registerHandle(obj)
    },
    async registerHandle (data) {
      let res = await userInfoUpdate({
        'user': data
      })
      if (res.data.code === '1111') {
        // 成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.dialogFormVisible = false
        await this.$store.dispatch('getUserInfo', data)
        this.userDetailHandle()
        this.$router.push('/managerDetail')
      } else {
        // 失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.dialogFormVisible = true
      }
    }
  }
}
</script>
<style scoped>
.title{
  text-align: center;
}
</style>
