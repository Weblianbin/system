const exp = require('express')
const login = exp.Router()
const db = require('../db')
// 登录
login.post('/', function (req, res) {
  let reqData = req.body.user
  console.log(reqData)
  let account = reqData.account
  let password = reqData.password
  db.UserU.find({ 'account': account }, function (err, data) {
    if (!err) {
      console.log('data', data)
      if (data.length !== 0) {
        if (data[0].account === account) {
          if (data[0].password === password) {
            res.status(200).json({
              code: '1111',
              msg: '登录成功',
              dataObj: data
            })
          } else {
            res.status(200).json({
              code: '0000',
              msg: '密码错误,请重新登录'
            })
          }
        }
      } else {
        // 不存在
        console.log('333333')
        res.status(200).json({
          code: '0000',
          msg: '用户不存在,请先注册'
        })
      }
    }
  })
})
// 导出注册路由
module.exports = login