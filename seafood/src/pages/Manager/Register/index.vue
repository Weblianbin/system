<template>
  <div class='base_background loginBox'>
    <div class="box">
      <div class="title">
        <div>
          <b>注&nbsp;册</b>
        </div>
      </div>
      <div>
         <el-form :model="registerObj" status-icon :rules="registerRules" ref="registerObj" label-width="100px" class="demo-ruleForm">
          <el-form-item class="loginText" label="用户名" prop="account">
            <el-input type="text" placeholder="请输入用户名" v-model="registerObj.account" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input class="loginText" type="password" placeholder="请输入密码" v-model="registerObj.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="passwordOnce">
            <el-input class="loginText" type="password" placeholder="请再次输入密码" v-model="registerObj.passwordOnce" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="btnBox">
            <el-button type="primary" @click="submitForm(registerObj)">注册</el-button>
            <span class="register" @click="goLogin()">已有账号,点击登录</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { register } from '@/api/register.js'
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
    var checkPasswordOnce = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerObj.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'right',
      registerObj: {
        account: '',
        password: '',
        passwordOnce: ''
      },
      register: {
        account: null,
        password: null
      },
      registerRules: {
        account: [
          { validator: checkAccount, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ],
        passwordOnce: [
          { validator: checkPasswordOnce, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (registerObj) {
      this.$refs.registerObj.validate((value) => {
        if (value) {
          this.register.account = registerObj.account
          this.register.password = registerObj.password
          this.registerHandle(this.register)
        } else {
          this.$message({
            message: '注册失败,请重新注册',
            type: 'error'
          })
          this.$router.push('/register')
        }
      })
    },
    goLogin () {
      this.$router.push('/login')
    },
    async registerHandle (data) {
      let res = await register({
        'user': data
      })
      if (res.data.code === '1111') {
        // 注册成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.$router.push('/login')
      } else {
        // 注册失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.$router.push('/register')
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
  border: 1px solid lightgrey
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
