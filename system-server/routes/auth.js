const exp = require('express')
const router = exp.Router()
const db = require('../db')
// 用户信息
router.post('/detail', function (req, res) {
  let reqData = req.body.user
  console.log('用户信息', reqData)
  let account = reqData.account
  var user = new db.User(reqData)
  db.User.find({ 'account': account }, function (err, data) {
    if (!err) {
      if (data.length !== 0) {
        console.log('data', data)
        res.status(200).json({
          code: '1111',
          msg: '获取用户信息成功',
          dataObj: data
        })
      }
    }
  })
})
// 用户修改
router.post('/update', function (req, res) {
  let reqData = req.body.user
  console.log('用户修改', reqData)
  let id = reqData._id
  let account = reqData.account
  var user = new db.User(reqData)
  db.User.find({ 'account': account }, function (err, data) {
    if (!err) {
      // 先查下数据库,名称是否相同
      data.forEach((item) => {
        console.log('item', item)
        if (item.account == reqData.account && item.password == reqData.password) {
          res.send({
            code: "0000",
            msg: "修改失败,用户名不能与其他相同"
          })
        }
      })
      // 再存数据
      db.User.findByIdAndUpdate(id, reqData, function (err) {
        if (!err) {
          res.send({
            code: "1111",
            msg: "修改成功"
          })
        }
      })
    }
  })
})
// 导出注册路由
module.exports = router