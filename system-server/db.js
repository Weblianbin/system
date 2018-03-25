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
// 普通管理员
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
  seafoodName: String,
  // 描述
  seafoodInfo: String,
  // 海鲜种类
  name: String
})
var Seafood = db.model('Seafood', seafood)

// 客户表
var customer = new db.Schema({
  customerName: {
    // 字段的类型
    type: String,
    // 设置默认值
    default: ''
  },
  gender: {
    // 字段的类型
    type: String,
    // 设置默认值
    default: ''
  },
  phoneNumber: {
    // 字段的类型
    type: Number,
    // 设置默认值
    default: ''
  },
  shopTime: {
    // 字段的类型
    type: Number,
    // 设置默认值
    default: ''
  },
  // 数量
  amount: {
    // 字段的类型
    type: Number,
    // 设置默认值
    default: ''
  },
  // 海鲜名称
  seafoodName: {
    // 字段的类型
    type: String,
    // 设置默认值
    default: ''
  },
  name: {
    // 字段的类型
    type: String,
    // 设置默认值
    default: ''
  }
})
var Customer = db.model('Customer', customer)

module.exports = {
  User,
  SeafoodType,
  Seafood,
  Customer
}
