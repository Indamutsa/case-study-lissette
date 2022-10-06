var express = require('express'),
    fs = require('fs'), cors = require('cors')

var app = express();

app.use(cors())
app.use(express.json());

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

app.post('/receive', function (req, res) {
    // var body = '';
    let id = req.body.param.id
    let jsonData = JSON.stringify(req.body.data)
    filePath = __dirname + `/public/response${id}.json`;
    fs.closeSync(fs.openSync(filePath, 'w'));

    fs.writeFile(filePath, jsonData, function (err) {
        if (err) return console.log(err);
        res.send({ status: "Data written to file successfully" });
    });
});

app.listen(8080, () => console.log('listening on port 8080!'));