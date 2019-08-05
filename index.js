const IpsumGenerator = require('./ipsum-generator.js');
const express = require('express')
const app = express();
const morgan = require('morgan');
const port = 3000;
const fs = require('fs');
const path = require('path');
const data = fs.readFileSync('text-files/panda.txt');
const pandaText = data.toString();
const ipsumInstance = new IpsumGenerator(pandaText);


app.use(morgan('dev'));

app.set('./views', path.resolve(__dirname, 'views'));

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {userName: 'Sean Harte'});
});

app.get('/api', (req, res) => {
    const numOfParagraph = req.query.par;
    const ipsum = ipsumInstance.generateRichText(numOfParagraph);
    res.json({ipsum});
});



app.listen(port, () => console.log(`listening on port ${port}!`));