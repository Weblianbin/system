<template>
  <el-row :gutter="24">
    <el-col :span="10">
      <img :src="content.photo" alt="" style="width:100%;">
    </el-col>
    <el-col :span="14">
      <div>
        上市时间:&nbsp;&nbsp;{{content.time}}
      </div>
      <div>
        价格:&nbsp;&nbsp;{{content.sale}}
      </div>
      <div>
        产地:&nbsp;&nbsp;{{content.source}}
      </div>
      <div>
        所属种类:&nbsp;&nbsp;{{content.name}}
      </div>
      <div>
        海鲜简介:&nbsp;&nbsp;{{content.seafoodInfo}}
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted () {
    console.log(this.content)
  }
}
</script>
