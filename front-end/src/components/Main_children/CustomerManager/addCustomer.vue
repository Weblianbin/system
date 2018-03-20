<template>
  <div class="addBox">
    <el-form :model="form" status-icon :rules="formRules" ref="form" label-width="80px" size="small" class="demo-ruleForm">
      <el-form-item label="姓名" prop="name">
        <el-input type="text" placeholder="请输入客户名字" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio v-model="form.gender" label="man">男</el-radio>
        <el-radio v-model="form.gender" label="woman">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input type="text" placeholder="请输入客户手机号" v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="海鲜类别" prop="seafoodType">
        <el-select v-model="form.seafoodType" placeholder="请选择活动区域">
          <el-option label="虾" value="shanghai"></el-option>
          <el-option label="螃蟹" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="海鲜名称" prop="seafoodName">
        <el-input type="text" placeholder="请输入海鲜名字" v-model="form.seafoodName"></el-input>
      </el-form-item>
      <el-form-item label="购买时间" prop="date">
        <el-col :span="20">
          <el-date-picker type="date" placeholder="请选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addCustomer } from '@/api/customer.js'
import { transformTimestamp } from '@/utils/dateTransform.js'
export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('名字不能为空'))
      }
      callback()
    }
    var checkGender = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('性别不能为空'))
      }
      callback()
    }
    var checkPhoneNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      }
      callback()
    }
    var checkSeafoodType = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('海鲜类别不能为空'))
      }
      callback()
    }
    var checkSeafoodName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('海鲜名称不能为空'))
      }
      callback()
    }
    var checkDate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('购买日期不能为空'))
      }
      callback()
    }
    return {
      form: {
        name: '',
        gender: 'man',
        phoneNumber: '',
        seafoodType: [],
        seafoodName: '',
        date: ''
      },
      formRules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        gender: [
          { validator: checkGender, trigger: 'blur' }
        ],
        phoneNumber: [
          { validator: checkPhoneNumber, trigger: 'blur' }
        ],
        seafoodType: [
          { validator: checkSeafoodType, trigger: 'blur' }
        ],
        seafoodName: [
          { validator: checkSeafoodName, trigger: 'blur' }
        ],
        date: [
          { validator: checkDate, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate((value) => {
        if (value) {
          let time = transformTimestamp(this.form.date)
          console.log('time', time)
          this.form.date = time
          console.log('this.form', this.form)
          this.addCustomerHandle(this.form)
        } else {
          this.$message({
            message: '添加信息失败',
            type: 'error'
          })
          this.$router.push('/addCustomer')
          return false
        }
      })
    },
    async addCustomerHandle (data) {
      let res = await addCustomer({
        'customer': data
      })
      console.log('res', res)
      if (res.data.code === '1111') {
        // 登录成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.$router.push('/')
      } else {
        // 登录失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style scoped>
.addBox{
  width: 50%;
}
</style>
