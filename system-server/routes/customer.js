const exp = require('express')
const router = exp.Router()
const db = require('../db')
// 添加
router.post('/add', function (req, res) {
  let reqData = req.body.customer
  let customerName = reqData.customerName
  let gender = reqData.gender
  let phoneNumber = reqData.phoneNumber
  let shopTime = reqData.shopTime
  let name = reqData.name
  let seafoodName = reqData.seafoodName
  let amount = reqData.amount
  var customer = new db.Customer(reqData)
  // 唯一性
  db.Customer.find({
    'customerName': customerName,
    'gender': gender,
    'phoneNumber': phoneNumber,
    'shopTime': shopTime,
    'name': name,
    'seafoodName': seafoodName,
    'amount': amount,
  }, function (err, data) {
    if (!err) {
      if (data.length === 0) {
        customer.save(function (err) {
          if (!err) {
            // 添加成功
            res.status(200).json({
              code: '1111',
              msg: '客户,添加成功'
            })
          } else {
            // 添加失败
            res.status(200).json({
              code: '0000',
              msg: '客户,添加失败'
            })
          }
        })
      } else {
        res.status(200).json({
          code: '0000',
          msg: '客户已存在'
        })
      }
    }
  })
})
// 查找所有
router.post('/list', function (req, res) {
  let reqData = req.body.pageInfo
  var index = reqData.index
  var size = reqData.size
  db.Customer.find().then(function (data) {
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
  let reqData = req.body.customer
  let id = reqData._id
  let customerName = reqData.customerName
  db.Customer.find({ 'customerName': customerName }).then(function (data) {
    // 先查下数据库,名称是否相同
    data.forEach((item) => {
      if (item.customerName == reqData.customerName && item.gender == reqData.gender && item.phoneNumber == reqData.phoneNumber && item.shopTime == reqData.shopTime && item.name == reqData.name && item.seafoodName == reqData.seafoodName && item.amount == reqData.amount) {
        res.send({
          code: "0000",
          msg: "修改失败,不能与其他相同"
        })
      }
    })
    // 更新数据
    db.Customer.findByIdAndUpdate(id, reqData, function (err) {
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
  let reqData = req.body.customer
  let id = reqData._id
  db.Customer.findByIdAndRemove(id, function (err) {
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