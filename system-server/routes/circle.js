const exp = require('express')
const router = exp.Router()
const db = require('../db')
// 添加
router.post('/add', function (req, res) {
  if (req.body.hasOwnProperty('circle')) {
    let reqData = req.body.circle
    let title = reqData.title
    var circle = new db.Circle(reqData)
    db.Circle.find({ 'title': title }, function (err, data) {
      if (!err) {
        if (data.length === 0) {
          circle.save(function (err) {
            if (!err) {
              // 添加成功
              res.status(200).json({
                code: '1111',
                msg: '添加成功'
              })
            } else {
              // 添加失败
              res.status(200).json({
                code: '0000',
                msg: '添加失败'
              })
            }
          })
        } else {
          res.status(200).json({
            code: '0000',
            msg: '已经存在'
          })
        }
      }
    })
  } else {
    res.status(200).json({
      code: '1111',
      msg: '图片处理接口'
    })
  }
})
// 查找所以种类,分页
router.post('/list', function (req, res) {
  let reqData = req.body.pageInfo
  var index = reqData.index
  var size = reqData.size
  db.Circle.find().then(function (data) {
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
// 不分页
router.post('/allList', function (req, res) {
  db.Circle.find().then(function (data) {
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
  let reqData = req.body.circle
  let id = reqData._id
  db.Circle.findByIdAndUpdate(id, reqData, function (err) {
    if (!err) {
      res.send({
        code: "1111",
        msg: "修改成功"
      })
    }
  })
})
// 删除
router.post('/delete', function (req, res) {
  let reqData = req.body.circle
  let id = reqData._id
  db.Circle.findByIdAndRemove(id, function (err) {
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