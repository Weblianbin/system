var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// 加载注册模块
var register = require('./routes/register')
var userRegister = require('./routes/userRegister')
// 加载登录模块
var login = require('./routes/login')
var userLogin = require('./routes/userLogin')
// 用户信息
var auth = require('./routes/auth')
// 加载海鲜种类模块
var seafood_type = require('./routes/seafood_type')
// 加载海鲜名称模块
var seafood = require('./routes/seafood')
// 加载客户模块
var customer = require('./routes/customer')
// 加载销售模块
var sell = require('./routes/sell')
var life = require('./routes/life')
var circle = require('./routes/circle')
// 加载销售模块
var imgSrc = require('./routes/imgSrc')
var message = require('./routes/userMessage')

var app = express();

// view engine setup
app.engine('html', require("express-art-template"));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// 处理跨域
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("Content-Type", "application/json;charset=utf-8");
  next()
})
// 使用注册路由
app.use('/register', register)
app.use('/userRegister', userRegister)
// 使用登录路由
app.use('/login', login)
app.use('/userLogin', userLogin)
// 使用管理员模块路由
app.use('/auth', auth)
// 使用海鲜种类路由
app.use('/seafood_type', seafood_type)
// 使用海鲜名称路由
app.use('/seafood', seafood)
// 使用客户信息路由
app.use('/customer', customer)
// 使用销售信息路由
app.use('/sell', sell)
app.use('/life', life)
app.use('/circle', circle)
app.use('/imgSrc', imgSrc)
app.use('/message', message)

module.exports = app;
