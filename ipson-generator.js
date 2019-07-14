class IpsonGenerator {

    constructor(text, numOfParagraph) {
        this.text = text;
        this.numOfParagraph = numOfParagraph;
        this.ngrams;
        this.ipson='';
        this.setup();
        this.generateRichText();
    }

    setup() {
        const textArr = this.text.split(' ');
        this.ngrams = textArr.reduce((acc, cur, i) => {
            if (i === textArr.length -1)  return acc;

            if (!(cur in acc)) {
                acc[cur]=[];
            } 

            acc[cur].push(textArr[++i]);
            return acc;
        }, {});
    }

    randomItem(arr) {
        return Math.floor(Math.random() * (arr.length));
    }

    generateText(firstPar, num) {
        const keyList = Object.keys(this.ngrams);
        let currentGram = firstPar ? keyList[0] : keyList[this.randomItem(keyList)];
        let result = firstPar ? currentGram : currentGram.charAt(0).toUpperCase() + currentGram.slice(1);;
        for (let i = 0; i < num; i++) {
            const possibilities = this.ngrams[currentGram];
            if (!possibilities) break;
            const next = possibilities[this.randomItem(possibilities)];
            result +=  ' ' + next;
            currentGram = next;
        }

        if (!currentGram.includes('.')) {
            result += '.';
        }
    
        return result;
    }

    generateRichText() {
        for (let i=0; i < this.numOfParagraph; i++) {
            this.ipson += `<p>${this.generateText(i === 0, this.paragraphLength())}</p>`;
        }
    }

    paragraphLength() {
        const parLength = [50, 75, 100, 125];
        return  parLength[this.randomItem(parLength)];
    }

    get richIpson()  {
        return this.ipson;
    }
}

module.exports = IpsonGenerator;
