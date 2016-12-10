var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/enter',function (req,res,next) {
	res.render('enter-page',{});
})

router.get('/bookrack',function (req,res,next) {
	res.render('bookrack',{});
})

router.get('/cobinet',function (req,res,next) {
	res.render('cobinet',{});
})
/* GET Enter. */
router.get('/login',function (req,res,next) {
	res.render('login',{});
})



var mongoose = require('mongoose');
var uri = 'mongodb://localhost/nodetest1';
var fs = require('fs');//node.js核心的文件处理模块
var formidable = require('formidable');//文件上传插件


var schemaUser = mongoose.Schema({
    name : String,
    password : String,

});

var schemaU = mongoose.Schema({
    username: String,
    password: String,
    identity: String
})


var User = mongoose.model('User', schemaU);//用户表


//用户注册render数据
exports.reg = function (req,res) {
	res.render('req',{
		title: "用户注册",
        navNum: 9,
        error: req.flash('error'),
        username: req.session.username
	});
}
// 底部的render数据
// exports.buttomtop = function (req, res) {
//     var top = [
//         {num: 1, list: '《盗墓笔记》'},
//         {num: 2, list: '《私募操盘高手投资实战技巧》'},
//         {num: 3, list: '《平凡的世界》'},
//         {num: 4, list: '《穆斯林的葬礼》'},
//         {num: 5, list: '《白夜行》'},
//         {num: 6, list: '《同级生》'},
//         {num: 7, list: '《挪威的森林》'},
//         {num: 8, list: '《秒速五厘米》'},
//         {num: 9, list: '《教父》'},
//         {num: 10, list: '《苏菲的世界》'}
//     ];
//     var write = [
//         {list:'南派三叔'},
//         {list:'连升'},
//         {list:'路遥'},
//         {list:'霍达'},
//         {list:'东野圭吾'},
//         {list:'东野圭吾'},
//         {list:'村上春树'},
//         {list:'新海诚'},
//         {list:'马里奥·普佐 '},
//         {list:'乔斯坦·贾德'}
//     ];

//      res.render('buttomtop', {
//         title: 'top10',
//         navNum: 1,
//         top: top,
//         write: write,
//         username: req.session.username,
//         identity: req.session.identity
//     });
// };
//information的数据
// exports.information = function (req,res) {
// 	var message = [
//         {list:'地址：西南民族大学'},
//         {list:'电话：12343535'},
//         {list:'邮箱：64783848@qq.com'}
// 	]
// 	 res.render('information', {
//         title: '信息',
//         navNum: 1,
//         top: top,
//         write: write,
//         username: req.session.username,
//         identity: req.session.identity
//     });
// }
//bookrackhot列表
// exports.bookrackhot = function (req,res) {
// 	var data = [
//         {
//         	src: "../images/01.jpg",
//         	title: "book",
//         	price: "$20"
//         },
//         {
//         	src: "../images/01.jpg",
//         	title: "book",
//         	price: "$20"
//         },
//         {
//         	src: "../images/01.jpg",
//         	title: "book",
//         	price: "$20"
//         },
//         {
//         	src: "../images/01.jpg",
//         	title: "book",
//         	price: "$20"
//         },
//         {
//         	src: "../images/01.jpg",
//         	title: "book",
//         	price: "$20"
//         },
//         {
//         	src: "../images/01.jpg",
//         	title: "book",
//         	price: "$20"
//         },
// 	];
//         res.render('bookrackhot', {
// 	        title: "火热推介",
// 	        navNum: 5,
// 	        navFirst: 3,
// 	        data: data,
// 	        username: req.session.username,
// 	        identity: req.session.identity
// 	    })
// }

//bookrack best-seller列表
// exports.bestseller = function (req,res) {
// 	var data = [
//         {
//         	src: "../images/01.jpg",
//         	title: "book",
//         	price: "$20"
//         },
//         {
//         	src: "../images/01.jpg",
//         	title: "book",
//         	price: "$20"
//         },
//         {
//         	src: "../images/01.jpg",
//         	title: "book",
//         	price: "$20"
//         },
//         {
//         	src: "../images/01.jpg",
//         	title: "book",
//         	price: "$20"
//         },
// 	];
// 	res.render('bestseller', {
//         title: "火热销售",
//         navNum: 6,
//         data: data,
//         username: req.session.username,
//         identity: req.session.identity
//     })
// }
//用户检测
// exports.doReg = function (req, res) {
//     //检查密码
//     if (req.body['password-repeat'] != req.body['password']) {
//         //req.flash('error', '两次输入的密码不一致');
//         return res.redirect('/reg');
//     }

//     //生成md5的密码
//     var md5 = crypto.createHash('md5');
//     var password = md5.update(req.body.password).digest('base64');

//     var newUser = new User({
//         username: req.body.username,
//         password: password,
//         identity: req.body.identity
//     });

//      //检查用户名是否已经存在
//     User.find({'username': newUser.username}, function (err, user) {
//         if (user.length != 0) {
//             //res.send(user.length);
//             req.flash('error', "用户名已经存在");
//             return res.redirect('/reg');
//         }
//         //如果不存在則新增用戶
//         newUser.save(function (err) {
//             if (err) {
//                 return res.redirect('/reg');
//             }
//             res.redirect('/login');
//         });
//     });
// };
//用户登入
router.post('/login', function (req, res, next) {
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    //检测用户是否存在
    User.get(req.body.email, function (err, user) {
        if (!user) {
            req.flash('error', '密码或用户名错误！');
            return res.redirect('/signup');
        }
        //检测密码是否一致
        if (user.password != password) {
            req.flash('error', '密码错误');
            return res.redirect('/signup');
        }
        req.session.user = user;
        req.flash('success', '登录成功');
        res.redirect('/');
    });
});
/* GET enter page. */
router.route("/enter").get(function(req,res){    // 到达此路径则渲染enter文件，并传出title值供 login.html使用
    res.render("enter",{title:'User enter'});
}).post(function(req,res){                        // 从此路径检测到post方式则进行post数据的处理操作
    //get User info
     //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var User = global.dbHandel.getModel('user');  
    var uname = req.body.uname;                //获取post上来的 data数据中 uname的值
    User.findOne({name:uname},function(err,doc){   //通过此model以用户名的条件 查询数据库中的匹配信息
        if(err){                                         //错误就返回给原post处（login.html) 状态码为500的错误
            res.send(500);
            console.log(err);
        }else if(!doc){                                 //查询不到用户名匹配信息，则用户名不存在
            req.session.error = '用户名不存在';
            res.send(404);                            //    状态码返回404
        //    res.redirect("/login");
        }else{ 
            if(req.body.upwd != doc.password){     //查询到匹配用户名的信息，但相应的password属性不匹配
                req.session.error = "密码错误";
                res.send(404);
            //    res.redirect("/login");
            }else{                                     //信息匹配成功，则将此对象（匹配到的user) 赋给session.user  并返回成功
                req.session.user = doc;
                res.send(200);
            //    res.redirect("/home");
            }
        }
    });
});
//GET login page
router.route("/login").get(function(req,res){    // 到达此路径则渲染register文件，并传出title值供 register.html使用
    res.render("login",{title:'User login'});
}).post(function(req,res){ 
     //这里的User就是从model中获取user对象，通过global.dbHandel全局方法（这个方法在app.js中已经实现)
    var User = global.dbHandel.getModel('user');
    var uname = req.body.uname;
    var upwd = req.body.upwd;
    User.findOne({name: uname},function(err,doc){   // 同理 /login 路径的处理方式
        if(err){ 
            res.send(500);
            req.session.error =  '网络异常错误！';
            console.log(err);
        }else if(doc){ 
            req.session.error = '用户名已存在！';
            res.send(500);
        }else{ 
            User.create({                             // 创建一组user对象置入model
                name: uname,
                password: upwd
            },function(err,doc){ 
                 if (err) {
                        res.send(500);
                        console.log(err);
                    } else {
                        req.session.error = '用户名创建成功！';
                        res.send(200);
                    }
                  });
        }
    });
});
/* GET home page. */
router.get("/index",function(req,res){ 
    if(!req.session.user){                     //到达/home路径首先判断是否已经登录
        req.session.error = "请先登录"
        res.redirect("/enter");                //未登录则重定向到 /login 路径
    }
    res.render("index",{title:'Home'});         //已登录则渲染home页面
});
/* GET logout page. */
router.get("/logout",function(req,res){    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
    req.session.user = null;
    req.session.error = null;
    res.redirect("/");
});

router.post('/signup', function (req, res) {
    var email = req.body.email,
        nickname = req.body.nickname,//昵称
        password = req.body.password,//密码
        planName = req.body.planName,
        endPlan = req.body.endPlan,
        curPage = req.body.curPage,
        re_password = req.body.re_password;//重复密码
    if (planName == null || planName.length === 0) {
        planName = '';
    }
    if (endPlan == null || endPlan.length === 0) {
        endPlan = false;
    }
    if (curPage == null || curPage.length === 0) {
        curPage = false;
    }
    if (re_password !== password) {
        req.flash('error', '两次输入密码不一致');
        return res.redirect('/signup');
    }
    /*生成密码的md5*/
    var md5 = crypto.createHash('md5'),
        password = md5.update(password).digest('hex');
    var newUser = new User({
        nickname: nickname,
        email: email,
        password: password,
        planName: planName,
        endPlan: endPlan,
        curPage: curPage
    });

//    检测用户名是否存在
    User.get(newUser.email, function (err, user) {
        if (err) {
            console.log(err);
            req.flash('error', err);
            return res.redirect('/signup');
        }
        if (user) {
            req.flash('error', '用户已经存在');
            console.log('已存在');
            return res.redirect('/signup');
        }

        //如果不存在
        newUser.save(function (err, user) {
                if (err) {
                    req.flash('error', err);
                    return res.redirect('/singup');//注册失败
                }
                req.session.user = newUser;
                req.flash('success', '注册成功');
                res.redirect('/index');
            }
        );
    });
});

module.exports = router;