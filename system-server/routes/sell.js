const exp = require('express')
const router = exp.Router()
const db = require('../db')
// 添加
router.post('/add', function (req, res) {
  let reqData = req.body.sell
  let seafoodName = reqData.seafoodName
  let name = reqData.name
  var time = reqData.time
  var sell = new db.Sell(reqData)
  db.Sell.find({ 'seafoodName': seafoodName, 'name': name, 'time':time }, function (err, data) {
    if (!err) {
      if (data.length === 0) {
        sell.save(function (err) {
          if (!err) {
            // 添加成功
            res.status(200).json({
              code: '1111',
              msg: '销售记录,添加成功'
            })
          } else {
            // 添加失败
            res.status(200).json({
              code: '0000',
              msg: '销售记录,添加失败'
            })
          }
        })
      } else {
        res.status(200).json({
          code: '0000',
          msg: '销售记录已经存在'
        })
      }
    }
  })
})
// 查找所以种类,分页
router.post('/list', function (req, res) {
  let reqData = req.body.pageInfo
  var index = reqData.index
  var size = reqData.size
  db.Sell.find().then(function (data) {
    if (data.length > 0) {
      var result = data.reverse().slice(parseInt((index - 1) * size), Number(parseInt((index - 1) * size) + parseInt(size)))
      var count = Math.ceil(data.length / size)
      res.send({
        code: 'success',
        data: result,
        count: count,
        length: data.length
      })
    } else {
      res.send({
        code: 'success',
        data: [],
        count: count,
        length: data.length
      })
    }

  }).catch(function (err) {
    console.log(err)
  })
})
router.post('/allList', function (req, res) {
  db.Sell.find().then(function (data) {
    let resultData = data.reverse()
    res.send({
      code: 'success',
      data: resultData
    })
  }).catch(function (err) {
    console.log(err)
  })
})
// 修改
router.post('/edit', function (req, res) {
  let reqData = req.body.sell
  let id = reqData._id
  let seafoodName = reqData.seafoodName
  let name = reqData.name
  let time = reqData.time
  // 根据类别,查出所有海鲜名称
  db.Sell.find({ 'name': name }).then(function (data) {
    // 先查下数据库,名称是否相同
    data.forEach((item) => {
      if (item.seafoodName == reqData.seafoodName && item.time == reqData.time && item.sellTotal == reqData.sellTotal) {
        res.send({
          code: "0000",
          msg: "修改失败,海鲜种类和名称不能与其他相同"
        })
      }
    })
    // 再存数据
    db.Sell.findByIdAndUpdate(id, reqData, function (err) {
      if (!err) {
        res.send({
          code: "1111",
          msg: "修改成功"
        })
      }
    })
  }).catch(function (err) {
    console.log(err)
  })
})
// 删除
router.post('/delete', function (req, res) {
  let reqData = req.body.sell
  let id = reqData._id
  db.Sell.findByIdAndRemove(id, function (err) {
    if (!err) {
      res.send({
        code: "1111",
        msg: "删除成功"
      })
    }
  })
})
// 导出注册路由
module.exports = router