var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



var mongoose = require('mongoose');
var uri = 'mongodb://localhost/nodetest1';
var fs = require('fs');//node.js核心的文件处理模块
var formidable = require('formidable');//文件上传插件



var schema = mongoose.Schema({
    title: String,
    des: String
});

var schemaU = mongoose.Schema({
    username: String,
    password: String,
    identity: String
})
var schemaC = mongoose.Schema({
    id: Number,
    name: String,
    teacher:String
})
var schemaA = mongoose.Schema({
    id: Number,
    course_name: String,
    stu_name: String,
    teac_name:String
})
var schema
var schemaW = mongoose.Schema({
    stu_name: String,
    title: String,
    question: String,
    answer: String,
    course_title:String,
    course_teacher:String,
    file_name: String,
    file_path: String
});
var schemaS = mongoose.Schema({
    teacher:String,
    work_title:String,
    course_title:String,
    require:String,
    file_name: String,
    file_path: String
})
var schemaR = mongoose.Schema({
    teacher:String,
    work_title:String,
    course_title:String,
    stu_name:String,
    check_content:String
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
//底部的render数据
exports.buttomtop = function (req, res) {
    var top = [
        {num: 1, list: '《盗墓笔记》'},
        {num: 2, list: '《私募操盘高手投资实战技巧》'},
        {num: 3, list: '《平凡的世界》'},
        {num: 4, list: '《穆斯林的葬礼》'},
        {num: 5, list: '《白夜行》'},
        {num: 6, list: '《同级生》'},
        {num: 7, list: '《挪威的森林》'},
        {num: 8, list: '《秒速五厘米》'},
        {num: 9, list: '《教父》'},
        {num: 10, list: '《苏菲的世界》'}
    ];
    var write = [
        {list:'南派三叔'},
        {list:'连升'},
        {list:'路遥'},
        {list:'霍达'},
        {list:'东野圭吾'},
        {list:'东野圭吾'},
        {list:'村上春树'},
        {list:'新海诚'},
        {list:'马里奥·普佐 '},
        {list:'乔斯坦·贾德'}
    ];

     res.render('buttomtop', {
        title: 'top10',
        navNum: 1,
        top: top,
        write: write,
        username: req.session.username,
        identity: req.session.identity
    });
};
//information的数据
exports.information = function (req,res) {
	var message = [
        {list:'地址：西南民族大学'},
        {list:'电话：12343535'},
        {list:'邮箱：64783848@qq.com'}
	]
	 res.render('information', {
        title: '信息',
        navNum: 1,
        top: top,
        write: write,
        username: req.session.username,
        identity: req.session.identity
    });
}
//bookrackhot列表
exports.bookrackhot = function (req,res) {
	var data = [
        {
        	src: "../images/01.jpg",
        	title: "book",
        	price: "$20"
        },
        {
        	src: "../images/01.jpg",
        	title: "book",
        	price: "$20"
        },
        {
        	src: "../images/01.jpg",
        	title: "book",
        	price: "$20"
        },
        {
        	src: "../images/01.jpg",
        	title: "book",
        	price: "$20"
        },
        {
        	src: "../images/01.jpg",
        	title: "book",
        	price: "$20"
        },
        {
        	src: "../images/01.jpg",
        	title: "book",
        	price: "$20"
        },
	];
        res.render('bookrackhot', {
	        title: "火热推介",
	        navNum: 5,
	        navFirst: 3,
	        data: data,
	        username: req.session.username,
	        identity: req.session.identity
	    })
	}
//bookrack best-seller列表
exports.bestseller = function (req,res) {
	var data = [
        {
        	src: "../images/01.jpg",
        	title: "book",
        	price: "$20"
        },
        {
        	src: "../images/01.jpg",
        	title: "book",
        	price: "$20"
        },
        {
        	src: "../images/01.jpg",
        	title: "book",
        	price: "$20"
        },
        {
        	src: "../images/01.jpg",
        	title: "book",
        	price: "$20"
        },
	];
	res.render('bestseller', {
        title: "火热销售",
        navNum: 6,
        data: data,
        username: req.session.username,
        identity: req.session.identity
    })
}
//用户检测
exports.doReg = function (req, res) {
    //检查密码
    if (req.body['password-repeat'] != req.body['password']) {
        //req.flash('error', '两次输入的密码不一致');
        return res.redirect('/reg');
    }

    //生成md5的密码
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    var newUser = new User({
        username: req.body.username,
        password: password,
        identity: req.body.identity
    });

     //检查用户名是否已经存在
    User.find({'username': newUser.username}, function (err, user) {
        if (user.length != 0) {
            //res.send(user.length);
            req.flash('error', "用户名已经存在");
            return res.redirect('/reg');
        }
        //如果不存在則新增用戶
        newUser.save(function (err) {
            if (err) {
                return res.redirect('/reg');
            }
            res.redirect('/login');
        });
    });
};
//用户登入
exports.login = function (req, res) {
    res.render('login', {
        title: '用户登录',
        navNum: 8,
        error: req.flash('error'),
        username: req.session.username,
        identity: req.session.identity
    });
};
exports.doLogin = function (req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.find({'username': req.body.username}, function (err, user) {
        //res.send(user);
        for (var i in user) {
            if (req.body.username == user[i].username
                && password == user[i].password
                && req.body.identity == user[i].identity) {
                req.session.username = req.body.username;
                req.session.identity = req.body.identity;

                return res.redirect('/');
            }
        }
        req.flash('error', "用户名或密码不对");
        res.redirect('/login');
    })
};
//用户登出
exports.logout = function (req, res) {
    req.session.username = null;
    req.session.identity = null;
    req.flash('success', '登出成功');
    res.redirect('/');
};

module.exports = router;