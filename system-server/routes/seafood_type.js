const exp = require('express')
const router = exp.Router()
const db = require('../db')
// 添加海鲜种类
router.post('/add', function (req, res) {
  let reqData = req.body.seafoodType
  let name = reqData.name
  var seafoodType = new db.SeafoodType(reqData)
  db.SeafoodType.find({ 'name': name }, function (err, data) {
    if (!err) {
      if (data.length === 0) {
        seafoodType.save(function (err) {
          if (!err) {
            // 添加成功
            res.status(200).json({
              code: '1111',
              msg: '海鲜种类,添加成功'
            })
          } else {
            // 添加失败
            res.status(200).json({
              code: '0000',
              msg: '海鲜种类,添加失败'
            })
          }
        })
      } else {
        res.status(200).json({
          code: '0000',
          msg: '海鲜种类已存在'
        })
      }
    }
  })
})
// 查找所以种类,分页
router.post('/seafoodTypeList', function (req, res) {
  let reqData = req.body.pageInfo
  var index = reqData.index
  var size = reqData.size
  db.SeafoodType.find().then(function (data) {
    var result = data.reverse().slice(parseInt((index - 1) * size), Number(parseInt((index - 1) * size) + parseInt(size)))
    var count = Math.ceil(data.length / size)
    res.send({
      code: 'success',
      data: result,
      count: count,
      length: data.length
    })
  }).catch(function (err) {
    console.log(err)
  })
})
// 查找所有种类列表,不分页
router.post('/seafoodTypeListAll', function (req, res) {
  db.SeafoodType.find().then(function (data) {
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
  let reqData = req.body.seafoodType
  let id = reqData._id
  db.SeafoodType.find().then(function (data) {
    // 先查下数据库,名称是否相同
    data.forEach((item) => {
      if (item.name === reqData.name && item.info == reqData.info) {
        res.send({
          code: "0000",
          msg: "修改失败,海鲜种类的名称和简介不能与其他相同"
        })
      }
    })
    // 再存数据
    db.SeafoodType.findByIdAndUpdate(id, reqData, function (err) {
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
  let reqData = req.body.seafoodType
  let id = reqData._id
  db.SeafoodType.findByIdAndRemove(id, function (err) {
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