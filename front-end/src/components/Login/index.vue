<template>
  <div class='base_background loginBox'>
    <div class="box">
      <div class="title">
        <div v-if="loginShow">
          <b>登&nbsp;录</b>
        </div>
        <div v-else>
          <b>注&nbsp;册</b>
        </div>
      </div>
      <div v-if="loginShow">
         <el-form :model="loginObj" status-icon :rules="loginRules" ref="loginObj" label-width="60px" class="demo-ruleForm">
          <el-form-item class="loginText" label="账号" prop="account">
            <el-input type="text" placeholder="请输入账号" v-model="loginObj.account" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input class="loginText" type="password" placeholder="请输入密码" v-model="loginObj.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="btnBox">
            <el-button type="primary" @click="submitForm('loginObj')">登录</el-button>
            <span class="register" @click="goRegister()">还没有账号,点击注册</span>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
         <el-form :model="loginObj" status-icon :rules="loginRules" ref="loginObj" label-width="100px" class="demo-ruleForm">
          <el-form-item class="loginText" label="账号" prop="account">
            <el-input type="text" placeholder="请输入账号" v-model="loginObj.account" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input class="loginText" type="password" placeholder="请输入密码" v-model="loginObj.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password1">
            <el-input class="loginText" type="password" placeholder="请再次输入密码" v-model="loginObj.passwordOnce" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item class="btnBox">
            <el-button type="primary" @click="submitForm('loginObj')">注册</el-button>
            <span class="register" @click="goRegister()">已有账号,点击登录</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    // var account = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入账号'))
    //   } else {
    //     callback()
    //   }
    // }
    // var password = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('请输入密码'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      labelPosition: 'right',
      loginObj: {
        account: '',
        password: ''
      },
      loginRules: {
        account: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
          // { validator: account, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
          // { validator: password, trigger: 'blur' }
        ],
        passwordOnce: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
          // { validator: password, trigger: 'blur' }
        ]
      },
      loginShow: true
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    goRegister () {
      console.log('>>>>>>>>>')
      if (this.loginShow) {
        this.loginShow = false
      } else {
        this.loginShow = true
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
  background-image: url('/static/login/bg-login.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box{
  width: 30%;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 0 15px;
}
.box .title{
  /* background-color: red; */
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color:white
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
