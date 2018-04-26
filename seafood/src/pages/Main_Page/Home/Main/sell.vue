<template>
  <div>
    <div class="titleBox">
      <div class="name">销售数量展示:</div>
    </div>
    <x-chart :id="id" :option="option" v-if="isShow"></x-chart>
  </div>
</template>
<script>
import { sellAllList } from '@/api/sell.js'
// 导入chart组件
import XChart from '@/components/HeighCharts/index.vue'
import { transformMonth } from '@/utils/dateTransform.js'
export default {
  components: {
    XChart
  },
  created () {
    this.sellListHandle()
  },
  data () {
    return {
      id: 'test',
      isShow: false,
      option: {
        chart: {
          type: 'column'
        },
        title: {
          // 表头文字
          text: ''
        },
        subtitle: {
          // 表头下文字
          text: '数据来源: seafood'
        },
        // x轴显示的内容
        xAxis: {
          categories: [],
          // 可以显示一个方块，如果需要的话可以更改透明度和颜色
          plotbands: [{from: 4.5, to: 6.5, color: 'rgba(68,170,213,0)'}],
          title: {
            text: '月份'
          }
        },
        // y轴显示的内容
        yAxis: {
          title: {
            text: 'kg'
          }
        },
        plotOptions: {
          line: {
            dataLabels: {
              // 开启数据标签
              enabled: true
            },
            // 关闭鼠标跟踪，对应的提示框、点击事件会失效
            enableMouseTracking: false
          }
        },
        series: [
          // 两条数据
          {
            name: '鱼类',
            data: []
          },
          {
            name: '蟹类',
            data: []
          },
          {
            name: '虾类',
            data: []
          },
          {
            name: '食用藻类',
            data: []
          },
          {
            name: '贝类',
            data: []
          }
        ]
      }
    }
  },
  methods: {
    async sellListHandle () {
      let res = await sellAllList()
      let arr = [...res.data.data]
      arr.forEach((item) => {
        item.time = transformMonth(item.time)
      })
      var result = []
      var timeArr = []
      arr.forEach(function (item) {
        timeArr.push(item.time)
      })
      // 数组去重,得到一个时间数组
      timeArr = Array.from(new Set(timeArr.sort()))
      timeArr.forEach(function (el, i) {
        result[i] = {}
        result[i].item = {}
        result[i].item.month = el
        result[i].item.yulei = 0
        result[i].item.xielei = 0
        result[i].item.xialei = 0
        result[i].item.shiyongzaolei = 0
        result[i].item.beilei = 0
        arr.forEach(function (item) {
          if (item.time === el) {
            result[i].item.yulei += item.name === '鱼类' ? item.sellTotal : 0
            result[i].item.xielei += item.name === '蟹类' ? item.sellTotal : 0
            result[i].item.xialei += item.name === '虾类' ? item.sellTotal : 0
            result[i].item.shiyongzaolei += item.name === '食用藻类' ? item.sellTotal : 0
            result[i].item.beilei += item.name === '贝类' ? item.sellTotal : 0
          }
        })
      })
      for (let i = 0; i < result.length; i++) {
        this.option.xAxis.categories.push(result[i].item.month)
        this.option.series[0].data.push(result[i].item.yulei)
        this.option.series[1].data.push(result[i].item.xielei)
        this.option.series[2].data.push(result[i].item.xialei)
        this.option.series[3].data.push(result[i].item.shiyongzaolei)
        this.option.series[4].data.push(result[i].item.yulei)
      }
      this.isShow = true
      console.log(result)
      console.log('series', this.option.series)
    }
  }
}
</script>
<style>
.titleBox{
  font-size: 20px;
  /* margin-top: 20px; */
  text-align: center;
  color: white;
  height: 50px;
  line-height: 50px;
}
.titleBox .name{
  width: 30%;
  border-radius: 50%;
  height: 50px;
  background-color: #409EFF;
  margin: 0 auto;
}
#test {
  width: 80%;
  height: 400px;
  margin: 15px auto;
}
</style>
