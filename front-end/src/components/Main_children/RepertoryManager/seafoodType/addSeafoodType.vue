<template>
  <div class="addBox">
    <el-form :model="form" status-icon :rules="formRules" ref="form" label-width="80px" size="small" class="demo-ruleForm">
      <el-form-item label="海鲜种类" prop="name">
        <el-input type="text" placeholder="请输入海鲜种类" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="种类说明" prop="info">
        <el-input type="textarea" placeholder="请描述种类特征" v-model="form.info"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addSeafoodType } from '@/api/seafoodType.js'
export default {
  data () {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('海鲜种类不能为空'))
      }
      callback()
    }
    var checkInfo = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('描述不能为空'))
      }
      callback()
    }
    return {
      form: {
        name: '',
        info: ''
      },
      formRules: {
        name: [
          { validator: checkName, trigger: 'blur' }
        ],
        info: [
          { validator: checkInfo, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate((value) => {
        if (value) {
          this.addSeafoodTypeHandle(this.form)
        } else {
          this.form.name = ''
          this.form.info = ''
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          this.$router.push('/addSeafoodType')
          return false
        }
      })
    },
    async addSeafoodTypeHandle (data) {
      let res = await addSeafoodType({
        'seafoodType': data
      })
      console.log('res', res)
      if (res.data.code === '1111') {
        // 海鲜种类,添加成功
        this.$message({
          message: res.data.msg,
          type: 'success'
        })
        this.form.name = ''
        this.form.info = ''
        // this.$router.push('/addSeafoodType')
      } else {
        // 海鲜种类,添加失败
        this.$message({
          message: res.data.msg,
          type: 'error'
        })
        this.$router.push('/addSeafoodType')
      }
    }
  }
}
</script>
<style scoped>
.addBox{
  width: 50%;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
</style>
