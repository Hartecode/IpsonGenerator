const IpsonGenerator = require('./Ipson-generator.js');
const express = require('express')
const app = express();
const port = 3000;
const fs = require('fs');
const data = fs.readFileSync('panda.txt');
const pandaText = data.toString();

// const htmlTemp = (code) => `<html lang="en">
// <head>
//   <meta charset="utf-8">

//   <title>Ipson/title>
//   <meta name="description" content="ipson generator">
//   <meta name="author" content="Sean Harte">

// </head>

// <body>
//   ${code}  
//   <script>
//     document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] +
//     ':35729/livereload.js?snipver=1"></' + 'script>')
//   </script>
// </body>
// </html>`;

app.get('/', (req, res) => res.send(test.generateText()));

const test = new IpsonGenerator(pandaText);

app.listen(port, () => console.log(`listening on port ${port}!`));