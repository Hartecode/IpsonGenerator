class IpsunGenerator {

    constructor(text, numOfParagraph) {
        this.text = text; //string
        this.numOfParagraph = numOfParagraph; // number
        this.ngrams;// type Ngram - look at ehe interface below 
        this.ipson='';
        this.setup();
        this.generateRichText();
    }

    get richIpson()  {
        return this.ipson;
    }

    setup() {
        const textArr = this.text.split(' ');
        this.ngrams = textArr.reduce((acc, cur, i) => {
            const next = textArr[i + 1];
            if (i === textArr.length - 1)  return acc;

            if (!(cur in acc)) {
                acc[cur] = {};
                acc[cur]['relatedWords'] = {};
                acc[cur]['overAllTotal'] = 0;
            }            

            if(!acc[cur]['relatedWords'][next]) {
                acc[cur]['relatedWords'][next] = { total: 0};
            }

            acc[cur]['relatedWords'][next]['total'] = ++acc[cur]['relatedWords'][next]['total'];

            acc[cur]['overAllTotal'] = ++acc[cur]['overAllTotal'];

            for (let key in acc[cur]['relatedWords']) {
                acc[cur]['relatedWords'][key]['per'] = acc[cur]['relatedWords'][key]['total'] / acc[cur]['overAllTotal'];
            }
            return acc;
        }, {});
    }

    // returns random number
    randomItem(arr) {
        return Math.floor(Math.random() * (arr.length));
    }

    // takes in a object returns a string
    pickNextWord(relatedWords) {
        const relatedWordsArray =  Object.keys(relatedWords);
        const randPick = relatedWordsArray[this.randomItem(relatedWordsArray)];
        const randomNumber = Math.random();
        if (relatedWords[randPick]['per'] >= randomNumber) {
            return randPick;
        }
        return this.pickNextWord(relatedWords);
    }

    generateText(firstPar, num) {
        const keyList = Object.keys(this.ngrams);
        let currentGram = firstPar ? keyList[0] : keyList[this.randomItem(keyList)];
        let result = firstPar ? currentGram : currentGram.charAt(0).toUpperCase() + currentGram.slice(1);;
        for (let i = 0; i < num; i++) {
            const possibilities = this.ngrams[currentGram];
            if (!possibilities) break;
            const next = this.pickNextWord(possibilities.relatedWords);
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
}

/*
    interface Ngram {
        string; {
            relatedWords: {
                string: {
                    per: number; // percentage of times used after the main word
                    total: number; // total of times used
                }
            }
            overAllTotal: number;// total of words which cam after the main word
        }
    }
*/
module.exports = IpsunGenerator;
