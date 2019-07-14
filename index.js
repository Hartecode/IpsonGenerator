const fs = require('fs');
const data = fs.readFileSync('panda.txt');
const pandaText = data.toString();

class IpsonGenerator {

  constructor(text) {
    this.text = text;
    this.order = 3;
    this.ngrams = {};

    this.setup()
  }
  
  setup() {
    for (let i = 0; i <= this.text.length - this.order; i++) {
      let gram = this.text.substring(i, i + this.order);

      if(!this.ngrams[gram]) {
        this.ngrams[gram] = [];
      }

      this.ngrams[gram].push(this.text.charAt(i - this.order));
    } 
  }

  generateText() {
    let currentGram = this.text.substring(0, this.order);
    let result = currentGram;
    for (let i = 0; i < 300; i++) {
      const possibilities = this.ngrams[currentGram];
      if (!possibilities) break;
      const next = possibilities[Math.floor(Math.random() * (possibilities.length))];
      result += next;
      const len = result.length;
      currentGram = this.text.substring(len - this.order, len);
    }

    return result;
  }

}

const test = new IpsonGenerator(pandaText);

console.log(test.generateText());

