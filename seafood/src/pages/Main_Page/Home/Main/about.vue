<template>
  <div class="seafoodTypeBox">
    <div class="seafoodType">
      <div class="imgBox" style="height:600px;width:100%;">
        <img src="@/assets/Main/lianxiwomen.jpg" alt="" style="width:100%;height:100%;">
      </div>
      <div class="lianxi">
        <div class="title">
          <div style="margin:15px 0;font-size:18px;">联系我们</div>
          <div>------------&nbsp;&nbsp;&nbsp;联系信息&nbsp;&nbsp;&nbsp;----------</div>
        </div>
        <div class="gongju">
          <div class="show" v-for="(item,index) in cardArr" :key="index">
            <div class="imgBox">
              <img :src="item.src" alt="">
            </div>
            <div>
              {{item.text}}
            </div>
            <div>
              {{item.num}}
            </div>
          </div>
        </div>
      </div>
      <div class="liuyanban">
        <el-form :model="formObj" status-icon :rules="formRules" ref="formObj" label-width="80px" size="small" class="demo-ruleForm">
            <el-form-item label="名字" prop="name">
              <el-input type="text" placeholder="请输入海鲜名称" v-model="formObj.name"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input type="text" placeholder="请输入邮箱" v-model="formObj.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input type="text" placeholder="请输入手机号" v-model="formObj.phone"></el-input>
            </el-form-item>
            <el-form-item label="留言" prop="info">
              <el-input type="textarea" placeholder="请描述海鲜特征" v-model="formObj.info"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="liuyan()" style="width:200px">提交</el-button>
            </el-form-item>
          </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { addMessage } from '@/api/userMessage.js'
export default {
  data () {
    return {
      cardArr: [
        {
          src: require('@/assets/Main/QQ.jpg'),
          text: '联系QQ',
          num: '996184076'
        },
        {
          src: require('@/assets/Main/邮箱.jpg'),
          text: '联系邮箱',
          num: 'lianbin_1001@163.com'
        },
        {
          src: require('@/assets/Main/shouji.jpg'),
          text: '联系手机',
          num: '13163851001'
        }
      ],
      formObj: {
        name: '',
        email: '',
        phone: '',
        info: ''
      },
      formRules: {
        name: [
          { required: true, message: '名字不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '手机号不能为空', trigger: 'blur' }
        ],
        info: [
          { required: true, message: '留言板不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    liuyan () {
      this.$refs.formObj.validate((valid) => {
        if (valid) {
          console.log('this.formObj', this.formObj)
          if (JSON.parse(window.localStorage.getItem('userInfo'))) {
            this.userMessageHandle()
          } else {
            this.$message({
              message: '您未登陆不能留言,请先登陆',
              type: 'error'
            })
          }
        } else {
          console.log('error submit!!')
          this.$message({
            message: '留言失败,请重试',
            type: 'error'
          })
          return false
        }
      })
    },
    async userMessageHandle () {
      try {
        let res = await addMessage({
          'message': this.formObj
        })
        if (res.data.code === '1111') {
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          this.formObj.name = ''
          this.formObj.email = ''
          this.formObj.phone = ''
          this.formObj.info = ''
        }
        console.log('res', res)
      } catch (e) {
        console.log('e', e)
      }
    }
  }
}
</script>

<style scoped>
.seafoodTypeBox{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.seafoodType{
  /* width: 1092px; */
  /* background-color: red; */
  /* margin: 0 auto; */
  /* margin-left: 17px; */
}
.title{
  font-size: 16px;
  padding: 20px 15px;
  text-align: center;
}
.rowBox{
  padding: 20px;
}
.box{
  margin-bottom: 30px;
  line-height: 20px;
}
.gongju{
  display: flex;
  justify-content: space-between;
  justify-content: center;
}
.show{
  height: 150px;
  width: 200px;
  text-align: center;
  /* background-color: red; */
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.show div{
  margin-top: 10px;
}
imgBox{
  display: flex;
  justify-content: center;
  align-items: center;
}
.liuyanban{
  width: 100%;
}
.el-form{
  width: 60%;
  margin: 0 auto;
}
</style>
