const IpsonGenerator = require('./Ipson-generator.js');
const express = require('express')
const app = express();
const port = 3000;
const fs = require('fs');
const data = fs.readFileSync('panda.txt');
const pandaText = data.toString();


app.get('/', (req, res) => res.send(`<h1>Panda Ipsom</h1>`));

app.get('/ipson/:num', (req, res) => {
    const numOfParagraph = req.params.num;
    const ipsonInstance = new IpsonGenerator(pandaText, numOfParagraph);
    res.send(ipsonInstance.richIpson)}
);


app.listen(port, () => console.log(`listening on port ${port}!`));