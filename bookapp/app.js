var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');//用于解析post提交参数的模块
//路由信息
var index = require('./routes/index');
var users = require('./routes/users');
var fs = require('fs');//node.js核心的文件处理模块
var formidable = require('formidable');//文件上传插件
var urlencodedParser = bodyParser.urlencoded({extended: false});
var app = express();

// var routes = require('./routes');
var swig = require('swig');
var multer = require('multer');
var mongoose = require('mongoose');
var session = require('express-session');

 app.use(cookieParser());//应用session

    app.use(session({
      secret :  'secret_meteoric',
      cookie : {
        maxAge : 60000 * 20 //20 minutes
      },
      //store : sessionStore
    }));

// 加上 use(multer()) 
app.use(bodyParser.urlencoded({ extended: true }));
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
