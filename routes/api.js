var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'app_baseinfo'
});
connection.connect();
var  addSql = 'INSERT INTO user(name,password) VALUES(?,?)';
var selectSql ='SELECT * FROM shoplist';
router.get('/users', function(req, res, next){
    var nums = [{id: 1, name: '1'}, {id: 2, name: '1'}, {id: 3, name: '1'}];
    // res.json(nums);
    res.send({
        status:1,
        data:nums,
    })
});

/**
 * 注册接口
 * 传入用户名和密码
 * 返回状态码  status: 1 注册成功  2 用户名已注册过
 */
router.post('/register', function(req, res, next){
    //sql语句  查找数据表里有没有这个用户的信息
    let sql="SELECT * FROM  `user` WHERE  `name` LIKE  '"+req.body.name+"'";
    //进行查询
    connection.query(sql, function (error, results) {
        if (error) throw error;
        //如果查到了 results的length肯定不是0，说明用户名已存在
        if(results.length!==0){
            res.send({
                status:2
            });
        }else{
            //没有的话就开始插入一条新的数据
            connection.query(addSql,[req.body.name,req.body.password], function (error, results) {
                if (error) throw error;
                //如果受影响的条数为1的话说明插入成功
                if(results.affectedRows===1){
                    res.send({
                        status:1,
                        role:null
                    });
                }
                //query方法是异步的
            });
        }
    });
});

/**
 * 登录接口
 * 传入用户名和密码
 * @return {object} 状态码 status  0 用户名不存在 2 密码错误 1 登陆成功
 * 登陆成功时还返回 一个字段 role  区分普通用户和管理员
 */
router.post('/login',function(req,res,next){
    let sql="SELECT * FROM  `user` WHERE  `name` LIKE  '"+req.body.name+"'";
    connection.query(sql, function (error, results) {
        if (error) throw error;
        console.log(results);
        if(results.length===0){
            //用户名不存在
            res.send({
                status:0
            });
        }else if(results[0].password!==req.body.password){
            //密码错误
            res.send({
                status:2
            });
        }else{
            //登陆成功
            res.send({
                status:1,
                role:results[0].level
            });
        }
    });
});

/**
 * 获取店铺列表
 * @return {Array} 店铺列表
 */
router.get('/shopList', function(req, res, next){

    connection.query(selectSql,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
    res.send({
        status:1,
        data:result,
    })
    });
});

router.post('/shopDetail', function(req, res, next){
    connection.query('SELECT * FROM dishes WHERE shopId=?',[req.body.shopId],function (err, result) {
        console.log(req.body);
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send({
            status:1,
            data:result,
        })
    });
});

/**
 * 支付接口
 * 传入订单编号、订单总价
 * 返回成功状态码status:1
 */
router.post('/orderPay', function(req, res, next){
    let order= 'INSERT INTO orderlist(serialNumber,totalPrice,shopName,userName,address,phoneNumber) VALUES(?,?,?,?,?,?)';
    connection.query(order,[req.body.number,req.body.total,req.body.shopName,req.body.userName,req.body.address,req.body.phoneNumber],function (err, result) {
        // console.log(req.body);
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send({
            status:1,
            data:''
        })
    });
});

/**
 * 获取订单接口（管理员获取所有订单）
 * 返回订单信息PropsType:<Array>
 */
router.get('/getOrderList', function(req, res, next){
    connection.query('SELECT *  FROM orderlist  ORDER BY orderId DESC',function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send({
            status:1,
            data:result,
        })
    });
});

/**
 * 获取订单接口（用户获取自己的订单）
 * 返回订单信息PropsType:<Array>
 * 传入用户名
 */
router.post('/getOwnOrder', function(req, res, next){
    connection.query('SELECT *  FROM orderlist WHERE userName=? ORDER BY orderId DESC',[req.body.userName],function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send({
            status:1,
            data:result,
        })
    });
});

/**
 * 新增店铺
 * 传入店铺名称、店铺描述、店铺图片
 * 返回成功状态码status:1
 */
router.post('/addShop', function(req, res, next){
    let add='INSERT INTO shoplist(shopName,address,img) VALUES(?,?,?)';
    connection.query(add,[req.body.shopName,req.body.address,req.body.img],function (err, result) {
        // console.log(req.body);
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send({
            status:1,
            data:''
        })
    });
});

/**
 * 删除店铺
 * 传入要删除的店铺id
 * 返回 状态成功
 */
router.post('/deleteShop', function(req, res, next){
    let deleteSql="DELETE FROM shoplist where shopId='"+req.body.shopId+"'";
    connection.query(deleteSql,function (err, result) {
        if(err){
            console.log('[INSERT ERROR] - ',err.message);
            return;
        }
        res.send({
            status:1,
            data:''
        })
    });
});

/**
 * 新增商品
 * 传入商品名称、商品价格、所属店铺、商品描述、商品图片
 * 返回成功状态码status:1
 */
router.post('/addDish', function(req, res, next){
    let add='INSERT INTO dishes(dishName,price,shopName,description,img,shopId) VALUES(?,?,?,?,?,?)';
    let sql="SELECT * FROM  `shoplist` WHERE  `shopName` LIKE  '"+req.body.shopName+"'";
    connection.query(sql, function (error, results) {
        // console.log(results[0].shopId);
        if (error) {
            console.log('[INSERT ERROR] - ', error.message);
            return;
        }
        if(results.length===0){
            res.send({
                status:0,
                data:'所属店铺不存在！'
            });
        }else{
            connection.query(add, [req.body.dishName, req.body.price, req.body.shopName, req.body.description, req.body.img,results[0].shopId], function (err, result) {
                // console.log(req.body);
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return;
                }
                res.send({
                    status: 1,
                    data: ''
                })
            });
        }
    });
});
module.exports = router;

