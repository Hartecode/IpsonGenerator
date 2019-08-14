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
    const questionAnswer = [
        {
            question: 'What is Panda Ipsum?',
            answer:'A placeholder text for Panda lovers. Great for any project where you need visual mockups and/or to previewing layouts.'
        },
        {
            question: 'Why use Panda Ipsum?',
            answer: 'Becasue Pandas are awesome. Enough said!'
        },
        {
            question: 'How it works?',
            answer: "Just select the amount of paragraphs you want and click generate. Sorry we couldn't make it much easier the that."
        }
    ];
    const oneParagraphIpsum = ipsumInstance.generateText(true, ipsumInstance.paragraphLength());
    console.log(oneParagraphIpsum)
    res.render('index', {questionAnswer, ipsum: oneParagraphIpsum});
});

app.get('/api', (req, res) => {
    const numOfParagraph = req.query.par;
    const ipsum = ipsumInstance.generateRichText(numOfParagraph);
    res.json({ipsum});
});



app.listen(port, () => console.log(`listening on port ${port}!`));