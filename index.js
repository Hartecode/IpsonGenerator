const IpsunGenerator = require('./Ipsun-generator.js');
const express = require('express')
const app = express();
const morgan = require('morgan');
const port = 3000;
const fs = require('fs');
const path = require('path');
const pug = require('pug');
const data = fs.readFileSync('panda.txt');
const pandaText = data.toString();
const ipsunInstance = new IpsunGenerator(pandaText);


app.use(morgan('dev'));

app.set('./views', path.resolve(__dirname, 'views'));

app.set('view engine', 'pug');

// const todoItems = [
//     'Buy Tofu',
//     'Buy Soya Milk',
//     'Buy Vegetables',
//     'Finish Article'
// ];

// app.get('*', function(req, res) {
//     res.render('todo', {items: todoItems, isAdmin: true,  userName: 'Yariv'});
// });

app.get('/', (req, res) => {
    res.render('index', {userName: 'Sean Harte'});
});

app.get('/ipsun', (req, res) => {
    const numOfParagraph = req.query.par;
    const ipson = ipsunInstance.generateRichText(numOfParagraph);
    console.log(ipson);
    res.render('index', {ipson});
});


app.listen(port, () => console.log(`listening on port ${port}!`));