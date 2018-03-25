const exp = require('express')
const router = exp.Router()
const db = require('../db')
// 添加海鲜种类
router.post('/add', function (req, res) {
  let reqData = req.body.seafood
  let seafoodName = reqData.seafoodName
  let name = reqData.name
  var seafood = new db.Seafood(reqData)
  db.Seafood.find({ 'seafoodName': seafoodName, 'name': name }, function (err, data) {
    if (!err) {
      if (data.length === 0) {
        seafood.save(function (err) {
          if (!err) {
            // 添加成功
            res.status(200).json({
              code: '1111',
              msg: '海鲜名称,添加成功'
            })
          } else {
            // 添加失败
            res.status(200).json({
              code: '0000',
              msg: '海鲜名称,添加失败'
            })
          }
        })
      } else {
        res.status(200).json({
          code: '0000',
          msg: '海鲜名称已存在'
        })
      }
    }
  })
})
// 查找所以种类,分页
router.post('/seafoodList', function (req, res) {
  let reqData = req.body.pageInfo
  var index = reqData.index
  var size = reqData.size
  db.Seafood.find().then(function (data) {
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
  let reqData = req.body.seafood
  let id = reqData._id
  let seafoodName = reqData.seafoodName
  let name = reqData.name
  // 根据类别,查出所有海鲜名称
  db.Seafood.find({ 'name': name }).then(function (data) {
    // 先查下数据库,名称是否相同
    data.forEach((item) => {
      if (item.seafoodName == reqData.seafoodName && item.seafoodInfo == reqData.seafoodInfo) {
        res.send({
          code: "0000",
          msg: "修改失败,海鲜的名称和简介不能与其他相同"
        })
      }
    })
    // 再存数据
    db.Seafood.findByIdAndUpdate(id, reqData, function (err) {
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
  let reqData = req.body.seafood
  let id = reqData._id
  db.Seafood.findByIdAndRemove(id, function (err) {
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