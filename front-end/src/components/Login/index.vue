<template>
  <div class='base_background loginBox'>
    登陆界面
    <div class="box">
      <el-form :model="loginObj" status-icon :rules="loginRules" ref="loginObj" label-width="60px" class="demo-ruleForm">
        <el-form-item label="账号" prop="account">
          <el-input type="text" placeholder="请输入账号" v-model="loginObj.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="loginObj.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginObj')">登录</el-button>
          <el-button @click="resetForm('loginObj')">重置</el-button>
        </el-form-item>
      </el-form>
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
        ]
      }
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style scoped>
.loginBox{
  padding: 30px
}
.box{
  width: 30%;
}
</style>
