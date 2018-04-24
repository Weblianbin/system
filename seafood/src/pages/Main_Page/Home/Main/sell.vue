<template>
  <div>
    <div class="titleBox">
      <div class="name">销售数量展示:</div>
    </div>
    <x-chart :id="id" :option="option"></x-chart>
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
      option: {
        chart: {
          type: 'column'
        },
        title: {
          // 表头文字
          text: '树状图展示销量'
        },
        subtitle: {
          // 表头下文字
          text: '数据来源: seafood'
        },
        // x轴显示的内容
        xAxis: {
          categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          // 可以显示一个方块，如果需要的话可以更改透明度和颜色
          plotbands: [{from: 4.5, to: 6.5, color: 'rgba(68,170,213,0)'}]
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
            name: '东京',
            data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
          },
          {
            name: '伦敦',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
          },
          {
            name: '伦敦',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
          },
          {
            name: '伦敦',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
          },
          {
            name: '伦敦',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
          },
          {
            name: '伦敦',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
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
      console.log('arr--', arr)
      console.log('arr--', JSON.stringify(arr))
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
