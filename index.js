const IpsunGenerator = require('./Ipsun-generator.js');
const express = require('express')
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync('panda.txt');
const pandaText = data.toString();


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/ipsun', (req, res) => {
    const numOfParagraph = req.query.par;
    const ipsunInstance = new IpsunGenerator(pandaText, numOfParagraph);
    res.send(ipsunInstance.richIpson);
}
);


app.listen(port, () => console.log(`listening on port ${port}!`));