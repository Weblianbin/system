const exp = require('express')
const router = exp.Router()
const db = require('../db')
// 添加海鲜种类
router.post('/add', function (req, res) {
  // console.log('req.body', req.body)
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
// 查找所以种类
router.post('/seafoodTypeList', function (req, res) {
  let reqData = req.body.pageInfo
  var index = reqData.index
  var size = reqData.size
  db.SeafoodType.find().then(function (data) {
      console.log('all', data)
      var result = data.slice(parseInt((index - 1) * size), Number(parseInt((index - 1) * size) + parseInt(size)))
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
// 导出注册路由
module.exports = router