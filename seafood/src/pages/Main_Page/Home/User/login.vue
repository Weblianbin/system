<template>
  <div class='base_background loginBox'>
    <div class="box">
      <div class="title">
        <div>
          <b>用&nbsp;户&nbsp;登&nbsp;录</b>
        </div>
      </div>
      <div>
         <el-form :model="loginObj" status-icon :rules="loginRules" ref="loginObj" label-width="100px" class="demo-ruleForm">
          <el-form-item class="loginText" style="color:white!important;" label="用户名" prop="account">
            <el-input type="text" placeholder="请输入用户名" v-model="loginObj.account" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input class="loginText" type="password" placeholder="请输入密码" v-model="loginObj.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="btnBox">
            <el-button type="primary" @click="submitForm(loginObj)">登录</el-button>
            <span class="register" @click="goRegister()">还没有账号,点击注册</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      }
      callback()
    }
    var checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'right',
      loginObj: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (loginObj) {
      this.$refs.loginObj.validate((value) => {
        if (value) {
          this.loginHandle(loginObj)
        } else {
          this.$message({
            message: '用户名或密码不能为空',
            type: 'error'
          })
          this.$router.push('/userLogin')
          return false
        }
      })
    },
    goRegister () {
      this.$router.push('/userRegister')
    },
    async loginHandle (data) {
      // 表单验证成功之后,在这里去派发事件
      var res = await this.$store.dispatch('userLogin', data)
      if (res.data.code === '1111') {
        // 登录成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.$router.push({path: '/home', query: {show: 1}})
      } else {
        // 登录失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.$router.push('/userLogin')
      }
    }
  }
}
</script>
<style scoped>
.loginBox{
  /* padding: 30px */
  height: 100vh;
  width: 100vw;
  background-image: url('/static/bg-login.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box{
  width: 30%;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 0 15px;
  border: 1px solid lightgrey;
}
.box .title{
  /* background-color: red; */
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.btnBox{
  /* display: flex; */
  /* justify-content: space-around; */
  /* width: 100%; */
}
.register{
  font-size: 16px;
  color: red;
  cursor: pointer;
  display: inline-block;
  float: right;
}
</style>
