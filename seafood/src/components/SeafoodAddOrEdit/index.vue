<template>
  <div class="addBox">
    <el-form :model="formObj" status-icon :rules="formRules" ref="formObj" label-width="80px" size="small" class="demo-ruleForm">
      <el-form-item label="海鲜种类"  prop="name">
        <!-- 设置,修改的时候,不能修改种类 -->
        <el-select v-model="formObj.name" :disabled="selectFlag" placeholder="请选择">
          <el-option
            v-for="item in formObj.seafoodTypes"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="海鲜名称" prop="seafoodName">
        <el-input type="text" placeholder="请输入海鲜名称" v-model="formObj.seafoodName"></el-input>
      </el-form-item>
      <el-form-item label="海鲜价格" prop="sale">
        <el-input type="text" placeholder="请输入价格" v-model="formObj.sale"></el-input>
      </el-form-item>
      <el-form-item label="库存量(kg)" prop="count">
        <el-input type="text" placeholder="请输入库存量" v-model="formObj.count"></el-input>
      </el-form-item>
      <el-form-item label="海鲜产地" prop="source">
        <el-input type="text" placeholder="请输入海鲜名称" v-model="formObj.source"></el-input>
      </el-form-item>
      <el-form-item label="日期" required>
        <el-col :span="20">
          <el-form-item prop="time">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.time" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="海鲜简介" prop="seafoodInfo">
        <el-input type="textarea" placeholder="请描述海鲜特征" v-model="formObj.seafoodInfo"></el-input>
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
    imgSrc: '',
    locationUrl: ''
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
      },
      img: this.imgSrc
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
      this.$refs.formObj.validate((valid) => {
        if (valid) {
          let newObj = {}
          newObj.name = this.formObj.name
          newObj.seafoodName = this.formObj.seafoodName
          newObj.sale = this.formObj.sale
          newObj.source = this.formObj.source
          newObj.time = transformTimestamp(this.formObj.time)
          newObj.seafoodInfo = this.formObj.seafoodInfo
          // 只向服务器传最后一张图片
          newObj.photo = this.formObj.photo
          newObj.count = this.formObj.count
          if (this.selectFlag) {
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
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
