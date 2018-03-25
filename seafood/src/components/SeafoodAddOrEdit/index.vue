<template>
  <div class="addBox">
    <el-form :model="form" status-icon :rules="formRules" ref="form" label-width="80px" size="small" class="demo-ruleForm">
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
      <el-form-item label="海鲜简介" prop="seafoodInfo">
        <el-input type="textarea" placeholder="请描述海鲜特征" v-model="form.seafoodInfo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="cancleHandle()">取 消</el-button>
        <el-button type="primary" @click="sumitHandle()">确 定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
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
        name: [
          { required: true, message: '需要选择海鲜种类', trigger: 'blur' }
        ],
        seafoodName: [
          { required: true, message: '海鲜名称不能为空', trigger: 'blur' }
        ],
        seafoodInfo: [
          { required: true, message: '海鲜简介不能为空', trigger: 'blur' }
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
          newObj.seafoodInfo = this.formObj.seafoodInfo
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
