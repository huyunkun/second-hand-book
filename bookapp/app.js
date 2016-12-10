var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
var swig = require('swig');
var multer = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');


global.dbHandel = require('./datacase/dbHandel');
global.db = mongoose.connect('mongodb://localhost:27017/test');

// 加上 use(multer())
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(multer());
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);//使用swig模板引擎

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/enter',index);//enter路由
app.use('/login',index);//login路由

app.use('/loginout',index);//注销路由


/*
 * 启动session服务
 * */
app.use(session({
	secret:'secret',
	cookie:{
		maxAge:1000*60*30,//设置过期时间为一个月
	}
}));
app.use(function (req,res,next) {		
	res.locals.user = req.session.user; // 从session 获取 user对象
	var err = req.session.error;//获取错误信息
	delete req.session.error;
	res.locals.message = ""; // 展示的信息 message
	if (err) {
		res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
	}
	next();//中间件传递
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
