var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var swig = require('swig');
var moment = require('moment');
var formidable = require('formidable');

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
    
   var os = require('os');
var ifaces = os.networkInterfaces();





    getIp();//获取真实ip地址
    var ip = getIp();
    console.log('ceshi'+ip);
    debugger;


function getIp(){
     var ipAddress;
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                return;
            }
            if (alias >= 1) {//查询真实IP地址
                console.log(ifname + ':' + alias, iface.address);
            } else {
                console.log(ifname, iface.address);
            }
            ipAddress = iface.address;
            ++alias;
        });
    });
    return ipAddress;
}
    
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

    Order.find({},function (err,order) {
            console.log(order);
            res.render('personal',{
            order:order,
            user:req.session.username,
            userId:req.session.userid
        });
    })
   
})  

router.get('/personal-site',function (req,res,next) {
     
     Site.find({},function (err,site) {
        res.render('personal-site',{
          site:site,
          user:req.session.username,
          userId:req.session.userid
        });
           });
    
     
    })
    


router.get('/bookpage',function (req,res,next) {
    res.render('bookpage',{
        user:req.session.username
    });
})

router.get('/bookpage-two',function (req,res,next) {
    res.render('bookpage-two',{
        user:req.session.username
    });
})

router.get('/bookpage-three',function (req,res,next) {
    res.render('bookpage-three',{
        user:req.session.username
    });
})

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;  
var uri = 'mongodb://localhost/bookrack';
var db = mongoose.connect(uri);
var fs = require('fs');//node.js核心的文件处理模块
var formidable = require('formidable');//文件上传插件

var SchemaS = mongoose.Schema({
    siteid:String,
    sitename:String,
    siteaddress:String,
    phone:String
},{
  versionKey: false
});

var SchemaB = mongoose.Schema({
    bookname : String,
    write:String
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
    userid:String,
    username:String,
    password:String,
    rpassword:String,
    email:String
}, {
  versionKey: false
});


var SchemaO = mongoose.Schema({
    orderid:String,
    ordername:String,
    orderprice:String,
    ordertime:String,
    orderstate:String,
    orderamount:String
}, {
  versionKey: false
});

var SchemaF = mongoose.Schema({
    file_name:String,
    file_path:String
});


var Order = mongoose.model('order',SchemaO);//订单信息
var Book = mongoose.model('book',SchemaB);//书本信息
var Name = mongoose.model('name',SchemaP);//个人姓名
var User = mongoose.model('user',SchemaU);//用户
var Site = mongoose.model('site',SchemaS);//地址信息
var File = mongoose.model('file',SchemaF);//头像上传            
// var book = new Book({
//     bookname:"时生",
//     write:"东野圭吾"
// });
// book.save(function (err) {});

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
            userid:req.body.username + "1",
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
                req.session.userid = user[i].userid;
                
                return res.redirect('/bookrack');
            }
        }
        
        res.redirect('/enter');
    })
});

//用户注销
router.post('/out',function (req,res,next) {
    req.session.username = null;
    req.session.password = null;
    res.redirect('/bookrack');
});

//添加订单
router.post('/addorder',function (req,res,next) {
    console.log(req.session.userid);
    var orderdata = new Order ({
        orderid:req.session.userid,
        ordername:"时生",
        orderprice:"$34",
        ordertime:moment().format('MMM Do YY'),
        orderstate: "代发货",
        orderamount:req.body.bookamount
    }); 

    orderdata.save(function (err) {
        if (err) {
                    return res.redirect('/enter');
            } else {
                    res.redirect('/personal');
            }
    });

});

router.post('/addorder-three',function (req,res,next) {

    var orderdata_three = new Order ({
        orderid:req.session.userid,
        ordername:"幻夜",
        orderprice:"$30",
        ordertime:moment().format('MMM Do YY'),
        orderstate: "代发货",
        orderamount:req.body.bookamount
    }); 
    orderdata_three.save(function (err) {
        if (err) {
                    return res.redirect('/enter');
            } else {
                    res.redirect('/personal');
            }
    });


});

router.post('/addorder-two',function (req,res,next) {
    var orderdata_two = new Order ({
        orderid:req.session.userid,
        ordername:"漫长的中场休息",
        orderprice:"$27",
        ordertime:moment().format('MMM Do YY'),
        orderstate: "代发货",
        orderamount:req.body.bookamount
    }); 

    orderdata_two.save(function (err) {
        if (err) {
                    return res.redirect('/enter');
            } else {
                    res.redirect('/personal');
            }
    });

});

//修改个人信息
router.post('/upload',function(req,res,next){  

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

//修改地址信息
router.post('/addsite',function (req,res,next) {
     
     var sitedata = new Site ({
         siteid:req.session.userid,
         sitename:req.body.sitename,
         siteaddress:req.body.siteaddress,
         phone:req.body.phone
     });
     sitedata.save(function (err) {
       if (err) {
           res.redirect('/enter');
       } else {
           res.redirect('/personal-site');
       }
     });
     
})

//搜索书籍
router.post('/search',function (req,res,next) {

    if (req.body.bookname == "时生") {
        res.redirect('/bookpage');
    } else if (req.body.bookname == "幻夜") {
        res.redirect('/bookpage-three');
    } else if (req.body.bookname == "漫长的中场休息") {
        res.redirect('/bookpage-two');
    }
});



module.exports = router;