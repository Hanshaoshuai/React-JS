// mongod --config /usr/local/etc/mongod.conf
// mongo
// nodemon

//MySql密码 1yDx59q,nkv!
//查看所用已启动项目：
//pm2 list
//
//启动项目
// pm2 start index.js
//pm2 start index.js --attach 启动后监听显示日志流
//
//重启：
//pm2 restart XXX
//
//
//停止：
//pm2 stop XXX
//
//
//删除
//pm2 delete XXX

var express = require('express');
var request = require('request')
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var util = require('util'); // util.inspect()是将对象转换成字符串
var fs = require('fs');
// var multer = require('multer');
const Router = require('router')
const router = Router()

router.__dataStore = {}

const formidable = require('formidable');
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(bodyParser.json())// 创建 application/json 解析并注册  不然  req.body  接收不到前端传递的数据
var url = 'mongodb://127.0.0.1:27017/runoob';
// var url = 'mongodb://192.168.124.3:27017/runoob';
// 192.168.124.3

app.use(cookieParser());
// app.use(multer({ dest: path.join(__dirname, './uploads/'), limits: { fieldSize: 100000000000 } }).any());
// app.use(multer({ storage: storage, limits: { fieldSize: 100000000000 } }).any());
app.use(bodyParser.urlencoded({ extended: true }));
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
  res.header('X-Powered-By', ' 3.2.1');
  res.header('Content-Type', 'application/json;charset=utf-8');

  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('strict-origin-when-cross-origin', '*');

  next();
});

// var hostName = '127.0.0.1';
var hostName = ''; // 这个ip地址，之前一直以为是在这里指定IP地址，意味着输入这个IP地址就能访问到你的服务器了，其实并不是。如果指定IP地址，是意味着只有ip地址为这个才可以访问。所以，通常，如果任何人都可以访问，则不写// 页面调用接口，服务器IP加上下面的端口号就可以了
var ports = 2021;
var server = app.listen(ports, hostName, () => {
  console.log(`服务器运行在http:${hostName}:${ports}`);
  // var host = server.address().address;
  // var port = server.address().port;
});

// //https监听3000端口
// var https = require('https');
// const options = {
//   cert: fs.readFileSync('D:/Nginx/7325819_hanshaoshuai.cn_nginx/7325819_hanshaoshuai.cn.pem'),
//   key: fs.readFileSync('D:/Nginx/7325819_hanshaoshuai.cn_nginx/7325819_hanshaoshuai.cn.key')
// };
// var server = https.createServer(options, app);
// server.listen(ports, () => {
//   console.log(`服务器运行在http:${hostName}:${ports}`);
//   // var host = server.address().address;
//   // var port = server.address().port;
// });


var io = require('socket.io')(server, { cors: true });

app.use('/public', express.static(path.join(__dirname, 'public'))); //中间件来设置静态文件路径。例如你将图片CSS,JavaScript文件放在public目录下
// app.get('/index.html', function (req, res) {
//   console.log(req, __dirname);
//   res.sendFile(__dirname + '/' + 'index.html');
// });

io.sockets.on('connection', function (socket) {
  socket.join(socket.id)
  //此处每个回调socket就是一个独立的客户端，通常会用一个公共列表数组统一管理
  //socket.broadcast用于向整个网络广播(除自己之外)
  // 监听客户端emit的clientmessage事件发送的消息
  socket.on('clientmessage', async (data) => {
    // console.log('clientmessagkkkkkkkkkkkkkkkkkkkkk', data);
    if (data.uploadCompleted) {//只作为图片上传完成使用
      socket.broadcast.emit('message', {
        text: 'uploadCompleted',
        toName: data.toName,
      });
      socket.emit('message', {
        text: 'uploadCompleted',
        toName: data.toName,
      })
      return;
    }
    if (data.toDataURL) {
      socket.broadcast.emit('message', {
        text: data,
      });
      socket.emit('message', {
        text: data,
      });
      return;
    }
    if (Array.isArray(data.toName)) {
      data.type = 'groupChat';
    } else {
      data.type = 'chat';
    }
    data.dateTime = Date.parse(new Date());
    //推送给除自己外其他所有用户的消息，类似于广播
    // socket.broadcast.emit('message', {
    //   text: data,
    // });
    if (data.text_last) {
      return;
    }
    if (Array.isArray(data.toName)) {
      //群聊//记录存入
      await todo(data, socket);
      // socket.emit('message', {
      //   text: data,
      // });
    } else {
      data.toName = `${data.toName}`;
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db('runoob');
        var whereStr = { name: data.toName }; // 查询条件
        dbo
          .collection('site')
          .find(whereStr)
          .toArray(async (err, result) => {
            if (err) throw err;
            // console.log(result);
            if (result && result.length !== 0) {
              data.type = 'chat';
              //记录存入
              await todo(data, socket);
            } else if (data.toName !== '') {
              data.type = 'chat';
              data.text = '没有该用户！';
              socket.emit('message', {
                text: data,
              });
            }
            db.close();
          });
      });
    }
  });
  //发送给自己的消息
  socket.emit('message', {
    id: socket.id,
    text: '你上线了',
  });
  socket.on('goOnline', async (data) => {
    // console.log('clientmessagkkkkkkkkkkkkkkkkkkkkk', data);
    const newData = await socketIdChange(data)
    // console.log(newData, { ...newData, text: '上线' })
    socket.emit('newcomerOnline', { ...newData, text: '上线' });
    socket.broadcast.emit('newcomerOnline', { ...newData, text: '上线' });
  });
  // //告诉所有人上线了(除自己之外)
  // socket.broadcast.emit('message', {
  //   id: socket.id,
  //   text: '上线了',
  // });
  //连接断开，如关闭页面时触发
  socket.on('disconnect', async (data) => {
    // console.log('123456789', data);
    // //socket.broadcast用于向整个网络广播(除自己之外)
    // socket.broadcast.emit('message', {
    //   id: socket.id,
    //   text: '离开了',
    // });
    const newData = await socketIdChange({ name: '', socketId: socket.id })
    // console.log(newData, { ...newData, text: '下线' })
    socket.emit('newcomerOnline', { ...newData, text: '下线' });
    socket.broadcast.emit('newcomerOnline', { ...newData, text: '下线' });
  });

  socket.on('ondisconnect', async (data) => {
    // console.log('123456789', data);
    socket.broadcast.emit('newcomerOnline', { name: data.name, socketId: data.socketId, text: '下线' });
  });

  // 视频通话
  // 向对方呼叫
  socket.on('call', ({ to, sender, headPortrait }) => {
    // console.log(to, sender)
    socket.to(to).emit('call', { to, sender, headPortrait });
  })
  // 对方回应
  socket.on('respond', ({ to, sender, text, }) => {
    // console.log('respond===>>>', to, sender, text)
    socket.broadcast.emit('respond', { to, sender, text });
    socket.emit('respond', { to, sender, text });
  });
  // 语音切换
  socket.on('switch', ({ to, sender, text, }) => {
    socket.to(to).emit('switch', { to, sender, text });
  });
  // console.log("a user connected " + socket.id);

  socket.on("disconnect", () => {
    // console.log("user disconnected: " + socket.id);
    //某个用户断开连接的时候，我们需要告诉所有还在线的用户这个信息
    socket.broadcast.emit('user disconnected', socket.id);
  });

  socket.on("chat message", (msg) => {
    // console.log(socket.id + " say: " + msg);
    //io.emit("chat message", msg);
    socket.broadcast.emit("chat message", msg);
  });

  //当有新用户加入，打招呼时，需要转发消息到所有在线用户。
  socket.on('new user greet', (data) => {
    // console.log(data);
    // console.log(socket.id + ' greet ' + data.msg);
    socket.broadcast.emit('need connect', { sender: socket.id, msg: data.msg });
  });
  //在线用户回应新用户消息的转发
  socket.on('ok we connect', (data) => {
    io.to(data.receiver).emit('ok we connect', { sender: data.sender });
  });

  //sdp 消息的转发
  socket.on('sdp', (data) => {
    // console.log('sdp');
    // console.log(data.description);
    //console.log('sdp:  ' + data.sender + '   to:' + data.to);
    socket.to(data.to).emit('sdp', {
      description: data.description,
      sender: data.sender
    });
  });

  //candidates 消息的转发
  socket.on('ice candidates', (data) => {
    // console.log('ice candidates:  ');
    // console.log(data);
    socket.to(data.to).emit('ice candidates', {
      candidate: data.candidate,
      sender: data.sender
    });
  });
});

function paysign(appid, attach, body, mch_id, nonce_str, notify_url, openid, out_trade_no, spbill_create_ip, total_fee, trade_type) {
  var ret = {
    appid: appid,
    attach: attach,
    body: body,
    mch_id: mch_id,
    nonce_str: nonce_str,
    notify_url: notify_url,
    openid: openid,
    out_trade_no: out_trade_no,
    spbill_create_ip: spbill_create_ip,
    total_fee: total_fee,
    trade_type: trade_type
  };
  var string = raw(ret);
  var key = '_key';
  string = string + '&key=' + key;  //key为在微信商户平台(pay.weixin.qq.com)-->账户设置-->API安全-->密钥设置
  var crypto = require('crypto');
  return crypto.createHash('md5').update(string, 'utf8').digest('hex');
};

function raw(args) {
  var keys = Object.keys(args);
  keys = keys.sort()
  var newArgs = {};
  keys.forEach(function (key) {
    newArgs[key.toLowerCase()] = args[key];
  });

  var string = '';
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k];
  }
  string = string.substr(1);
  return string;
};

app.post('/notify', (req, res) => {
  var reqs = req.body
  res.end(
    {
      code: 200,
      data: reqs
    }
  );
})

app.post('/pay', (req, res) => {
  req = req.body
  console.log('post请求参数===>>>', req)
  var url = "https://api.mch.weixin.qq.com/pay/unifiedorder";
  var appid = req.appid;
  var mch_id = req.mch_id;
  var notify_url = req.notify_url;
  var out_trade_no = req.out_trade_no;
  var total_fee = req.total_fee;
  var attach = req.attach;
  var body = req.body;
  var nonce_str = req.nonce_str;
  var paySign = req.paySign;
  let formData = "<xml>";
  formData += "<appid>" + appid + "</appid>"; //appid
  formData += "<body>" + body + "</body>"; //商品或支付单简要描述
  formData += "<mch_id>" + mch_id + "</mch_id>"; //商户号
  formData += "<nonce_str>" + nonce_str + "</nonce_str>"; //随机字符串，不长于32位
  formData += "<notify_url>" + notify_url + "</notify_url>"; //支付成功后微信服务器通过POST请求通知这个地址
  formData += "<out_trade_no>" + out_trade_no + "</out_trade_no>"; //订单号
  formData += "<total_fee>" + total_fee + "</total_fee>"; //金额
  formData += "<attach>" + attach + "</attach>"; //附加数据
  formData += "<trade_type>NATIVE</trade_type>"; //NATIVE会返回code_url ，JSAPI不会返回
  formData += "<sign>" + paysign(appid, attach, body, out_trade_no, nonce_str, notify_url, '', out_trade_no, '', total_fee, 'NATIVE') + "</sign>";
  formData += "</xml>";
  request(
    {
      url: url,
      method: 'POST',
      body: formData
    }, function (err, response, body) {
      console.log("下单请求===>>>", formData, body);
      if (!err && response.statusCode === 200) {
        // console.log(body);
        // var prepay_id = getXMLNodeValue('prepay_id', body.toString("utf-8"));
        // var tmp = prepay_id.split('[');
        // var tmp1 = tmp[2].split(']');
        // var code_url = getXMLNodeValue('code_url', body.toString("utf-8"));
        // var tmp = code_url.split('[');
        // var tmp3 = tmp[2].split(']');
        res.send(
          {
            code: 200,
            // prepay_id: tmp1[0],
            // code_url: tmp3[0]
          }
        );
      }
    }
  );
})

// 更改个人socketid
const socketIdChange = ({ name, socketId }) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db('runoob');
      var whereStr = name ? { name: name } : { socketId: socketId }; // 查询条件
      var updateStr = {
        $set: name ? { socketId: socketId } : { socketId: '' },
      }; //更换内容
      // console.log('第-道', updateStr);
      if (!name) {
        dbo.collection('site').find(whereStr)
          .toArray((err, result) => {
            if (err) throw err;
            if (result) {
              // console.log('result====>>', result)
              resolve({ name: result[0]?.name, socketId: result[0]?.socketId })
            } else {
              reject('errr')
            }
          })
      }
      dbo.collection('site').updateOne(whereStr, updateStr, function (err, res) {
        if (err) throw err;
        // console.log('updateOne====>>', res);
        if (res.acknowledged && name) {
          dbo.collection('site').find(whereStr)
            .toArray((err, result) => {
              if (err) throw err;
              if (result) {
                // console.log('result====>>', result)
                resolve({ name: result[0]?.name, socketId: result[0]?.socketId })
              } else {
                reject('errr')
              }
              db.close();
            })
        } else if (!res.acknowledged) {
          reject('errr')
          db.close();
        }
      });
    });
  });
}

//存入记录
function todo(obj, socket) {
  // console.log('写入文件', obj);
  //创建目录
  return new Promise((resolve, reject) => {
    var fromTo = null,
      objs = [];
    fs.mkdir('./chatRecord', function (error) {
      if (error) {
        // console.log(error);
        reject('errr')
        return false;
      }
      // console.log('创建目录成功');
    });
    if (obj.type === 'groupChat') {
      if (obj.groupName) {
        fromTo = obj.groupName;
        fsChenge(obj, socket);
      }
    } else {
      fromTo = (obj.fromName * 1 + obj.toName * 1).toString() + '.txt';
      fsChenge(obj, socket);
    }
    function fsChenge(emitData, socket) {
      // console.log('写入文件名2222', fromTo);
      fs.exists('./chatRecord/' + fromTo, function (exists) {
        if (exists) {
          // console.log('文件存在');
          // 5.fs.readFile 读取文件
          fs.readFile('./chatRecord/' + fromTo, function (error, data) {
            if (error) {
              // console.log('读取文件error', error);
              reject('errr')
              return false;
            }
            //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
            // console.log('读取出所有行的信息 ',data.toString());  //读取出所有行的信息
            if (!data.toString()) {
              reject('errr')
              return false;
            }
            objs = JSON.parse(data.toString() || '[]');
            var length = objs.length;
            if (obj.text?.friends === 'yes') {
              if (objs.length === 1) {
                objs[0].friend = 'yes';
              } else {
                if (length >= 1) {
                  objs[length - 1].friend = 'yes';
                }
                if (length >= 2) {
                  objs[length - 2].friend = 'yes';
                }
              }
            } else if (obj.text?.addFriend === 2) {
              if (objs.length === 2) {
                objs[1].friend = 'yes';
              } else {
                objs[length - 1].friend = 'yes';
                // objs[length-2].friend = 'yes';
              }
            } else {
              if (objs.length === 1) {
                objs[0].friend = 'yes';
              } else {
                if (length >= 1) {
                  objs[length - 1].friend = 'yes';
                }
                if (length >= 2) {
                  objs[length - 2].friend = 'yes';
                }
              }
            }
            let newObjs = {}
            if (obj.conversation && obj.endTime) {
              objs.map((item) => {
                if (item.conversation && item.startTime * 1 === obj.startTime * 1) {
                  let times = obj.endTime * 1 - item.startTime * 1;
                  item.length = times
                  item.VideoAndVoice = obj.VideoAndVoice
                  item.endTime = obj.endTime * 1
                  item.operator = obj.operator;
                  newObjs = item;
                }
                return item;
              })
              // conversation: true,
              // startTime
              // endTime
            } else {
              objs.push(obj);
            }
            objs = JSON.stringify(objs);
            fs.writeFile(
              './chatRecord/' + fromTo,
              objs,
              'utf8',
              function (error) {
                if (error) {
                  // console.log(error);
                  reject('errr')
                  return false;
                }
                // console.log('写入成功');
                if (!emitData.endTime) {
                  creatNameber(emitData, socket);
                  resolve()
                } else {
                  socket.broadcast.emit('message', {
                    text: newObjs,
                  });
                  socket.emit('message', {
                    text: newObjs,
                  });
                  resolve()
                }
              }
            );
          });
        }
        if (!exists) {
          // console.log('文件不存在');
          //3. fs.writeFile  写入文件（会覆盖之前的内容）（文件不存在就创建）  utf8参数可以省略
          objs.push(obj);
          objs = JSON.stringify(objs);
          fs.writeFile('./chatRecord/' + fromTo, objs, 'utf8', function (error) {
            if (error) {
              // console.log(error);
              reject('errr')
              return false;
            }
            // console.log('写入成功');
            creatNameber(emitData, socket);
            resolve()
          });
        }
      });
    }
  })
}

//  视频聊天部分↓↓↓
app.get('/data/:id', function (req, res) {
  // console.log('get===>>>', req.query, req.params)
  const deviceId = req.params.id
  // console.log('get===>>>', router)
  if (!router.__dataStore[deviceId] || router.__dataStore[deviceId].length === 0) {
    // console.log('无数据')
    res.statusCode = 200
    res.end('无数据')
  } else {
    // console.log(router.__dataStore)
    const data = router.__dataStore[deviceId].shift()
    // console.log('我发给了谁' + deviceId)
    // console.log('data====>>>>>', data)
    res.statusCode = 200
    res.end(JSON.stringify(data))
  }
})

app.post('/data/:id', (req, res) => {
  // console.log('post请求成功===>>>', req.params)
  const deviceId = req.params.id
  // console.log('post请求成功===>>>', router)
  if (!router.__dataStore[deviceId]) {
    router.__dataStore[deviceId] = []
  }
  // console.log('我准备push了')
  // console.log(req.body)
  router.__dataStore[deviceId].push(req.body)
  res.statusCode = 200
  res.end('11')
})
//  视频聊天部分↑↑↑

//消息累计
function creatNameber(obj, socket) {
  // console.log('消息累计', obj);
  var dateTime = parseInt(Date.parse(new Date())).toString();
  if (obj.type === 'groupChat') {
    // console.log('群聊');
    MongoClient.connect(url, function (err, db) {
      var dbo = db.db('runoob');
      var whereStr = { buildingGroupName: obj.nickName }; // 查询条件
      dbo
        .collection('buildingGroup')
        .find(whereStr)
        .toArray(function (err, result_1) {
          if (err) throw err;
          if (result_1[0]) {
            // console.log('数据：', result_1[0]);
            //					var dateTime = parseInt(Date.parse(new Date())).toString();
            for (var i = 0; i < result_1[0].name.length; i++) {
              if (result_1[0].name[i].name !== obj.fromName) {
                result_1[0].name[i].newsNumber += 1;
              }
            }
            // console.log('数据ok：', result_1[0].name);image/*, video/
            MongoClient.connect(url, function (err, db) {
              var dbo = db.db('runoob');
              var whereStr = { buildingGroupName: obj.nickName }; // 查询条件
              var text_a = '';
              if (obj.myIconName) {
                text_a = obj.myIconName + '：';
              }
              if (!obj.text) {
                obj.text = `[${obj.file.fileClass}文件]`
                if (obj.file.voice) {
                  obj.text = `[语音]`
                }
                if (obj.file.fileType === 'image') {
                  obj.text = `[${obj.file.fileClass}图片]`
                }
                if (obj.file.fileType === 'video') {
                  obj.text = `[${obj.file.fileClass}视频]`
                }
              }

              var updateStr = {
                $set: {
                  name: result_1[0].name,
                  text: text_a + obj.text,
                  dateTime: dateTime,
                },
              }; //更换内容
              // console.log('第-道', updateStr);
              dbo
                .collection('buildingGroup')
                .updateOne(whereStr, updateStr, function (err, res) {
                  if (err) throw err;
                  // console.log(res);
                  // console.log('更改请求方数据成功');
                  socket.emit('message', {
                    text: obj,
                  });
                  if (!obj.file) {
                    socket.broadcast.emit('message', {
                      text: obj,
                    });
                  }
                  db.close();
                  // resto.send({code:200,msg:'已阅读暂无消息'});
                });
            });
          } else {
            db.close();
          }
        });
    });
    return;
  } else {
    MongoClient.connect(url, function (err, db) {
      var dbo = db.db('runoob');
      var whereStr = { name: obj.fromName }; // 查询条件
      dbo
        .collection('site')
        .find(whereStr)
        .toArray(function (err, result_1) {
          if (err) throw err;
          if (result_1) {
            var objs = result_1[0].linkFriends;
            for (var i = 0; i < objs.length; i++) {
              // if (!obj.Own && objs[i].fromName) {
              //   break;
              // }
              if (objs[i].friendName === obj.toName) {
                objs[i].newsNumber = objs[i].newsNumber * 1 + 1;
                objs[i].dateTime = parseInt(Date.parse(new Date())).toString();
                if (!obj.text) {
                  obj.text = `[${obj.file.fileClass}文件]`
                  if (obj.file.voice) {
                    obj.text = `[语音]`
                  }
                  if (obj.file.fileType === 'image') {
                    obj.text = `[${obj.file.fileClass}图片]`
                  }
                  if (obj.file.fileType === 'video') {
                    obj.text = `[${obj.file.fileClass}视频]`
                  }
                }
                objs[i].chatRecord = obj.text;
                //							var dateTime = parseInt(Date.parse(new Date())).toString();
                // console.log('消息累计返回符合非共和国', objs);
                MongoClient.connect(url, function (err, db) {
                  var dbo = db.db('runoob');
                  var whereStr = { name: obj.fromName }; // 查询条件
                  var updateStr = {
                    $set: { linkFriends: objs, dateTime: dateTime },
                  }; //更换内容
                  // console.log('第-道', updateStr);
                  dbo
                    .collection('site')
                    .updateOne(whereStr, updateStr, function (err, res) {
                      if (err) throw err;
                      // console.log('消息提示累计成功');
                      // cocket发送消息
                    });
                });
                break;
              }
            }
            db.close();
          } else {
            db.close();
          }
        });
    });
    MongoClient.connect(url, function (err, db) {
      var dbo = db.db('runoob');
      var whereStr = { name: obj.toName }; // 查询条件
      dbo
        .collection('site')
        .find(whereStr)
        .toArray(function (err, result_1) {
          if (err) throw err;
          if (result_1) {
            var objs = result_1[0].linkFriends;
            for (var i = 0; i < objs.length; i++) {
              if (objs[i].friendName === obj.fromName) {
                objs[i].chatRecord = obj.text;
                objs[i].dateTime = dateTime;
                // console.log('消息累计返回符合非共和国', objs);
                MongoClient.connect(url, function (err, db) {
                  var dbo = db.db('runoob');
                  var whereStr = { name: obj.toName }; // 查询条件
                  var updateStr = {
                    $set: { linkFriends: objs, dateTime: dateTime },
                  }; //更换内容
                  // console.log('第2道', updateStr);
                  dbo
                    .collection('site')
                    .updateOne(whereStr, updateStr, function (err, res) {
                      if (err) throw err;
                      // console.log('消息提示累计成功');
                    });
                });
                break;
              }
            }
            db.close();
          } else {
            db.close();
          }
        });
    });
    socket.emit('message', {
      text: obj,
    });
    socket.broadcast.emit('message', {
      text: obj,
    });
  }
}

//钱多多
app.get('/qq', function (req, res, next) {
  var result = {
    results: [
      { name: 1001, login: '您未登录解放路!' },
      { name: 1002, login: '您未登录的合法化!' },
      { name: 1003, login: '您未登录收到回复客户!' },
      { name: 1004, login: '您未登录东方嘉盛!' },
      { name: 1005, login: '您未登录非得浪费东方嘉盛!' },
    ],
  };
  // console.log('post请求参数：', req.body);
  res.send(result);
});


// app.configure(function() {
//   //默认情况下Express并不知道该如何处理该请求体，因此我们需要增加bodyParser中间件，用于分析
//   //application/x-www-form-urlencoded和application/json
//   //请求体，并把变量存入req.body。我们可以像下面的样子来“使用”中间件[这个保证POST能取到请求参数的值]：
//   app.use(express.bodyParser());
// });

// //创建集合
//  MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     console.log('数据库已创建');
//     var dbase = db.db("runoob");
//     dbase.createCollection('site', function (err, res) {
//         if (err) throw err;
//         console.log("创建集合!");
//         db.close();
//     });
// });
// //插入一条数据
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     var myobj = { name: "菜鸟教程", url: "'😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙
// 		😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵
// 		 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻
// 		 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '" };
//     dbo.collection("site").insertOne(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("文档插入成功");
//         db.close();
//     });
// });
//
// //插入多条数据
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     var myobj =  [
//         { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
//         { name: 'Google', url: 'https://www.google.com', type: 'en'},
//         { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
//        ];
//     dbo.collection("site").insertMany(myobj, function(err, res) {
//         if (err) throw err;
//         console.log("插入的文档数量为: " + res.insertedCount);
//         db.close();
//     });
// });
//
// //更新一条数据
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     var whereStr = {"name":'菜鸟教程'};  // 查询条件
//     var updateStr = {$set: { "url" : "https://www.runoob.com" }};
//     dbo.collection("site").updateOne(whereStr, updateStr, function(err, res) {
//         if (err) throw err;
//         console.log("文档更新成功");
//         db.close();
//     });
// });
// //更新多条数据
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     var whereStr = {"type":'en'};  // 查询条件
//     var updateStr = {$set: { "url" : "https://www.runoob.com" }};
//     dbo.collection("site").updateMany(whereStr, updateStr, function(err, res) {
//         if (err) throw err;
//          console.log(res.result.nModified + " 条文档被更新");
//         db.close();
//     });
// });
// //删除一条数据
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     var whereStr = {"name":'菜鸟教程'};  // 查询条件
//     dbo.collection("site").deleteOne(whereStr, function(err, obj) {
//         if (err) throw err;
//         console.log("文档删除成功");
//         db.close();
//     });
// });
// //删除多条数据
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("runoob");
//     var whereStr = { type: "en" };  // 查询条件
//     dbo.collection("site").deleteMany(whereStr, function(err, obj) {
//         if (err) throw err;
//         console.log(obj.result.n + " 条文档被删除");
//         db.close();
//     });
// });
// setTimeout(function(){
// 	// 查询数据
// 	MongoClient.connect(url, function(err, db) {
// 	    if (err) throw err;
// 	    var dbo = db.db("runoob");
// 	    dbo.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
// 	        if (err) throw err;
// 	        // console.log(result);
// 	        db.close();
// 	    });
// 	});
//
// 	// 查询指定条件的数据
// 	MongoClient.connect(url, function(err, db) {
// 	    if (err) throw err;
// 	    var dbo = db.db("runoob");
// 	     var whereStr = {"name":'菜鸟教程'};  // 查询条件
// 	    dbo.collection("site").find(whereStr).toArray(function(err, result) {
// 	        if (err) throw err;
// 	        // console.log(result);
// 	        db.close();
// 	    });
// 	});
// },2000)

//是否登录
var uid = '';
app.post('/post0', function (req, res, next) {
  var resto = res;
  // console.log('post请求参数：', util.inspect(req.cookies), req.body);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    var whereStr = { name: req.body.name }; // 查询条件
    dbo
      .collection('site')
      .find(whereStr)
      .toArray(function (err, result) {
        // 返回集合中所有数据
        if (err) throw err;
        // console.log(result);
        if (result[0].signIn === 'yes') {
          uid = result[0].name;
          // console.log(uid);
          resto.send({ code: 200, msg: '登录状态' });
        } else {
          resto.send({ code: 1001, msg: '未登录' });
        }
        db.close();
      });
  });
});
//登录
app.post('/post', function (req, res, next) {
  var resto = res;
  var reqs = req.body
  // console.log('post请求参数：', req.body);
  // console.log(__dirname);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    var whereStr = { name: reqs.name }; // 查询条件
    dbo
      .collection('site')
      .find(whereStr)
      .toArray(function (err, result) {
        // 返回集合中所有数据
        if (err) throw err;
        // console.log(result);
        if (result.length === 0) {
          resto.send({ code: 2001, msg: '用户不存在请先注册' });
        } else if (result.length === 1) {
          if (result[0].name === reqs.name) {
            if (reqs.password !== '退出' && result[0].password !== reqs.password) {
              resto.send({ code: 1001, msg: '用户名或密码错误' });
              return;
            }
            // MongoClient.connect(url, function (err, db) {
            //   var dbo = db.db('runoob');
            var whereStr = { name: reqs.name }; // 查询条件
            // if (reqs.password === '退出') {
            //   whereStr.socketId = ''
            // }
            var updateStr = { $set: { signIn: reqs.password !== '退出' ? 'yes' : 'no' } }; //更换内容
            dbo
              .collection('site')
              .updateOne(whereStr, updateStr, function (err, res) {
                if (err) throw err;
                // console.log('更换成功');
                db.close();
              });
            // });
            resto.send({
              code: 200,
              msg: reqs.password === '退出' ? "您已退出登录" : '您已登录成功',
              imgId: result[0].imgId,
              nickName: result[0].nickName,
              circleFriendsBackground: result[0].circleFriendsBackground,
            });
          } else {
            resto.send({ code: 1001, msg: '用户名或密码错误' });
          }
        }
      });
  });
});
function random3(len) {
  var pwd = '';
  for (var idx = 0; idx < len; idx++) {
    var seed = parseInt(Math.random() * 9);
    pwd = pwd + seed;
  }
  return pwd;
}
//注册
app.post('/registers', function (req, res, next) {
  var resto = res,
    reqs = req,
    result = { code: 1001, msg: '注册失败请重新注测' };
  // console.log('post请求参数：', req.body.name);
  req.body.signIn = '';
  var dateTime = parseInt(Date.parse(new Date())).toString();
  req.body.LLNumber = 'll' + random3(9);
  req.body.linkFriends = [
    {
      friendName: req.body.name,
      adopt: 'yes',
      fromName: req.body.name,
      toName: '',
      newsNumber: 0,
      dateTime: dateTime,
      chatRecord: '暂无！',
      headPortrait: req.body.headPortrait,
    },
  ];
  MongoClient.connect(url, function (err, db) {
    // console.log('1111===', err);
    if (err) throw err;
    var dbo = db.db('runoob');
    var whereStr = { name: req.body.name }; // 查询条件
    dbo
      .collection('site')
      .find(whereStr)
      .toArray(function (err, res) {
        // 返回集合中所有数据
        // console.log('22222===', res);
        if (err) throw err;
        if (res.length === 0) {
          // if (!res.acknowledged) {
          MongoClient.connect(url, function (err, db) {
            // console.log('创建集合!');
            if (!err) {
              // console.log('数据库已创建');
              var dbase = db.db('runoob');
              dbase.createCollection('site', function (err, res) {
                // console.log(err, res);
                // if (err) throw err;
                // console.log('创建集合!');
              });
            }
          });
          // }
          MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('runoob');
            dbo.collection('site').insertOne(reqs.body, function (err, res) {
              // console.log(err, res);
              if (err) throw err;
              // console.log('恭喜您注册成功');
              result.code = 200;
              result.msg = '恭喜您注册成功,请登录';
              resto.send(result);
              db.close();
            });
          });
          return;
        } else if (res[0].name === req.body.name) {
          result.code = 2002;
          result.msg = '用户已存在请去登录';
          resto.send(result);
          db.close();
        }
      });
  });
});

//退出登录
app.post('/post3', function (req, res, next) {
  var resto = res,
    result = { code: 1001, msg: '您未登录!' };
  // console.log('post请求参数：', req.body);
  if (req.body.name === '') {
    resto.send(result);
  } else {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db('runoob');
      var whereStr = { name: req.body.name }; // 查询条件
      var updateStr = { $set: { signIn: 'no' } };
      dbo
        .collection('site')
        .updateOne(whereStr, updateStr, function (err, res) {
          if (err) throw err;
          result.code = 200;
          result.msg = '退出成功';
          resto.send(result);
          db.close();
        });
    });
  }
});
//注销
app.post('/post2', function (req, res, next) {
  var resto = res,
    result = { code: 1001, msg: '注销失败或用户不存在' };
  // console.log('post请求参数：', req.body);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    var whereStr = { name: req.body.name }; // 查询条件
    dbo.collection('site').deleteMany(whereStr, function (err, obj) {
      if (err) throw err;
      // console.log(obj.result + '个用户');
      if (obj.result) {
        resto.send(result);
      } else {
        result.code = 200;
        result.msg = '注销成功';
        resto.send(result);
      }
      db.close();
    });
  });
});

//图片接口
app.get('/get', function (req, res) {
  // console.log('请求url：', req.path);
  // console.log('Git请求参数：', req.query);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    var whereStr = { name: req.query.id }; // 查询条件
    dbo
      .collection('site')
      .find(whereStr)
      .toArray(function (err, result) {
        // 返回集合中所有数据
        if (err) throw err;
        // console.log(result);
        if (result[0] && result[0].signIn === 'yes') {
          uid = result[0].name;
          // console.log(uid);
          MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('runoob');
            var whereStr = { imgId: req.query.imgId }; // 查询条件
            dbo
              .collection('headPortrait')
              .find(whereStr)
              .toArray(function (err, result) {
                // 返回集合中所有数据
                if (err) throw err;
                // console.log(result);
                res.send({ code: 200, body: result });
                db.close();
              });
          });
        } else {
          res.send({ code: 2001, body: [] });
          db.close();
        }
      });
  });
});
// 文件视频图片查询
app.post('/queryFile', function (req, res) {
  let filePath = path.join(__dirname, req.path)
  fs.exists(filePath, function (err) {
    // console.log('123', `${filePath}/${fileName}.${reqs.body.type}`, err)
    if (!err) {
      // console.log('0000', err);
      fs.readFile(filePath, function (error, data) {
        if (error) {
          // console.log('11111', error);
          res.send({ code: 2001, msg: "失败" })
          return false;
        } else {
          res.send({ code: 200, data: data })
        }
      });
    }
  })
})


// 音频阅读接口
app.post('/isRead', function (req, res) {
  var fromTos = null, objs = [], obj = req.body;
  const writeFiles = (fromTo) => {
    // console.log(fromTo, obj)
    fs.readFile('./chatRecord/' + fromTo, function (error, data) {
      if (error) {
        res.send({ code: 2001, msg: "更新失败" })
        return false;
      }
      //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
      // console.log('读取出所有行的信息 ', data.toString());  //读取出所有行的信息
      objs = JSON.parse(data.toString());
      objs = objs.map((item) => {
        if (item?.file?.url === obj.fileUrl) {
          item.file.voice.voice = false
        }
        return item;
      })
      objs = JSON.stringify(objs);
      fs.writeFile(
        './chatRecord/' + fromTo,
        objs,
        'utf8',
        function (error) {
          if (error) {
            return false;
          } else {
            res.send({ code: 200, msg: "更新完成" })
            return true;
          }

        }
      );

    });
  }
  if (obj.type === 'groupChat') {
    fromTos = obj.groupName;
    writeFiles(fromTos);
  } else {
    fromTos = (obj.fromName * 1 + obj.toName * 1).toString() + '.txt';
    writeFiles(fromTos);
  }
})

const addText = async (obj, apath, filePath, apathZoom, typeFileName) => {
  // console.log(obj, apath, filePath)
  let newClientmessage = JSON.parse(obj.clientmessage);
  var fromTos = null
  let yes = false;
  const writeFiles = async (fromTo) => {
    let setFile = await new Promise((res, rej) => {
      fs.exists(filePath, function (err) {
        // console.log('123', apath, filePath, err, fromTo)
        if (err) {
          fs.readFile('./chatRecord/' + fromTo, function (error, data) {
            if (error) {
              // console.log('读取文件error', error);
              return false;
            }
            //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
            // console.log('读取出所有行的信息 ', data.toString());  //读取出所有行的信息
            let newList = JSON.parse(data.toString());
            let objs = newList.map((item) => {
              // console.log(item.file?.index * 1 === obj.imgId * 1, item.file?.index, obj.imgId)
              if (item.file && (item.file.index * 1 === obj.imgId * 1)) {
                if (obj.styleLength) {
                  item.file.styleLength = obj.styleLength
                }
                item.file.url = apath;
                item.file.apathZoom = apathZoom;
                item.file.fileType = obj?.fileType
                item.file.file = typeFileName === 'img' ? true : typeFileName === 'file' ? true : false;
                item.file.size = obj?.size || '';
                if (obj.fileName) {
                  item.file.fileName = true;
                } else {
                  item.file.length = obj.length
                }

                if (obj?.voice) {
                  item.file.voice = obj.voice
                }
                // console.log(item)
              }
              return item;
            })
            objs = JSON.stringify(objs);
            // console.log(objs)
            fs.writeFile(
              './chatRecord/' + fromTo,
              objs,
              'utf8',
              function (error) {
                if (error) {
                  // console.log(error);
                  return false;
                } else {
                  // console.log('写入成功');
                  res(true)
                }
              }
            );
          });
        }
      })
    })
    return setFile;
  }
  if (newClientmessage.type === 'groupChat') {
    fromTos = newClientmessage.groupName;
    yes = writeFiles(fromTos);
  } else {
    fromTos = (newClientmessage.fromName * 1 + newClientmessage.toName * 1).toString() + '.txt';
    yes = writeFiles(fromTos);
  }
  return yes;
}
// 删除聊天记录
app.post('/recordDeletionOrChange', (req, res) => {
  let reqs = req.body;
  let fileName = reqs.groupName;
  let textName = `./chatRecord/${fileName}`
  fs.readFile(textName, function (error, data) {
    if (error) {
      res.send({ code: 2001, msg: "读取文件error或文件不存在", data: [] })
      return false;
    }
    //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
    // console.log('读取出所有行的信息 ', data.toString());  //读取出所有行的信息
    let newList = JSON.parse(data.toString());
    if (reqs.delet) {
      newList = newList.filter((item) => {
        if (item.dateTime === reqs.dateTime) {
          return false
        } else {
          return true
        }
      })
    } else {
      newList = newList.map((item) => {
        if (item.dateTime === reqs.dateTime) {
          item.text = reqs.text
        }
        return item
      })
    }
    newList = JSON.stringify(newList)
    fs.writeFile(
      textName,
      newList,
      'utf8',
      function (error) {
        if (error) {
          res.send({ code: 2001, data: { text: '删除失败' } })
          return false;
        } else {
          // console.log('写入成功');
          res.send({ code: 200, data: { text: reqs.delet ? '删除成功' : '更改成功' } })
        }
      }
    );
  });
})
// 获取朋友圈数据整理
const onFriendList = (list, req) => {
  let newList = []
  if (list.length > 0) {
    let size = (req.page * 1) * (req.pageSize * 1)
    // list.reverse()
    if (size < list.length) {
      newList = list.slice(size - req.pageSize * 1, size)
    } else {
      newList = list.slice(size - (req.pageSize * 1), list.length)
      list.total = true;
    }
    // newList.reverse()
    return newList
  } else {
    return []
  }
}
// 获取朋友圈 getCircleFriends
app.post('/getCircleFriends', (req, res) => {
  let reqs = req.body;
  let fileName = reqs.name;
  let personal = reqs.personal
  // console.log(reqs)
  let textName = `./friendsCircleTxt/${fileName}.txt`
  if (personal) {
    fs.readFile(textName, function (error, data) {
      if (error) {
        res.send({ code: 2001, msg: "读取文件error或文件不存在", data: [] })
        return false;
      }
      //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
      // console.log('读取出所有行的信息 ', data.toString());  //读取出所有行的信息
      let newList = JSON.parse(data.toString());
      newList = onFriendList(newList, reqs)
      newList.map((item) => {
        item.imgList = JSON.parse(item.imgList)
        return item;
      })
      res.send({ code: 200, data: newList })
    });
  } else {
    let textName = `./friendsCircleTxt`
    fs.readFile(`${textName}/TotalCircleFriends.txt`, function (error, data) {
      if (error) {
        res.send({ code: 200, msg: "读取文件error或文件不存在", data: [] })
        return false;
      }
      //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
      // console.log('读取出所有行的信息 ', data.toString());  //读取出所有行的信息
      let newList = JSON.parse(data.toString());
      newList = onFriendList(newList, reqs)
      newList.map((item) => {
        item.imgList = JSON.parse(item.imgList)
        return item;
      })
      res.send({ code: 200, data: newList })
    });
  }
})
const onFilter = (List, reqs) => {
  let newList = []
  if (reqs.textValue || reqs.deleteVideo || reqs.deleteImage) {
    newList = List.map((item) => {
      if (item.time === reqs.time) {
        item.content = reqs.textValue ? reqs.textValue : item.content
        item.video = reqs.deleteVideo ? '' : item.video
        if (reqs?.deleteImage?.length && item.imgList && item.imgList !== null && item.imgList !== 'null') {
          let list = JSON.parse(item.imgList)
          list = list.filter((term) => {
            for (let i = 0; i < reqs.deleteImage.length; i++) {
              if (term.apathZoom === reqs.deleteImage[i]) {
                return false
              }
            }
            return true
          })
          item.imgList = JSON.stringify(list)
        }
      }
      return item;
    })
  } else {
    newList = List.filter((item) => {
      if (item.time === reqs.time) {
        return false
      } else {
        return true;
      }
    })
  }
  return JSON.stringify(newList)
}
// 删除一项朋友圈动态
app.post('/dynamicDeletion', (req, res) => {
  let reqs = req.body;
  let fileName = reqs.name;
  // console.log(reqs)
  let textName = `./friendsCircleTxt/${fileName}.txt`
  fs.readFile(`./friendsCircleTxt/TotalCircleFriends.txt`, function (error, data) {
    if (error) {
      res.send({ code: 200, msg: "读取文件error或文件不存在", data: [] })
      return false;
    }
    //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
    // console.log('读取出所有行的信息 ', data.toString());  //读取出所有行的信息
    let newList = JSON.parse(data.toString());
    newList = onFilter(newList, reqs)
    fs.writeFile(
      './friendsCircleTxt/TotalCircleFriends.txt',
      newList,
      'utf8',
      function (error) {
        if (error) {
          res.send({ code: 2001, data: { text: '删除失败' } })
          return false;
        } else {
          // console.log('写入成功');
          fs.readFile(textName, function (error, data) {
            if (error) {
              res.send({ code: 2001, msg: "读取文件error或文件不存在", data: [] })
              return false;
            }
            //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
            // console.log('读取出所有行的信息 ', data.toString());  //读取出所有行的信息
            let newList = JSON.parse(data.toString());
            newList = onFilter(newList, reqs)
            // console.log(objs)
            fs.writeFile(
              textName,
              newList,
              'utf8',
              function (error) {
                if (error) {
                  res.send({ code: 2001, data: { text: '删除失败' } })
                  return false;
                } else {
                  // console.log('写入成功');
                  res.send({ code: 200, data: { text: '删除成功' } })
                }
              }
            );
          });
        }
      }
    );
  });
})
//朋友圈开始发布
app.post('/startFriendsCircleFileUpload', (req, res) => {
  let reqs = req.body;
  let fileName = reqs.name;
  // console.log(reqs)
  let filePath = path.join(__dirname, './friendsCircleTxt/')
  let textName = `./friendsCircleTxt/${fileName}.txt`
  let time = new Date().getTime();
  reqs.time = time;
  if (reqs.isDebug) {
    filePath = path.join(__dirname, './public/friendsCircleTxt/')
  }
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath)
    const list = [reqs]
    fs.writeFile(`${filePath}/${fileName}.txt`, JSON.stringify(list), (err) => {
      if (err) {
        // console.log('2222', err)
        res.send({ code: 2001, msg: "首次上传失败" })
      } else {
        // console.log('2222', err) 
        fs.writeFile(`${filePath}/TotalCircleFriends.txt`, JSON.stringify(list), (err) => {
          if (err) {
            // console.log('2222', err)
            res.send({ code: 2001, msg: "首次发布失败" })
          } else {
            // console.log('2222', err) 
            res.send({ code: 200, msg: "首次发布成功" })
          }
        })
      }
    })
  } else {
    const writeriles = (data) => {
      //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
      // console.log('读取出所有行的信息 ', data.toString());  //读取出所有行的信息
      let newList = []
      if (data) {
        newList = JSON.parse(data.toString());
      }
      newList.unshift(reqs)
      const objs = JSON.stringify(newList);
      // console.log(objs)
      fs.writeFile(
        `${filePath}/${fileName}.txt`,
        objs,
        'utf8',
        function (error) {
          if (error) {
            res.send({ code: 2001, msg: "上传失败" })
            return false;
          } else {
            fs.readFile(`./friendsCircleTxt/TotalCircleFriends.txt`, function (error, data) {
              if (error) {
                // console.log('读取文件error', error);
                res.send({ code: 200, msg: "暂无文件" })
                return false;
              }
              //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
              // console.log('读取出所有行的信息 ', data.toString());  //读取出所有行的信息
              let newList = JSON.parse(data.toString());
              newList.unshift(reqs)
              const objs = JSON.stringify(newList);
              // console.log(objs)
              fs.writeFile(
                `${filePath}/TotalCircleFriends.txt`,
                objs,
                'utf8',
                function (error) {
                  if (error) {
                    res.send({ code: 2001, msg: "上传失败" })
                    return false;
                  } else {
                    res.send({ code: 200, msg: "上传成功" })
                  }
                }
              );
            });
          }
        }
      );
    }
    fs.readFile(textName, function (error, data) {
      if (error) {
        // console.log('读取文件error', error);
        writeriles(data)
        // res.send({ code: 2001, msg: "读取文件error" })
        return false;
      } else {
        writeriles(data)
      }

    });
  }
})

// 朋友圈上传图片和视频
app.post('/friendsCircleFileUpload', function (req, res) {
  const forms = formidable({ multiples: false, maxFieldsSize: 10000000000 });
  forms.on('progress', function (bytesReceived, bytesExpected) {
    // console.log(bytesReceived, bytesExpected);当有数据块被处理之后会触发该事件，对于创建进度条非常有用
    // if (bytesReceived === bytesExpected) {
    //   console.log('end===>>>');
    // }
  })
  forms.parse(req, async (err, fields, files) => {
    if (err) {
      res.send({ code: 2001, msg: "上传失败" })
      return;
    }
    let reqs = fields;
    let fileName = reqs.name;

    let filePath = path.join(__dirname, '../friendsCircle/')
    let apath = `/friendsCircle/${fileName}.${reqs.type}`
    let apathZoom = `/friendsCircle/${fileName}Zoom.jpg`
    if (reqs.isDebug) {
      filePath = path.join(__dirname, '../public/friendsCircle/');
    }
    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(filePath)
    }
    let chunksFileName = `${filePath}/${fileName}.${reqs.type}`
    if (reqs.typeF === '分片上传') {
      // console.log(reqs.index)
      if (reqs.index === '0') {
        let chunksFileNames = `${filePath}/${fileName}Zoom.jpg`
        const upStream = fs.createWriteStream(chunksFileNames);
        upStream.write(reqs.videoImgZoom.split("base64,")[1], 'base64')
        upStream.end()
      }
      const upStreamV = fs.createWriteStream(chunksFileName, {
        flags: 'a' //如果要把内容追加到文件原有的内容的后面，则设置flags为'a',此时设置start无效
      });
      //写入数据到流
      upStreamV.write(reqs.base64, 'base64')
      upStreamV.end()
      res.send({ code: 200, msg: "分片上传进行中" })
    } else if (reqs.typeF === 'no' || reqs.typeF === '分片上传最后') {
      // console.log(reqs.index)
      if (reqs.typeF === 'no' && !reqs.Zoom) {
        let chunksFileNames = `${filePath}/${fileName}Zoom.jpg`
        const upStream = fs.createWriteStream(chunksFileNames);
        upStream.write(reqs.videoImgZoom.split("base64,")[1], 'base64')
        upStream.end()
      }
      const upStreamV = fs.createWriteStream(chunksFileName, {
        flags: 'a' //如果要把内容追加到文件原有的内容的后面，则设置flags为'a',此时设置start无效
      });
      //写入数据到流
      upStreamV.write(reqs.base64, 'base64')
      upStreamV.end()
      if (reqs.myLocName) {
        const data = await circleFriendsBackground(reqs.myLocName, apath)
        if (data !== 'data') {
          res.send({ code: 2001, msg: "上传失败" })
          return;
        }
      }
      res.send({ code: 200, msg: "上传成功", apath, apathZoom, type: reqs.fileType, typeF: reqs.typeF, styleLength: reqs.styleLength })
    }
  })
})
//更改个人朋友圈背景
const circleFriendsBackground = async (myName, apath) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db('runoob');
      var whereStr = { name: myName }; // 查询条件
      var updateStr = {
        $set: { circleFriendsBackground: apath },
      }; //更换内容
      // console.log('第-道', updateStr);
      dbo.collection('site').updateOne(whereStr, updateStr, function (err, res) {
        if (err) throw err;
        // console.log('更改请求方数据成功');
        if (res.acknowledged) {
          resolve('data')
        } else {
          reject('errr')
        }
        db.close();
      });
    });
  })
}

const onHandle = (newList, reqs) => {
  let indexId = 0;
  let commentsLength = 0;
  let index = false;
  newList.map((item) => {
    // item.imgList = JSON.parse(item.imgList)
    if (reqs.time === item.time) {
      let commentsList = item.commentsList || [];
      if (!reqs.comments) {
        if (commentsList.length) {
          for (let i = 0; i < commentsList.length; i++) {
            if (commentsList[i].friendNameId === reqs.friendNameId && commentsList[i].time === reqs.time) {
              commentsList[i].thumbsUp = reqs.thumbsUp
              index = true;
              break;
            }
          }
          if (!index) {
            index = false;
            commentsList.push({
              time: reqs.time,// 发布者发布时间
              friendName: reqs.friendName, // 点赞者的中文名
              friendNameId: reqs.friendNameId, // 点赞者的电话
              friendHeadPortrait: reqs.friendHeadPortrait,  // 点赞者的头像
              thumbsUp: reqs.thumbsUp, // 设为true
              thumbsTime: reqs.thumbsTime // 点赞时间
            })
          }
        } else {
          commentsList.push({
            time: reqs.time,// 发布者发布时间
            friendName: reqs.friendName, // 点赞者的中文名
            friendNameId: reqs.friendNameId, // 点赞者的电话
            friendHeadPortrait: reqs.friendHeadPortrait,  // 点赞者的头像
            thumbsUp: reqs.thumbsUp, // 设为true
            thumbsTime: reqs.thumbsTime // 点赞时间
          })
        }
      } else {
        commentsList.push({
          time: reqs.time,// 评论时间
          friendName: reqs.friendName, // 评论者的中文名
          friendNameId: reqs.friendNameId, // 评论者的电话
          friendHeadPortrait: reqs.friendHeadPortrait,  // 评论者的头像
          comments: reqs.comments || '', // 评论内容
          commentTime: reqs.commentTime // 评论时间
        })
      }
      if (commentsList.length) {
        commentsList.map(item => {
          if (item.thumbsUp) {
            indexId += 1;
          }
          if (item.comments) {
            commentsLength += 1;
          }
          return item;
        })
      }
      item.thumbsUpLength = indexId; // 点赞总数
      item.commentsLength = commentsLength; // 评论总数
      item.commentsList = commentsList;
    }
    return item;
  })
}
// 评论和点赞 
app.post('/addComments', async (req, res) => {
  let reqs = req.body;
  let fileName = reqs.name;
  let resolve = res;
  // console.log(reqs)
  let textName = `./friendsCircleTxt/${fileName}.txt`
  const data = await new Promise((resolve, reject) => {
    fs.readFile(textName, function (error, data) {
      if (error) {
        res.send({ code: 2001, msg: "读取文件error或文件不存在", data: [] })
        return false;
      }
      //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
      // console.log('读取出所有行的信息 ', data.toString());  //读取出所有行的信息
      let newList = JSON.parse(data.toString());
      onHandle(newList, reqs) // 寻找要评论的
      newList = JSON.stringify(newList);
      // console.log(objs)
      fs.writeFile(textName,
        newList,
        'utf8',
        function (error) {
          if (error) {
            res.send({ code: 2001, msg: "失败" })
            reject(false)
          } else {
            resolve(true)
          }
        }
      );
    });
  })
  if (!data) return

  textName = `./friendsCircleTxt/TotalCircleFriends.txt`
  fs.readFile(`${textName}`, function (error, data) {
    if (error) {
      res.send({ code: 200, msg: "读取文件error或文件不存在", data: [] })
      return false;
    }
    //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
    // console.log('读取出所有行的信息 ', data.toString());  //读取出所有行的信息
    let newList = JSON.parse(data.toString());
    onHandle(newList, reqs) // 寻找要评论的
    newList = JSON.stringify(newList);
    // console.log(objs)
    fs.writeFile(textName,
      newList,
      'utf8',
      function (error) {
        if (error) {
          // console.log(error);
          return false;
        } else {
          res.send({ code: 200, data: `${(reqs.thumbsUp && '点赞') || (reqs.comments && "评论")}成功` })
        }
      }
    );
  });
})

// 上传图片
let classIcon = ''
app.post('/file_upload', function (req, res) {
  // console.log('未处理上传的文件信息', req);  // 上传的文件信息 image imgId clientmessage
  const forms = formidable({ multiples: false, maxFieldsSize: 10000000000 });
  forms.on('progress', function (bytesReceived, bytesExpected) {
    // console.log(bytesReceived, bytesExpected);当有数据块被处理之后会触发该事件，对于创建进度条非常有用
    // if (bytesReceived === bytesExpected) {
    //   console.log('end===>>>');
    // }
  })
  // form.on('end', function () {})
  forms.parse(req, async (err, fields, files) => {
    // console.log(fields)
    if (err) {
      res.send({ code: 2001, msg: "上传失败" })
      return;
    }
    var resto = res,
      reqs = fields,
      result = { code: 1001, msg: '图片提交失败', icon: '' };
    let fileName = (new Date()).getTime() + parseInt(Math.random() * 3435) + parseInt(Math.random() * 6575);
    if (reqs.image) {
      fileName = reqs.imgId
      // reqs.body.imgId = fileName;
    }
    let filePath = path.join(__dirname, '../images/Avatars')
    let apath = `/images/Avatars/${fileName}.${reqs.type}`
    let apathZoom = `/images/Avatars/${fileName}Zoom.${reqs.type}`
    if (reqs.lengthId === '1' && reqs.styleLength) {
      apathZoom = `/images/file/${fileName}Zoom.jpg`
    }
    if (reqs.file) { // 文件或视频处理
      fileName = reqs.fileName
      filePath = path.join(__dirname, '../images/file')
      apath = `/images/file/${fileName}.${reqs.type}`
      if (reqs.isDebug) {
        filePath = path.join(__dirname, '../public/images/file')
      }
    } else {
      if (reqs.image) {
        filePath = path.join(__dirname, '../images/images')
        apath = `/images/images/${fileName}.${reqs.type}`
        apathZoom = `/images/images/${fileName}Zoom.${reqs.type}`
      }
      if (reqs.isDebug) {
        filePath = path.join(__dirname, '../public/images/Avatars')
        if (reqs.image) {
          filePath = path.join(__dirname, '../public/images/images')
        }
      }
    }

    if (reqs.type === '分片上传' || reqs.length === '分片上传最后' || reqs.length === '不分片') {
      // classIcon += reqs.classIcon;
      // res.send({ code: 200, msg: "分片上传继续" })
      // filePath = path.join(__dirname, './fileList');
      let files = reqs.classIcon
      const { fileName, lengthId, shardCount, typeName, type } = reqs
      // 切片上传目录
      const chunksPath = filePath + '/'
      // 切片文件
      let chunksFileName = `${filePath}/${fileName}.${typeName || type}`
      // apath = `/node/fileList/${fileName}.${reqs.type}`
      // const chunksFileName = `${filePath}/${fileName}.${typeName || type}`

      if (!fs.existsSync(chunksPath)) {
        fs.mkdirSync(chunksPath)
      }
      // // 秒传，如果切片已上传，则立即返回
      if (lengthId === '1' || reqs.styleLength) {
        // console.log('分片首次上传')
        // 如果是视频做个封面图
        if (reqs.styleLength) {
          let chunksFileNames = `${filePath}/${fileName}Zoom.jpg`
          // if (lengthId === '1' && fs.existsSync(chunksFileNames)) {
          //   fs.access(chunksFileNames, (err) => {
          //     if (err) {
          //       console.log(err.message);
          //     } else {
          //       fs.unlinkSync(chunksFileNames) // 第一次上传切片，如果文件已存在删除文件操作
          //     }
          //   })
          //   fs.access(chunksFileName, (err) => {
          //     if (err) {
          //       console.log(err.message);
          //     } else {
          //       fs.unlinkSync(chunksFileName) // 第一次上传切片，如果文件已存在删除文件操作
          //     }
          //   })
          //   // res.send({ code: 200, msg: "切片上传完成" })
          // }
          const upStream = fs.createWriteStream(chunksFileNames);
          upStream.write(reqs.classIconZoom.split("base64,")[1], 'base64')
          upStream.end()
          await new Promise((resolve, reject) => {
            const add = addText(reqs, apath, __dirname, apathZoom, true)
            resolve(add)
          })
        }
      }

      // // 创建可读流
      // const reader = fs.createReadStream(files.path);

      // console.log(playTo)
      // 第一种方式 创建可写流
      const upStream = fs.createWriteStream(chunksFileName, {
        flags: 'a' //如果要把内容追加到文件原有的内容的后面，则设置flags为'a',此时设置start无效
      });
      //写入数据到流
      upStream.write(files, 'base64')
      upStream.end()

      //  第二种方式
      // fs.writeFile(`${chunksFileName}`, Buffer.from(files, 'base64'), { 'flag': 'a' }, (err) => {
      //   if (err) {
      //     // console.log('2222', err)
      //     res.send({ code: 2001, msg: "单片上传失败" })
      //   } else {
      //     console.log('2222==>>', err)
      //   }
      // })

      // // 可读流通过管道写入可写流
      // reader.pipe(upStream);
      // reader.on('end', () => {
      //   // 文件上传成功后，删除本地切片文件
      //   fs.unlinkSync(files)
      // })
      // ctx.response.body = {undefined
      // code: 0,
      // msg: ‘切片上传完成’
      // }
      // })
      if (reqs.length === '分片上传最后' || reqs.length === '不分片') {
        // console.log('分片上传最后')
        let times = setTimeout(() => {
          apathZoom = `/images/file/${fileName}Zoom.jpg`
          const tos = () => {
            res.send({ code: 200, msg: "上传成功", icon: apath, id: fileName, apath, apathZoom })
          }
          if ((reqs.image || reqs.file) && addText(reqs, apath, filePath, apathZoom, 'file')) {
            tos()
          } else if (reqs.image !== "true") { tos() }
          clearTimeout(times)
        }, 300);
        return;
      } else {
        res.send({ code: 200, msg: "分片上传请继续" })
      }
      return;
    }

    let base64 = null
    let base64Zoom = null
    let dataBuffer = null
    let dataBufferZoom = null
    if (reqs.file) {
      if (reqs.length) {
        dataBuffer = Buffer.from(classIcon ? classIcon + reqs.classIcon : reqs.classIcon, 'base64');
      } else {
        // base64 = reqs.classIcon.split("base64,")[1];
        // dataBuffer = Buffer.from(base64, 'base64');
        dataBuffer = Buffer.from(reqs.classIcon, 'base64');
      }
      // dataBuffer = Buffer.from(classIcon + reqs.classIcon, 'binary');
      // 
      // console.log(reqs.classIcon)
      // 
    } else {
      base64Zoom = reqs.classIconZoom?.replace(/^data:image\/\w+;base64,/, "");
      base64 = reqs.classIcon.replace(/^data:image\/\w+;base64,/, ""); //去掉图片base64码前面部分data:image/png;base64
      if (base64Zoom) {
        dataBufferZoom = Buffer.from(base64Zoom, 'base64');
      }
      dataBuffer = Buffer.from(base64, 'base64'); //把base64码转成buffer对象，
    }
    classIcon = ''
    // fs.createReadStream(base64).pipe(fs.createWriteStream(`${filePath}/${fileName}Zoom.${reqs.type}`));
    // let apath = `http://localhost:3000/node/images/${fileName}.${reqs.type}`
    // console.log(filePath)
    fs.exists(filePath, function (err) {
      // console.log('123', `${filePath}/${fileName}.${reqs.type}`, err)
      if (!err) {
        // console.log('0000', err);
        fs.mkdir(filePath, function (error) {
          if (error) {
            // console.log('11111', error);
            res.send({ code: 2001, msg: "首次上传失败" })
            return false;
          }
          if (dataBufferZoom) {
            fs.writeFile(`${filePath}/${fileName}Zoom.${reqs.type}`, dataBufferZoom, (err) => {

            })
          }
          fs.writeFile(`${filePath}/${fileName}.${reqs.type}`, dataBuffer, (err) => {
            if (err) {
              // console.log('2222', err)
              res.send({ code: 2001, msg: "首次上传失败" })
            } else {
              // console.log('2222', err)
              const tos = () => {
                res.send({ code: 200, msg: "首次上传成功", icon: apath, id: fileName, apath, apathZoom })
              }
              if ((reqs.image || reqs.file) && addText(reqs, apath, filePath, apathZoom, 'img')) {
                tos()
              } else if (reqs.image !== "true") { tos() }
            }
          })
        });
      } else {
        if (!reqs.image && !reqs.file) {
          MongoClient.connect(url, function (err, db) {
            var dbo = db.db('runoob');
            var whereStr = { name: reqs.myName }; // 查询条件
            var updateStr = { $set: { headPortrait: apath, apathZoom: apathZoom } }; //更换内容
            // console.log('第-道', updateStr);
            dbo
              .collection('site')
              .updateOne(whereStr, updateStr, function (err, res) {
                if (err) throw err;
                // console.log('======', res.result);
                // console.log('更改请求方数据成功');
                // db.close();
              });
            dbo
              .collection('buildingGroup')
              .find({})
              .toArray(function (err, result_2) {
                // 返回集合中所有数据
                if (err) throw err;
                // console.log('群聊数据', result_2);
                // var img_list = [];
                if (result_2) {
                  for (var i = 0; i < result_2.length; i++) {
                    for (var e = 0; e < result_2[i].imgId.length; e++) {
                      if (result_2[i].imgId[e].name === reqs.myName) {
                        const buildingGroupName = result_2[i].buildingGroupName;
                        const index = i;
                        result_2[i].imgId[e].classIcon = apath;
                        result_2[i].imgId[e].apathZoom = apathZoom;
                        MongoClient.connect(url, function (err, db) {
                          var dbo = db.db('runoob');
                          var whereStr = { buildingGroupName: buildingGroupName }; // 查询条件
                          var updateStr = { $set: result_2[index] }; //更换内容
                          // console.log('第-道', updateStr);
                          dbo
                            .collection('buildingGroup')
                            .updateOne(whereStr, updateStr, function (err, res) {
                              if (err) throw err;
                              // console.log('======', res.result);
                              // console.log('更改请求方数据成功');
                              db.close();
                            });
                        });
                        break;
                      }
                    }
                  }
                }
                db.close();
              });
          });
        }
        if (dataBufferZoom) {
          fs.writeFile(`${filePath}/${fileName}Zoom.${reqs.type}`, dataBufferZoom, (err) => {

          })
        }
        fs.writeFile(`${filePath}/${fileName}.${reqs.type}`, dataBuffer, (err) => {
          if (err) {
            // console.log(err)
            res.send({ code: 2001, msg: "上传失败" })
          } else {
            // console.log(err)
            const tos = () => {
              res.send({ code: 200, msg: "上传成功", icon: apath, id: fileName, apath, apathZoom })
            }
            if ((reqs.image || reqs.file) && addText(reqs, apath, filePath, apathZoom, 'img')) {
              tos()
            } else if (reqs.image !== "true") { tos() }

          }
        })
      }
    })
  });
});
//消息请求
app.get('/get1', function (req, res) {
  // console.log('请求url：', req.path);
  // console.log('get1请求参数：', req.query);
  var fromTo = null;
  var objs = [];
  var list = {};
  if (req.query.type === 'groupChat') {
    fromTo = req.query.groupName
  } else {
    fromTo =
      (req.query.friendName * 1 + req.query.myName * 1).toString() + '.txt';
  }
  // console.log('读取文件名' + fromTo);
  fs.readFile('./chatRecord/' + fromTo, function (error, data) {
    if (error) {
      // console.log('读取文件', error);
      res.send({ code: 200, body: [] });
      return false;
    }
    //console.log(data);  //data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题;
    // console.log('读取出所有行的信息 ',data.toString());  //读取出所有行的信息
    if (!data) {
      res.send({ code: 200, body: [] });
      return
    };
    objs = JSON.parse(data.toString() || '[]');
    if (objs.length > 0) {
      let size = (req.query.page * 1) * (req.query.pageSize * 1)
      objs.reverse()
      if (size < objs.length) {
        list.body = objs.slice(size - req.query.pageSize * 1, size)
      } else {
        list.body = objs.slice(size - (req.query.pageSize * 1), objs.length)
        list.total = true;
      }
      list.body.reverse()
      list.code = 200;
      // console.log('读取文件', list);
      res.send(list);
    } else {
      res.send({ code: 200, body: [] });
    }
  });
});

//所有人列表请求
app.get('/get2', function (req, res) {
  // console.log('请求url：', req.path);
  // console.log('Git请求参数：', req.query);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    // var whereStr = {'type':req.query.type};  // 查询条件
    var page = (req.query.page * 1 - 1) * (req.query.pageSize * 1);
    var pageSize = (req.query.pageSize * 1);
    var mysort = { imgId: -1 };
    var list = {};
    dbo
      .collection('site')
      .find({})
      .sort(mysort)
      .skip(page)
      .limit(pageSize)
      .toArray(function (err, result) {
        // 返回集合中所有数据
        if (err) throw err;
        // console.log(result);
        if (result && result.length > 0) {
          result.sort(function (a, b) {
            return b.imgId - a.imgId;
          });
          MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('runoob');
            // var whereStr = {'imgId':req.query.imgId};  // 查询条件
            dbo
              .collection('headPortrait')
              .find({})
              .toArray(function (err, result_1) {
                // 返回集合中所有数据
                if (err) throw err;
                // console.log(result_1);
                for (var e = 0; e < result.length; e++) {
                  for (var i = 0; i < result_1.length; i++) {
                    if (result[e].imgId === result_1[i].imgId) {
                      result[e].headPortrait = result_1[i].classIcon;
                      break;
                    }
                  }
                }
                // console.log(result);
                list.code = 200;
                list.body = result;
                res.send(list);
                db.close();
              });
          });
        } else {
          res.send({ code: 200, body: [] });
          db.close();
        }
      });
  });
});

//添加好友
app.post('/post4', function (req, res, next) {
  var resto = res;
  // console.log('请求url：', req.path);
  // console.log('post请求参数：', req.body);
  var dateTime = parseInt(Date.parse(new Date())).toString();
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    var whereStr = { name: req.body.fromNumber }; // 查询条件
    dbo
      .collection('site')
      .find(whereStr)
      .toArray(function (err, result) {
        // 返回集合中所有数据
        if (err) throw err;
        // console.log(result);
        if (result && result.length === 0) {
          resto.send({ code: 2001, msg: '网络忙请稍后....' });
          db.close();
        } else if (result && result.length === 1) {
          if (result[0].linkFriends) {
            var ok = '';
            for (var i = 0; i < result[0].linkFriends.length; i++) {
              if (result[0].linkFriends[i].friendName === req.body.addNumber) {
                ok = 1;
                break;
              }
            }
            if (ok === '') {
              MongoClient.connect(url, function (err, db) {
                var dbo = db.db('runoob');
                var obj = result[0].linkFriends;
                obj.push({
                  friendName: req.body.addNumber,
                  adopt: '',
                  fromName: '',
                  toName: req.body.fromNumber,
                  newsNumber: 0,
                  headPortrait: result[0].headPortrait
                });
                var whereStr = { name: req.body.fromNumber }; // 查询条件
                var updateStr = {
                  $set: { linkFriends: obj, dateTime: dateTime },
                }; //更换内容
                // console.log('第二道', updateStr);
                dbo
                  .collection('site')
                  .updateOne(whereStr, updateStr, function (err, res) {
                    if (err) throw err;
                    // console.log('我的好友数据添加成功2');
                  });
              });
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db('runoob');
                var whereStr = { name: req.body.addNumber }; // 查询条件
                dbo
                  .collection('site')
                  .find(whereStr)
                  .toArray(function (err, result_1) {
                    if (err) throw err;
                    // let number = result_1[0].newsNumber * 1;
                    // number += 1;
                    var obj = result_1[0].linkFriends;
                    obj.push({
                      friendName: req.body.fromNumber,
                      adopt: '',
                      fromName: req.body.fromNumber,
                      toName: '',
                      newsNumber: 0,
                      headPortrait: result_1[0].headPortrait
                    });
                    // console.log(obj, +'....' + number);
                    MongoClient.connect(url, function (err, db) {
                      var dbo = db.db('runoob');
                      var whereStr = { name: req.body.addNumber }; // 查询条件
                      var updateStr = {
                        $set: { linkFriends: obj, dateTime: dateTime },
                      }; //更换内容
                      // console.log('第二道', updateStr);
                      dbo
                        .collection('site')
                        .updateOne(whereStr, updateStr, function (err, res) {
                          if (err) throw err;
                          // console.log(res);
                          // console.log('对方更换成功');
                          resto.send({
                            code: 200,
                            msg: '已告知对方请耐心等待',
                          });
                          db.close();
                        });
                    });
                  });
              });
            } else {
              if (req.body.addFriend === 2) {
                resto.send({ code: 200, msg: '已告知对方请耐心等待' });
              } else {
                resto.send({ code: 2000, msg: '已添加对方好友！' });
              }
              db.close();
            }
          } else {
            resto.send({ code: 1001, msg: '网络忙请稍后....' });
            db.close();
          }
        } else {
          resto.send({ code: 1001, msg: '网络忙请稍后....' });
          db.close();
        }
      });
  });
});

//移除好友
app.post('/post4_1', function (req, res, next) {
  var resto = res;
  // console.log('post请求参数：', req.body);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    var whereStr = { name: req.body.fromNumber }; // 查询条件
    dbo
      .collection('site')
      .find(whereStr)
      .toArray(function (err, result) {
        // 返回集合中所有数据
        if (err) throw err;
        // console.log(result);
        if (result && result.length === 0) {
          resto.send({ code: 2001, msg: '网络忙请稍后....' });
          db.close();
        } else if (result && result.length === 1) {
          if (result[0].linkFriends) {
            //					if(ok == ''){
            MongoClient.connect(url, function (err, db) {
              var dbo = db.db('runoob');
              var obj = [];
              for (var i = 0; i < result[0].linkFriends.length; i++) {
                if (
                  result[0].linkFriends[i].friendName !== req.body.removeNumber
                ) {
                  obj.push(result[0].linkFriends[i]);
                }
              }
              var whereStr = { name: req.body.fromNumber }; // 查询条件
              var updateStr = { $set: { linkFriends: obj } }; //更换内容
              // console.log('第二道', updateStr);
              dbo
                .collection('site')
                .updateOne(whereStr, updateStr, function (err, res) {
                  if (err) throw err;
                  // console.log('我的好友数据移除好友成功2');
                });
            });
            MongoClient.connect(url, function (err, db) {
              var dbo = db.db('runoob');
              var whereStr = { name: req.body.removeNumber }; // 查询条件
              dbo
                .collection('site')
                .find(whereStr)
                .toArray(function (err, result_1) {
                  if (err) throw err;
                  var obj = [];
                  for (var i = 0; i < result_1[0].linkFriends.length; i++) {
                    if (
                      result_1[0].linkFriends[i].friendName !==
                      req.body.fromNumber
                    ) {
                      obj.push(result_1[0].linkFriends[i]);
                    }
                  }
                  // console.log(obj, '灌灌灌灌灌....');
                  MongoClient.connect(url, function (err, db) {
                    if (err) throw err;
                    var dbo = db.db('runoob');
                    var whereStr = { name: req.body.removeNumber }; // 查询条件
                    var updateStr = { $set: { linkFriends: obj } }; //更换内容
                    // console.log('第二道', updateStr);
                    dbo
                      .collection('site')
                      .updateOne(whereStr, updateStr, function (err, res) {
                        if (err) throw err;
                        // console.log(res);
                        // console.log('对方移除好友成功');
                        resto.send({ code: 200, msg: '已将对方移除' });
                        db.close();
                      });
                  });
                });
            });
            //					}else{
            //						if(req.body.addFriend == 2){
            //							resto.send({code:200,msg:'已告知对方请耐心等待'});
            //						}else{
            //							resto.send({code:2000,msg:'已添加对方好友！'});
            //						}
            //					}
          } else {
            resto.send({ code: 1001, msg: '网络忙请稍后....' });
            db.close();
          }
        } else {
          resto.send({ code: 1001, msg: '网络忙请稍后....' });
          db.close();
        }
      });
  });
});
//好友联系人列表请求
app.get('/get3', function (req, res) {
  // console.log('请求url：', req.path);
  // console.log('Git请求参数：', req.query);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    var mysort = { dateTime: -1 };
    var list = {};
    dbo
      .collection('site')
      .find({})
      .sort(mysort)
      .toArray(function (err, result) {
        // 返回集合中所有数据
        if (err) throw err;
        if (result && result.length > 0) {
          var objs = [];
          // console.log('好友联系人列表',result);
          for (var i = 0; i < result.length; i++) {
            for (var e = 0; e < result[i].linkFriends.length; e++) {
              if (result[i].linkFriends[e].friendName === req.query.name) {
                result[i].password = '';
                result[i].dateTime = result[i].linkFriends[e].dateTime;
                objs.push(result[i]);
                break;
              }
            }
          }
          // console.log('好友联系人列表', objs);
          // MongoClient.connect(url, function (err, db) {
          //   if (err) throw err;
          //   var dbo = db.db('runoob');
          //   // var whereStr = {'imgId':req.query.imgId};  // 查询条件
          //   dbo
          //     .collection('headPortrait')
          //     .find({})
          //     .toArray(function (err, result_1) {
          //       // 返回集合中所有数据
          //       if (err) throw err;
          //       // console.log(result_1);
          //       // for (var e = 0; e < objs.length; e++) {
          //       //   for (var i = 0; i < result_1.length; i++) {
          //       //     if (objs[e].imgId === result_1[i].imgId) {
          //       //       objs[e].headPortrait = result_1[i].classIcon;
          //       //       break;
          //       //     }
          //       //   }
          //       // }
          //群聊数据
          if (req.query.buildingGroup !== 'no') {
            MongoClient.connect(url, function (err, db) {
              if (err) throw err;
              var dbo = db.db('runoob');
              // var whereStr = {'imgId':req.query.imgId};  // 查询条件
              dbo
                .collection('buildingGroup')
                .find({})
                .toArray(function (err, result_2) {
                  // 返回集合中所有数据
                  if (err) throw err;
                  // console.log('群聊数据', result_2);
                  // var img_list = [];
                  if (result_2) {
                    for (var i = 0; i < result_2.length; i++) {
                      for (var e = 0; e < result_2[i].name.length; e++) {
                        if (result_2[i].name[e].name === req.query.name) {
                          // console.log('1111');
                          // for (
                          //   var u = 0;
                          //   u < result_2[i].imgId.length;
                          //   u++
                          // ) {
                          //   // console.log('2222');
                          //   for (var w = 0; w < result_1.length; w++) {
                          //     // console.log('3333');
                          //     if (
                          //       result_2[i].imgId[u] === result_1[w].imgId
                          //     ) {
                          //       // console.log(result_1[w].imgId);
                          //       img_list.push({
                          //         classIcon: result_1[w].classIcon,
                          //         name: result_2[i].name[u].name,
                          //         newsNumber:
                          //           result_2[i].name[u].newsNumber,
                          //         nickName: result_2[i].nickName[u],
                          //       });
                          //       break;
                          //     }
                          //   }
                          // }
                          // result_2[i].imgId = img_list;
                          // img_list = [];
                          objs.push(result_2[i]);
                          break;
                        }
                      }
                    }
                  }
                  objs.sort(function (a, b) {
                    return b.dateTime - a.dateTime;
                  });
                  list.code = 200;
                  list.body = objs;
                  // console.log(objs);
                  res.send(list);
                  db.close();
                });
            });
          } else {
            list.code = 200;
            list.body = objs;
            res.send(list);
            db.close();
          }
          // });
          // });
        } else {
          res.send({ code: 200, body: [] });
          db.close();
        }
      });
  });
});
//建群
app.post('/buildingGroup', function (req, res, next) {
  var resto = res,
    reqs = req,
    result = { code: 1001, msg: '建群失败请重新操作' };
  // console.log('请求url：', req.path);
  req.body = JSON.parse(req.body.data);
  // console.log('post请求参数：', req.body);
  req.body.dateTime = parseInt(Date.parse(new Date())).toString();
  req.body.linkFriends = [
    {
      friendName: req.body.name,
      adopt: 'yes',
      fromName: req.body.name,
      toName: '',
      newsNumber: 0,
      dateTime: req.body.dateTime,
      chatRecord: '暂无！',
    },
  ];
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      // console.log('数据库已创建');
      var dbase = db.db('runoob');
      dbase.createCollection('buildingGroup', function (err, res) {
        // if (err) throw err;
        // console.log('创建集合!');
      });
    });
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db('runoob');
      dbo.collection('buildingGroup').insertOne(reqs.body, function (err, res) {
        if (err) throw err;
        // console.log('恭喜您建群成功');
        result.code = 200;
        result.msg = '恭喜您建群成功';
        resto.send(result);
        db.close();
      });
    });
  });
});
//移除本群
app.post('/buildingGroup_move', function (req, res, next) {
  var resto = res,
    result = { code: 1001, msg: '移除失败请重新操作' };
  // req.body = JSON.parse(req.body.nickName);
  // console.log('post请求参数：', req.body.nickName);
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db('runoob');
    var whereStr = { buildingGroupName: req.body.nickName }; // 查询条件
    dbo.collection('buildingGroup').deleteOne(whereStr, function (err, obj) {
      if (err) throw err;
      // console.log('该群成功移除');
      result.code = 200;
      result.msg = '该群成功移除';
      resto.send(result);
      db.close();
    });
  });
});
//转让本群
//app.post("/buildingGroup_Transfer",function(req,res,next){
//	var resto= res,
//		reqs = req,
//		result = {'code':1001,'msg':"移除失败请重新操作"};
//		// req.body = JSON.parse(req.body.nickName);
//	console.log("post请求参数：",req.body.nickName);
//	MongoClient.connect(url, function(err, db) {
//		var dbo = db.db("runoob");
//		var whereStr = {"buildingGroupName":req.body.nickName};  // 查询条件
//		dbo.collection("buildingGroup").deleteOne(whereStr, function(err, obj) {
//			if (err) throw err;
//			console.log("该群成功移除");
//			db.close();
//			result.code = 200;
//			result.msg = "该群成功移除";
//			resto.send(result);
//		});
//	});
//});
//本群添加成员或转让本群；
app.post('/buildingGroup_add', function (req, res, next) {
  var resto = res,
    result = { code: 1001, msg: '添加失败请重新操作' };
  req.body = JSON.parse(req.body.data);
  // console.log('请求url：', req.path);
  // console.log('post请求参数：', req.body);
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db('runoob');
    var whereStr = { buildingGroupName: req.body.buildingGroupName }; // 查询条件
    dbo
      .collection('buildingGroup')
      .find(whereStr)
      .toArray(function (err, result_1) {
        if (err) throw err;
        if (result_1[0]) {
          // console.log(result_1[0]);
          var obj = result_1[0];
          var obj_1 = [],
            obj_2 = [],
            obj_3 = [];
          var dateTime = parseInt(Date.parse(new Date())).toString();
          if (req.body.moveName === 'yes') {
            for (var i = 0; i < obj.name.length; i++) {
              if (obj.name[i].name !== req.body.name[0].name) {
                obj_1.push(obj.name[i]);
                obj_2.push(obj.nickName[i]);
                obj_3.push(obj.imgId[i]);
              }
            }
            obj.name = obj_1;
            obj.nickName = obj_2;
            obj.imgId = obj_3;
            obj.text = req.body.text;
            // console.log('判断转让本群', req.body.Transfer);
          } else {
            for (let i = 0; i < req.body.nickName.length; i++) {
              obj.nickName.push(req.body.nickName[i]);
              obj.name.push(req.body.name[i]);
              obj.imgId.push(req.body.imgId[i]);
            }
          }
          // console.log('添加成员更改后的数据', obj);
          MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db('runoob');
            var whereStr = { buildingGroupName: req.body.buildingGroupName }; // 查询条件
            var updateStr = null;
            if (req.body.Transfer) {
              //判断转让本群
              updateStr = {
                $set: {
                  dateTime: dateTime,
                  textName: req.body.textName,
                  groupOwner: req.body.Transfer,
                  nickName: obj.nickName,
                  name: obj.name,
                  imgId: obj.imgId,
                },
              }; //更换内容
            } else {
              updateStr = {
                $set: {
                  dateTime: dateTime,
                  textName: req.body.textName,
                  nickName: obj.nickName,
                  name: obj.name,
                  imgId: obj.imgId,
                },
              }; //更换内容
            }
            // console.log('第-道', updateStr);
            dbo
              .collection('buildingGroup')
              .updateOne(whereStr, updateStr, function (err, res) {
                if (err) throw err;
                // console.log(res);
                if (res) {
                  // console.log('第2道更改数据成功');
                  if (req.body.moveName === 'yes') {
                    resto.send({
                      code: 200,
                      msg: '成功退出' + req.body.buildingGroupName,
                    });
                  } else {
                    resto.send({ code: 200, msg: '已添加成功' });
                  }
                } else {
                  resto.send(result);
                }
                db.close();
              });
          });
        } else {
          resto.send({ code: 1001, msg: '网络忙请稍后....' });
          db.close();
        }
      });
  });
});

//对方确定添加你为好友；
app.post('/post5', function (req, res, next) {
  var resto = res;
  // console.log('请求url：', req.path);
  // console.log('post请求参数：', req.body);
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    var whereStr = { name: req.body.fromName }; // 查询条件
    dbo
      .collection('site')
      .find(whereStr)
      .toArray(function (err, result_1) {
        if (err) throw err;
        if (result_1) {
          var obj = result_1[0].linkFriends;
          for (var i = 0; i < obj.length; i++) {
            if (obj[i].friendName === req.body.myName) {
              if (req.body.friends === 'no') {
                obj[i].adopt = '';
              } else {
                obj[i].adopt = 'yes';
              }
              obj[i].newsNumber = 0;
              // console.log(obj);
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db('runoob');
                var whereStr = { name: req.body.fromName }; // 查询条件
                var updateStr = { $set: { linkFriends: obj } }; //更换内容
                // console.log('第-道', updateStr);
                dbo
                  .collection('site')
                  .updateOne(whereStr, updateStr, function (err, res) {
                    if (err) throw err;
                    // console.log(res);
                    // console.log('更改请求方数据成功');
                    // resto.send({code:200,msg:'已告知对方请耐心等待'});
                  });
              });
              break;
            }
          }
          db.close();
        } else {
          db.close();
        }
      });
  });
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    var whereStr = { name: req.body.myName }; // 查询条件
    dbo
      .collection('site')
      .find(whereStr)
      .toArray(function (err, result_1) {
        if (err) throw err;
        if (result_1) {
          var obj = result_1[0].linkFriends;
          for (var i = 0; i < obj.length; i++) {
            if (obj[i].friendName === req.body.fromName) {
              if (req.body.friends === 'no') {
                obj[i].adopt = '';
              } else {
                obj[i].adopt = 'yes';
              }
              if (req.body.clear) {
                obj[i].newsNumber = 0;
              } else {
                obj[i].newsNumber = 0;
              }
              // console.log(obj);
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db('runoob');
                var whereStr = { name: req.body.myName }; // 查询条件
                var updateStr = { $set: { linkFriends: obj } }; //更换内容
                // console.log('第-道', updateStr);
                dbo
                  .collection('site')
                  .updateOne(whereStr, updateStr, function (err, res) {
                    if (err) throw err;
                    // console.log(res);
                    // console.log('更改自己数据成功');
                    resto.send({
                      code: 200,
                      msg: '添加好友成功，开始聊天吧！',
                    });
                  });
              });
              break;
            }
          }
          db.close();
        } else {
          db.close();
        }
      });
  });
});
//消息清零
app.post('/post6', function (req, res, next) {
  var resto = res;
  // console.log('请求url：', req.path);
  // console.log('post请求参数：', req.body);
  // req.body.myName = JSON.parse(req.body.myName);
  // console.log('post请求参数req.body.myName：', req.body.nickName);
  if (req.body.type === 'groupChat') {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db('runoob');
      var whereStr = { buildingGroupName: req.body.nickName }; // 查询条件
      dbo
        .collection('buildingGroup')
        .find(whereStr)
        .toArray(function (err, result_1) {
          if (err) throw err;
          if (result_1[0]) {
            // console.log('数据：', result_1[0]);
            for (var i = 0; i < result_1[0].name.length; i++) {
              if (result_1[0].name[i].name === req.body.fromName) {
                result_1[0].name[i].newsNumber = 0;
                // console.log('数据ok：', result_1[0].name);
                MongoClient.connect(url, function (err, db) {
                  if (err) throw err;
                  var dbo = db.db('runoob');
                  var whereStr = { buildingGroupName: req.body.nickName }; // 查询条件
                  var updateStr = { $set: { name: result_1[0].name } }; //更换内容
                  // console.log('第-道', updateStr);
                  dbo
                    .collection('buildingGroup')
                    .updateOne(whereStr, updateStr, function (err, res) {
                      if (err) throw err;
                      // console.log(res);
                      // console.log('更改请求方数据成功');
                      resto.send({ code: 200, msg: '已阅读暂无消息' });
                    });
                });
                break;
              }
            }
            db.close();
          } else {
            db.close();
          }
        });
    });
  } else {
    MongoClient.connect(url, function (err, db) {
      var dbo = db.db('runoob');
      var whereStr = { name: req.body.fromName }; // 查询条件
      dbo
        .collection('site')
        .find(whereStr)
        .toArray(function (err, result_1) {
          if (err) throw err;
          if (result_1[0]) {
            var obj = result_1[0].linkFriends;
            for (let i = 0; i < obj.length; i++) {
              if (obj[i].friendName === req.body.myName) {
                if (req.body.friends === 'no') {
                  obj[i].adopt = '';
                } else {
                  obj[i].adopt = 'yes';
                }
                obj[i].newsNumber = 0;
                // console.log(obj);
                MongoClient.connect(url, function (err, db) {
                  var dbo = db.db('runoob');
                  var whereStr = { name: req.body.fromName }; // 查询条件
                  var updateStr = { $set: { linkFriends: obj } }; //更换内容
                  // console.log('第-道', updateStr);
                  dbo
                    .collection('site')
                    .updateOne(whereStr, updateStr, function (err, res) {
                      if (err) throw err;
                      // console.log(res);
                      // console.log('更改请求方数据成功');
                      resto.send({ code: 200, msg: '已阅读暂无消息' });
                    });
                });
                break;
              }
            }
            db.close();
          } else {
            db.close();
          }
        });
    });
  }
});
// 添加备注
app.post('/remarks', function (req, res) {
  // console.log(req.body); // 上传的文件信息
  var resto = res,
    reqs = req,
    result = { code: 1001, msg: '操作失败！', icon: '' };

  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    var whereStr = { name: req.body.toChatName }; // 查询条件
    dbo
      .collection('site')
      .find(whereStr)
      .toArray(function (err, result_1) {
        if (err) throw err;
        if (result_1) {
          // console.log(result_1);
          var obj = result_1[0].linkFriends;
          for (let i = 0; i < obj.length; i++) {
            if (obj[i].friendName === req.body.myName) {
              if (reqs.body.remarksName !== '') {
                obj[i].remarksName = reqs.body.remarksName;
              }
              if (reqs.body.remarksNuber !== '') {
                obj[i].remarksNuber = reqs.body.remarksNuber;
              }
              // console.log(obj);
              MongoClient.connect(url, function (err, db) {
                if (err) throw err;
                var dbo = db.db('runoob');
                var whereStr = { name: req.body.toChatName }; // 查询条件
                var updateStr = { $set: { linkFriends: obj } }; //更换内容
                // console.log('第-道', updateStr);
                dbo.collection('site').updateOne(whereStr, updateStr, function (err, res) {
                  if (err) throw err;
                  // console.log('======', res);
                  // console.log('更改请求方数据成功');
                  if (res.acknowledged) {
                    if (reqs.body.remarksName !== '') {
                      result.remarksName = reqs.body.remarksName;
                    } else {
                      result.remarksName = obj[i].remarksName;
                    }
                    if (reqs.body.remarksNuber !== '') {
                      result.remarksNuber = reqs.body.remarksNuber;
                    } else {
                      result.remarksNuber = obj[i].remarksNuber;
                    }

                    result.code = 200;
                    result.msg = '保存成功';
                    resto.send(result);
                  } else {
                    resto.send(result);
                  }
                });
              });
              break;
            }
          }
          db.close();
        } else {
          resto.send(result);
          db.close();
        }
      });
  });
});
//资料详情
app.post('/remarks1', function (req, res) {
  // console.log(req.body); // 上传的文件信息
  var resto = res,
    result = { code: 1001, msg: '未搜到结果哦！', icon: '' };
  MongoClient.connect(url, function (err, db) {
    var dbo = db.db('runoob');
    var whereStr = null,
      star = 0;
    function remarksTo() {
      if (
        /(16[0-9]|17[0-9]|18[0-9]|15[0-9]|13[0-9]|14[0-9]|19[0-9])[0-9]{8}$/.test(
          req.body.toChatName
        )
      ) {
        // console.log('shouji');
        whereStr = { name: req.body.toChatName }; // 查询条件
      } else {
        if (star === 0) {
          whereStr = { nickName: req.body.toChatName }; // 查询条件
        } else {
          whereStr = { LLNumber: req.body.toChatName }; // 查询条件
        }
      }
      dbo
        .collection('site')
        .find(whereStr)
        .toArray(function (err, result_1) {
          if (err) throw err;
          // console.log(result_1);
          if (result_1[0]) {
            // console.log('>>>>>>>>>>', result_2);
            result.imges = result_1[0].headPortrait || '';
            result.apathZoom = result_1[0].apathZoom || '';
            // console.log(result_1[0].linkFriends);
            var obj = result_1[0].linkFriends;
            var arrayOne = 0;
            if (result_1[0].myRegion) {
              result.myRegion = result_1[0].myRegion;
            }
            result.sex = result_1[0].sex;
            result.information = result_1[0].information;
            for (var i = 0; i < obj.length; i++) {
              // console.log(obj[i].friendName);imgId
              if (obj[i].friendName === req.body.myName) {
                // console.log(obj[i].friendName);
                // console.log(obj[i]);
                result.code = 200;
                if (obj[i].remarksName) {
                  result.remarksName = obj[i].remarksName;
                  result.remarksNameNick = result_1[0].nickName;
                } else {
                  result.remarksName = result_1[0].nickName;
                  result.remarksNameNo = 'no';
                }
                if (obj[i].remarksNuber) {
                  result.remarksNuber = obj[i].remarksNuber;
                } else {
                  result.remarksNuber = obj[i].remarksNuber;
                }
                result.LLNumber = result_1[0].LLNumber;
                result.name = result_1[0].name;
                result.circleFriendsBackground = result_1[0].circleFriendsBackground
                result.msg = '成功';
                arrayOne = 1;
                resto.send(result);
                db.close();
                break;
              }
            }
            if (arrayOne === 0) {
              result.code = 200;
              result.LLNumber = result_1[0].LLNumber;
              result.name = result_1[0].name;
              result.remarksName = result_1[0].nickName;
              result.circleFriendsBackground = result_1[0].circleFriendsBackground
              result.friend = 'no';
              result.msg = '成功';
              resto.send(result);
              db.close();
            }
          } else {
            if (star === 1) {
              resto.send(result);
              db.close();
            }
            if (star === 0) {
              star += 1;
              remarksTo();
            }
          }
        });
    }
    remarksTo();
  });
});
//更改个人资料
app.post('/myRemarks', function (req, res) {
  // console.log(req.body); // 上传的文件信息
  var resto = res,
    result = { code: 1001, msg: '网络错误！', icon: '' };
  let obj = { nickName: req.body.nickName, myRegion: req.body.myRegion }
  if (req.body.information) {
    const { newOptions0 } = req.body.information;
    obj = { information: req.body.information }
    if (newOptions0[0]?.value) {
      obj.nickName = newOptions0[0]?.value
    }
  }
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    var whereStr = { name: req.body.myName }; // 查询条件
    var updateStr = {
      $set: obj,
    }; //更换内容
    // console.log('第-道', updateStr);
    dbo.collection('site').updateOne(whereStr, updateStr, function (err, res) {
      if (err) throw err;
      // console.log('======', res, res.result);
      // console.log('更改请求方数据成功');
      // db.close();
      if (res.acknowledged) {
        result.code = 200;
        result.msg = '保存成功';
        result.nickName = req.body.nickName;
        result.myRegion = req.body.myRegion;
        result.information = req.body.information
        resto.send(result);
      } else {
        resto.send(result);
      }
      db.close();
    });
  });
});

