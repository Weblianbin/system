<template>
  <div class="box">
    <el-form :model="formObj" size="mini" status-icon :rules="formObjRules" ref="formObj" label-width="100px" class="demo-ruleForm">
      <el-form-item label="项目名称" prop="item_name">
        <el-input type="text" v-model="formObj.item_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="项目域名" prop="realm_name">
        <el-input type="text" v-model="formObj.realm_name" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="所属区域" prop="area">
        <!-- <el-input v-model.number="formObj.area"></el-input> -->
        <selectLinkage width='100%' @selectedHandle='selectedHandle' :selectedArr='form.area'></selectLinkage>
      </el-form-item>
      <el-form-item label="项目地址" prop="address">
        <el-input v-model.number="formObj.address"></el-input>
      </el-form-item>
      <el-form-item label="集成商名称" prop="integrator">
        <el-input type="text" v-model="formObj.integrator" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="授权数量" prop="auth_num">
        <el-input v-model.number="formObj.auth_num"></el-input>
      </el-form-item>
      <el-form-item label="终端数量" prop="client_num">
        <el-input v-model.number="formObj.client_num"></el-input>
      </el-form-item>
      <el-form-item label="终端型号" prop="client_type">
        <el-select v-model="formObj.client_type" placeholder="请选择">
          <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option> -->
          <el-option
            :label="formObj.client_type"
            :value="formObj.client_type">
          </el-option>
        </el-select>
        <!-- <el-input v-model.number="formObj.client_type"></el-input> -->
      </el-form-item>
      <el-form-item label="平台版本" prop="platform_version">
        <el-input v-model.number="formObj.platform_version"></el-input>
      </el-form-item>
      <el-form-item label="终端版本" prop="client_version">
        <el-input v-model.number="formObj.client_version"></el-input>
      </el-form-item>
      <el-form-item label="访问秘钥" prop="secret_key">
        <el-input v-model.number="formObj.secret_key"></el-input>
      </el-form-item>
      <el-form-item label="序列号" prop="series_number">
        <el-input v-model.number="formObj.series_number"></el-input>
      </el-form-item>
      <el-form-item label="部署时间">
        <el-form-item prop="deploy_time">
          <el-date-picker type="date" placeholder="选择日期" v-model="formObj.deploy_time"></el-date-picker>
        </el-form-item>
      </el-form-item>
    </el-form>
    <div class="btnBox">
      <div>
        <el-button @click="cancleHandle()">取 消</el-button>
        <el-button type="primary" @click="sumitHandle()">确 定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import selectLinkage from '@/components/selectLinkage/index.vue'
export default {
  components: {
    selectLinkage
  },
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
      // 1表示新增,2表示修改
      addOrEditFlag: null,
      formObjRules: {
        item_name: [
          { required: true, message: '项目名称不能为空', trigger: 'blur' }
        ],
        realm_name: [
          { required: true, message: '项目域名不能为空', trigger: 'blur' }
        ],
        area: [
          { required: true, message: '项目区域不能为空', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '项目地址不能为空', trigger: 'blur' }
        ],
        integrator: [
          { required: true, message: '集成商不能为空', trigger: 'blur' }
        ],
        auth_num: [
          { required: true, message: '授权数量不能为空', trigger: 'blur' }
        ],
        client_num: [
          { required: true, message: '终端数量不能为空', trigger: 'blur' }
        ],
        client_type: [
          { required: true, message: '终端型号不能为空', trigger: 'blur' }
        ],
        platform_version: [
          { required: true, message: '平台版本不能为空', trigger: 'blur' }
        ],
        client_version: [
          { required: true, message: '终端版本不能为空', trigger: 'blur' }
        ],
        deploy_time: [
          { required: true, message: '部署时间不能为空', trigger: 'blur' }
        ],
        secret_key: [
          { required: true, message: '访问秘钥不能为空', trigger: 'blur' }
        ],
        series_number: [
          { required: true, message: '序列号不能为空', trigger: 'blur' }
        ]
      },
      options: [
        {
          value: '一号',
          label: '一号'
        },
        {
          value: '二号',
          label: '二号'
        }
      ]
    }
  },
  mounted () {
    // 有键表示修改
    // addOrEditFlag 1表示新增
    if (this.formObj.hasOwnProperty('realm_name')) {
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
      // formObj
      this.$refs.formObj.validate((valid) => {
        if (valid) {
          this.$emit('sumitHandle', this.formObj, this.addOrEditFlag)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 选择组件暴露出来的函数
    selectedHandle (selectArr) {
      this.form.area = selectArr
    }
  }
}
</script>
<style lang="stylus" scoped>
.btnBox
  display flex
  justify-content center
  align-items center
</style>
