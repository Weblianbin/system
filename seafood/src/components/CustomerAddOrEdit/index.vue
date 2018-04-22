<template>
  <div class="addBox">
    <el-form :model="form" status-icon :rules="formRules" ref="form" label-width="120px" size="small" class="demo-ruleForm">
      <el-form-item label="姓名" prop="customerName">
        <el-input type="text" placeholder="请输入客户名字" v-model="form.customerName"></el-input>
      </el-form-item>
      <el-form-item label="性别" required>
        <el-radio-group v-model="form.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input type="text" placeholder="请输入手机号" v-model="form.phoneNumber"></el-input>
      </el-form-item>
      <el-form-item label="购买日期" required>
        <el-col :span="20">
          <el-form-item prop="time">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.shopTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="海鲜种类"  prop="name">
        <!-- 设置,修改的时候,不能修改种类 -->
        <el-select v-model="form.name" :disabled="selectFlag" placeholder="请选择">
          <el-option
            v-for="item in form.seafoodTypes"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="海鲜名称" prop="seafoodName">
        <el-input type="text" placeholder="请输入海鲜名称" v-model="form.seafoodName"></el-input>
      </el-form-item>
      <el-form-item label="数量(单位kg)" prop="amount">
        <el-input type="text" placeholder="请输入数量" v-model="form.amount"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancleHandle()">取 消</el-button>
        <el-button type="primary" @click="sumitHandle()">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { transformTimestamp } from '@/utils/dateTransform.js'
export default {
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      formObj: this.form,
      // 新增,修改
      addOrEditFlag: null,
      selectFlag: null,
      options: [],
      formRules: {
        customerName: [
          { required: true, message: '客户名字不能为空', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '性别不能为空', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        shopTime: [
          { required: true, message: '购买时间不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '需要选择海鲜种类', trigger: 'blur' }
        ],
        seafoodName: [
          { required: true, message: '海鲜名称不能为空', trigger: 'blur' }
        ],
        amount: [
          { required: true, message: '数量不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 有键表示修改
    // addOrEditFlag: 表示新增/修改
    if (this.formObj.hasOwnProperty('name')) {
      this.addOrEditFlag = '修改'
      this.selectFlag = true
    } else {
      this.addOrEditFlag = '新增'
      this.selectFlag = false
    }
  },
  methods: {
    cancleHandle () {
      this.$emit('cancleHandle')
    },
    sumitHandle () {
      // form
      this.$refs.form.validate((valid) => {
        if (valid) {
          let newObj = {}
          newObj.customerName = this.formObj.customerName
          newObj.gender = this.formObj.gender
          newObj.phoneNumber = this.formObj.phoneNumber
          newObj.shopTime = transformTimestamp(this.formObj.shopTime)
          newObj.name = this.formObj.name
          newObj.seafoodName = this.formObj.seafoodName
          newObj.amount = this.formObj.amount
          if (this.selectFlag) {
            newObj._id = this.formObj._id
          }
          this.$emit('sumitHandle', newObj, this.addOrEditFlag)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
