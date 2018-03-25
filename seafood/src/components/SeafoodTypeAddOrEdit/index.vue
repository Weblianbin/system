<template>
  <div class="addBox">
    <el-form :model="form" status-icon :rules="formRules" ref="form" label-width="80px" size="small" class="demo-ruleForm">
      <el-form-item label="海鲜种类" prop="name">
        <el-input type="text" placeholder="请输入海鲜种类" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="种类简介" prop="info">
        <el-input type="textarea" placeholder="请描述种类特征" v-model="form.info"></el-input>
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
      formRules: {
        name: [
          { required: true, message: '海鲜种类不能为空', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '海鲜种类简介不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    // 有键表示修改
    // addOrEditFlag: 表示新增/修改
    if (this.formObj.hasOwnProperty('name')) {
      this.addOrEditFlag = '修改'
    } else {
      this.addOrEditFlag = '新增'
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
          this.$emit('sumitHandle', this.formObj, this.addOrEditFlag)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
