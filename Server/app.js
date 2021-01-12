require('@tensorflow/tfjs-node');
tfjs = require('@tensorflow/tfjs');
express = require('express');
d3 = require('d3');
process=require('process');

let app = express();

app.use(function(req, _, next){
    console.log(`${new Date()} -> ${req.method} for ${req.url}`);
    next();
});

app.get('/init', (req, res) => {
    if (loaded) {
        res.json(200);
    } else {
        res.json(404);
    }
})

app.get('/predict', async (req, res) => {
    int_param=parseInt(req.query['integer']);
    grayscalearray=await predict(int_param);
    rgb=grayscalearray.arraySync()
    res.json(Object.values(rgb));
})

app.use(express.static('static'));

const serverport=process.env.PORT || 3000

app.listen(serverport, function() {
    console.log(`Server is up at ${serverport}`)
})



function randomNormalArr(mean, std, size) {
    generator=d3.randomNormal(mean, std)
    var arr = [];
    for (let y = 0; y < size; y++) {
        let r = generator();
        arr.push(r);
    }
    return arr
}

async function predict(input) {

    inputtensor = tfjs.tensor([randomNormalArr(input/25, 1, 100)]);
    outputtensor = await model.predict(inputtensor)
    return outputtensor;
}

var model;
var loaded = false;
var host;

if (process.env.HEROKU) {
    host = 'https://ugly-digits.herokuapp.com/'
} else {
    host = 'http://localhost:3000/';
}

console.log(host)

tfjs.loadLayersModel('file://tfjs-models/hadwritten-digits/model.json')
.then(async (resolve) => {
    model=resolve
    loaded = true;
}).catch(async (err) => {console.log(err)})