const exp = require('express')
const router = exp.Router()
const db = require('../db')
// 添加海鲜
router.post('/add', function (req, res) {
  let reqData = req.body.imgSrc
  console.log('reqData', reqData)
  var photo=reqData.photo
  var imgSrc = new db.imgSrc(reqData)
  db.ImgSrc.find({ 'photo': photo}, function (err, data) {
    if (!err) {
      if (data.length === 0) {
        seafood.save(function (err) {
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
          msg: '海鲜名称已存在'
        })
      }
    }
  })
})
// 导出注册路由
module.exports = router