<template>
<div class="userDetailBig">
  <el-row :gutter="24">
    <el-col :span="16" :offset="4">
      <div class="grid-content bg-purple">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span class='title'>个人信息</span>
          <el-button style="float: right; padding: 3px 0" type="text" @click="changPsw()">修改信息</el-button>
          <el-button style="float: right; padding: 3px 10px" type="text" @click="goHome()">返回首页</el-button>
        </div>
        <div class="managerBox">
          <div class="userDetailBox">
            用户名: <span class="account">{{userInfo.account}}</span>
          </div>
          <div class="userDetailBox">
            性别: <span class="account">{{userInfo.radio}}</span>
          </div>
          <div class="userDetailBox">
            邮箱: <span class="account">{{userInfo.email}}</span>
          </div>
          <div class="userDetailBox">
            手机号: <span class="account">{{userInfo.phone}}</span>
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
    <user
    @cancle='cancle'
    @update='update'
    :form='userInfo'
    >
    </user>
  </el-dialog>
</div>
</template>
<script>
import user from '@/components/userDialog/index.vue'
import { userInfoUpdate, userDetail } from '@/api/userMessage.js'
export default {
  components: {
    user
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
        this.$router.push('/userDetail')
      } else {
        // 失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.dialogFormVisible = true
      }
    },
    goHome () {
      this.$router.push('/home')
    }
  }
}
</script>
<style scoped>
.userDetailBig{
  margin: 30px;
}
.title{
  text-align: center;
}
.userDetailBox{
  margin: 30px;
  font-size: 18px;
}
.userDetailBox .span{
  margin: 30px;
  font-size: 18px;
}
</style>
