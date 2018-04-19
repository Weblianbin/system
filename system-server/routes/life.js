const exp = require('express')
const router = exp.Router()
const db = require('../db')
// 添加
router.post('/add', function (req, res) {
  let reqData = req.body.life
  let title = reqData.title
  var life = new db.Life(reqData)
  db.Life.find({ 'title': title }, function (err, data) {
    if (!err) {
      if (data.length === 0) {
        life.save(function (err) {
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
})
// 查找所以种类,分页
router.post('/list', function (req, res) {
  let reqData = req.body.pageInfo
  var index = reqData.index
  var size = reqData.size
  db.Life.find().then(function (data) {
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
// 修改
router.post('/edit', function (req, res) {
  let reqData = req.body.sell
  let id = reqData._id
  let life = reqData.life
  let title = reqData.title
  let time = reqData.time
  db.Life.find({ 'title': title }).then(function (data) {
    data.forEach((item) => {
      if (item.title == reqData.title && item.time == reqData.time && item.content == reqData.content && item.author == reqData.author) {
        res.send({
          code: "0000",
          msg: "修改失败"
        })
      }
    })
    // 再存数据
    db.Life.findByIdAndUpdate(id, reqData, function (err) {
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
  let reqData = req.body.life
  let id = reqData._id
  db.Life.findByIdAndRemove(id, function (err) {
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