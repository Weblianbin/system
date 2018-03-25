<template>
  <div class="box" v-if="dataShow">
    <el-row type="flex" class="row-bg" justify="space-around">
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基本信息</span>
            </div>
            <div class="text item">
              <div class="textBox">
                项目名称: <span class="messageShow">{{objDetail.base_info.item_name}}</span>
              </div>
            </div>
            <div class="text item">
              <div class="textBox">
                项目区域: <span class="messageShow">{{objDetail.base_info.area}}</span>
              </div>
            </div>
            <div class="text item">
              <div class="textBox">
                项目地址: <span class="messageShow">{{objDetail.base_info.address}}</span>
              </div>
            </div>
            <div class="text item">
              <div class="textBox">
                集成商: <span class="messageShow">{{objDetail.base_info.integrator}}</span>
              </div>
            </div>
            <div class="text item">
              <div class="textBox">
                终端型号: <span class="messageShow">{{objDetail.base_info.platform_version}}</span>
              </div>
            </div>
            <div class="text item">
              <div class="textBox">
                平台版本: <span class="messageShow">{{objDetail.base_info.client_version}}</span>
              </div>
            </div>
            <div class="text item">
              <div class="textBox">
                终端版本: <span class="messageShow">{{objDetail.base_info.deploy_time}}</span>
              </div>
            </div>
            <div class="text item">
              <div class="textBox">
                最后一次同步时间: <span class="messageShow">{{objDetail.base_info.last_modified}}</span>
              </div>
            </div>
            <div class="text item">
              <div class="textBox">
                访问秘钥: <span class="messageShow">{{objDetail.base_info.secret_key}}</span>
              </div>
            </div>
            <div class="text item">
              <div class="textBox">
                序列号: <span class="messageShow">{{objDetail.base_info.series_number}}</span>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>基础状态</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
            </div>
            <div class="text item">
              <div class="textBox">
                终端数量: <span class="messageShow">{{objDetail.base_info.client_num}}</span>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { projcetDetail } from '@/api/projectManager.js'
export default {
  data () {
    return {
      itemId: null,
      objDetail: '',
      dataShow: false
    }
  },
  created () {
    let id = null
    id = this.$route.query.item_id
    this.itemId = id
    console.log('this.itemId', this.itemId)
    this.projcetDetailHandle(this.itemId)
  },
  methods: {
    async projcetDetailHandle (id) {
      try {
        var res = await projcetDetail({
          'item_id': id
        })
        this.objDetail = res
        this.dataShow = true
        console.log('res', res)
      } catch (e) {
        console.log('e', e)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.box
  padding 30px 0
.textBox
  font-size 14px
  margin 10px 0
</style>
