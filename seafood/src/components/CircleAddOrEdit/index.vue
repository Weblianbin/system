<template>
  <div class="addBox">
    <el-form :model="form" status-icon :rules="formRules" ref="form" label-width="80px" size="small" class="demo-ruleForm">
      <el-form-item label="文章标题" prop="title">
        <el-input type="text" placeholder="请输入文章" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input type="text" placeholder="请输入作者" v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="日期" required>
        <el-col :span="20">
          <el-form-item prop="time">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="新闻简介" prop="info">
        <el-input type="textarea" placeholder="请输入新闻简介" v-model="form.info"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="seafoodInfo">
        <el-input type="textarea" placeholder="请输入内容" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="相关图片" prop="photo">
          <el-upload list-type="picture-card" :action="locationUrl" :on-change="changeFile">
              <img v-if="img" :src="img" style="height: 100%;width:100%;">
              <i v-else class="el-icon-plus"></i>
          </el-upload>
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
    },
    locationUrl: '',
    imgSrc: ''
  },
  data () {
    return {
      formObj: this.form,
      selectFlag: null,
      // 新增,修改
      addOrEditFlag: null,
      formRules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '作者不能为空', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '日期不能为空', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '新闻简介不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      },
      img: this.imgSrc
    }
  },
  mounted () {
    // 有键表示修改
    // addOrEditFlag: 表示新增/修改
    if (this.formObj.hasOwnProperty('title')) {
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
          let newObj = {}
          newObj.title = this.formObj.title
          newObj.author = this.formObj.author
          newObj.content = this.formObj.content
          newObj.time = transformTimestamp(this.formObj.time)
          newObj.photo = this.formObj.photo
          newObj.info = this.formObj.info
          if (this.addOrEditFlag) {
            newObj._id = this.formObj._id
          }
          this.$emit('sumitHandle', newObj, this.addOrEditFlag)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    changeFile (file, fileList) {
      var This = this
      var reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = function (e) {
        // this.result // 这个就是base64编码了
        This.formObj.photo = this.result
      }
    }
  }
}
</script>
