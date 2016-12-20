var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var swig = require('swig');

/* GET home page. */
router.get('/formdata',function (req,res,next) {
    res.render('test/formdata',{});
})

router.post('/stash',function (req,res,next) {
   res.end();
})





router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
router.get('/enter',function (req,res,next) {
	res.render('enter-page',{});
})
    
router.get('/bookrack',function (req,res,next) {

	console.log(req.session.user); 
    res.render('bookrack',{ 
     user:req.session.username
     });
})

router.get('/cobinet',function (req,res,next) {
	res.render('cobinet',{
       user:req.session.username
    });
})
/* GET Enter. */
router.get('/login',function (req,res,next) {
	res.render('login',{});
})
/* GET personal. */
router.get('/personal-data',function (req,res,next) {
    res.render('personal-data',{
         user:req.session.username
    });
})

router.get('/personal',function (req,res,next) {
    res.render('personal',{
        order:req.session.order,
        user:req.session.username
    });
})

router.get('/personal-site',function (req,res,next) {

     return res.render('personal-site',{
        user:req.session.username
        }); 
    })
    
router.post('/addsite',function (req,res,next) {
     res.send();
})

router.get('/bookpage',function (req,res,next) {
    res.render('bookpage',{
        user:req.session.username
    });
    console.log(req.session.ordername);
})


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;  
var uri = 'mongodb://localhost/bookrack';
var db = mongoose.connect(uri);
var fs = require('fs');//node.js核心的文件处理模块
var formidable = require('formidable');//文件上传插件

var SchemaB = mongoose.Schema({
    bookname : String,
    write:String,
    price:String
}, {
  versionKey: false
});

var SchemaP = mongoose.Schema({
    nickname:String,
    realname:String,

}, {
  versionKey: false
});

var SchemaU = mongoose.Schema({
    username:String,
    password:String,
    rpassword:String,
    email:String
}, {
  versionKey: false
});

var SchemaS = mongoose.Schema({
    sitename:String,
    siteaddress:String,
    phone:String
}, {
  versionKey: false
});

var SchemaO = mongoose.Schema({
    ordername:String,
    orderprice:String,
    ordertime:Date,
    orderstate:String
}, {
  versionKey: false
});

var Order = mongoose.model('order',SchemaO);//订单信息
var Book = mongoose.model('book',SchemaB);//书本信息
var Name = mongoose.model('name',SchemaP);//个人姓名
var User = mongoose.model('user',SchemaU);//用户
var Site = mongoose.model('site',SchemaS);//地址信息
              
//存入订单信息




//用户注册

router.post('/ulogin',function (req,res,next) {
    console.log(req.body);
    if (req.body.password != req.body.rpassword){
        //两次密码输入不一致
        return res.redirect('/');
    }   

    //生成md5的密码
    var md5 = crypto.createHash('md5');
    var rpassword = md5.update(req.body.rpassword).digest('base64'); 
    md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
   
    var newuser = new User({
            username:req.body.username,
            password:password,
            rpassword:rpassword,
            email:req.body.email,
        });

    //检查用户名是否已经存在
    User.find({'username':newuser.username},function (err,user) {
        if (user.length != 0) {
            return res.redirect('/login');
        }
        //如果不存在则新增用户
        newuser.save(function (err) {
            if (err) {
                return res.redirect('/login');
            } else {
                return res.redirect('/enter');
            }
        });
    })
})
//用户登陆
router.post('/uenter',function (req,res,next) {

    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    User.find({'username':req.body.username},function (err,user) {
        for (var i in user) {
            if (req.body.username == user[i].username
                &&password == user[i].password) {
                req.session.username = user[i].username;
                
                
                return res.redirect('/bookrack');
            }
        }
        
        res.redirect('/enter');
    })
});

//添加订单
router.post('/addorder',function (req,res,next) {

    var orderdata = new Order ({
        ordername:"01",
        orderprice:"$35",
        ordertime:Date.now(),
        orderstate: "代发货"
    }); 
    orderdata.save(function (err) {
        if (err) {
                    return res.redirect('/enter');
            } else {
                    Order.find({'ordername':"01"},function (err,order) {
                    req.session.order = order[3];
                    // res.end(JSON.stringify(order[0]));
                    res.redirect('/personal');
                })
            }
    });

});

//修改个人信息
router.post('/upload',function(req,res,next){
        // console.log(req.body.nickname);
        User.find({'username':req.body.nickname},function (err,user) {
            for (var i in user) {
                if (req.body.nickname == user[i].username) {

                    User.update({username:req.body.nickname},{username:req.body.newusername},function (err,user) {
                      req.session.username = req.body.newusername;

                        res.redirect('/personal-data');
                    });
                } else {
                    res.redirect('/enter');
                }
            }
        });
});


module.exports = router;