const db = require('mongoose');
db.Promise = global.Promise;
db.connect('mongodb://localhost:27017/seafood', {
  promiseLibrary: global.Promise
})
db.connection.on('open', function () {
  console.log('打开数据库成功');
})
db.connection.on('error', function (err) {
  console.log('打开数据库失败' + err);
})
/** 
 * 创建数据库表的模型
 * 参数一:表的模型
 * 参数二:表模型的配置选项,collection表名
 * 
 * 1.先建立表的模型,
 * A: var userScheme=new mongoose.Schema({})----->{}在这个里面进行基础的配置
 * B: var User = db.model('User', userSchema)
 * 2.导出表
 * C: module.exports = {User}
 * 
 * module.exports.User = db.model('User', userSchema)---->B+C
 * */
// 管理员
var userSchema = new db.Schema({
  account: {
    // 字段的类型
    type: String,
    // 设置默认值
    default: ''
  },
  password: {
    type: String,
    default: ''
  }
})
var User = db.model('User', userSchema)
// 海鲜种类表
var seafood_type = new db.Schema({
  name: String,//类型
  info: String//描述
})
var SeafoodType = db.model('SeafoodType', seafood_type)
// 海鲜表
var seafood = new db.Schema({
  // 海鲜名称
  name: String,
  // 描述
  info: String,
  //类型,ref 设置关联,值是关联表的名称
  type: {
    type: db.Schema.Types.ObjectId,
    ref: 'seafood_type'
  }
})
var Seafood = db.model('Seafood', seafood)

module.exports = {
  User,
  SeafoodType,
  Seafood
}
