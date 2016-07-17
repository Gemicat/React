var express = require('express');
var path = require('path');

var app = express();

// 设置静态资源文件夹
app.use(express.static(path.join(__dirname, 'React-learn')));

app.listen(3000, function() {
    console.log('listen on port 3000');
})