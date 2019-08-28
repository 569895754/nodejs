
let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let uuid = require('uuid');
let { getUserList, getUserByName, insertUser, updateUser, deleteUser } = require('./model/UserService');

app.listen(7777);

app.use(bodyParser.json());

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8000");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.get('/user', function (req, res) {
    let userList = getUserList();
    userList.then(response => {
        res.status(200);
        res.json(response);
    });
});

app.get('/user/:name', function (req, res) {
    console.log(req.params.name)
    let user = getUserByName(req.params.name);
    user.then(response => {
        res.status(200);
        res.json(response);
    });
});

app.post('/user', (req, res) => {
    let user = req.body;
    user.id = uuid.v1();
    insertUser(user).then(response => {
        if (response.result.ok === 1) {
            res.status(200);
            res.json('success');
        } else {
            res.status(200);
            res.json('error');
        }
    });
});

app.put('/user/:id', (req, res) => {
    let user = req.body;
    let id = req.params.id;
    delete user._id;
    updateUser(id, user).then(response => {
        if (response.result.ok === 1) {
            res.status(200);
            res.json('success');
        } else {
            res.status(200);
            res.json('error');
        }
    })
});

app.delete('/user/:id', (req, res) => {
   let id = req.params.id;
   deleteUser(id).then(response => {
       if (response.result.ok === 1) {
           res.status(200);
           res.json('success');
       } else {
           res.status(200);
           res.json('error');
       }
   });
});

let server = app.listen(3000, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});