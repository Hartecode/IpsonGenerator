const IpsunGenerator = require('./Ipsun-generator.js');
const express = require('express')
const app = express();
const morgan = require('morgan');
const port = 3000;
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync('panda.txt');
const pandaText = data.toString();
const ipsunInstance = new IpsunGenerator(pandaText);


app.use(morgan());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/ipsun', (req, res) => {
    const numOfParagraph = req.query.par;
    res.send(ipsunInstance.generateRichText(numOfParagraph) );
});


app.listen(port, () => console.log(`listening on port ${port}!`));