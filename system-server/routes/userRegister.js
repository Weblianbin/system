const exp = require('express')
const register = exp.Router()
const db = require('../db')
// 注册
register.post('/', function (req, res) {
  let reqData = req.body.user
  let account = reqData.account
  var user = new db.UserU(reqData)
  db.UserU.find({ 'account': account }, function (err, data) {
    if (!err) {
      if (data.length === 0) {
        user.save(function (err) {
          if (!err) {
            // 注册成功
            res.status(200).json({
              code: '1111',
              msg: '注册成功'
            })
          } else {
            // 注册失败
            res.status(200).json({
              code: '0000',
              msg: '注册失败'
            })
          }
        })
      } else {
        res.status(200).json({
          code: '0000',
          msg: '用户已存在'
        })
      }
    }
  })
})
// 导出注册路由
module.exports = register