<template>
  <div class="addBox">
    <el-form :model="form" status-icon :rules="formRules" ref="form" label-width="80px" size="small" class="demo-ruleForm">
      <el-form-item label="海鲜种类" prop="name">
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
        <el-input type="text" placeholder="请描述种类特征" v-model="form.seafoodName"></el-input>
      </el-form-item>
      <el-form-item label="销售总量" prop="sellTotal">
        <el-input type="text" placeholder="请输入销售总量" v-model="form.sellTotal"></el-input>
      </el-form-item>
      <el-form-item label="日期" required>
        <el-col :span="20">
          <el-form-item prop="time">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
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
      selectFlag: null,
      // 新增,修改
      addOrEditFlag: null,
      formRules: {
        name: [
          { required: true, message: '海鲜种类不能为空', trigger: 'blur' }
        ],
        seafoodName: [
          { required: true, message: '海鲜名称不能为空', trigger: 'blur' }
        ],
        sellTotal: [
          { required: true, message: '销售总量不能为空', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '日期不能为空', trigger: 'blur' }
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
          newObj.name = this.formObj.name
          newObj.seafoodName = this.formObj.seafoodName
          newObj.sellTotal = this.formObj.sellTotal
          newObj.time = transformTimestamp(this.formObj.time)
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
