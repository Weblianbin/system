const exp = require('express')
const router = exp.Router()
const db = require('../db')
// 添加
router.post('/add', function (req, res) {
  let reqData = req.body.message
  console.log('reqData', reqData)
  var message = new db.LiuYan(reqData)
  message.save(function (err) {
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
})
// 导出注册路由
module.exports = router