<template>
  <div class='loginBox'>
    <div class="box">
      <!-- <div class="title">
        <div>
          <b>注&nbsp;册</b>
        </div>
      </div> -->
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
            <el-button @click="cancle()">取 消</el-button>
            <el-button type="primary" @click="submitForm(registerObj)">确 定</el-button>
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
      flag: false,
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
          this.register._id = JSON.parse(window.localStorage.getItem('userInfo'))._id
          this.$emit('update', this.register)
        } else {
          this.$message({
            message: '修改失败,请重新输入',
            type: 'error'
          })
          let isShow = true
          this.$emit('update', {}, isShow)
          // this.$router.push('/register')
        }
      })
    },
    cancle () {
      this.$emit('cancle', this.flag)
    }
  }
}
</script>
<style scoped>
.loginBox{
  width: 100%;
  background-image: url('/static/login/bg-login.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
.box{
  /* width: 30%; */
  /* background-color: rgba(0, 0, 0, 0.5); */
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
