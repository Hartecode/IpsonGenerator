class IpsumGenerator {

    constructor(text) {
        this._text = text; //string
        this._ngrams;// type Ngram - look at ehe interface below 
        this.setup();
    }

    setup() {
        const textArr = this._text.split(' ');
        this._ngrams = textArr.reduce((acc, cur, i) => {
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
        const keyList = Object.keys(this._ngrams);
        let currentGram = firstPar ? keyList[0] : keyList[this.randomItem(keyList)];
        let result = firstPar ? currentGram : currentGram.charAt(0).toUpperCase() + currentGram.slice(1);
    
        for (let i = 0; i < num; i++) {
            let next;
            const possibilities = this._ngrams[currentGram];
            if (!possibilities) {
                const newWord = keyList[this.randomItem(keyList)];
                next = (currentGram.includes('.')) ? newWord.charAt(0).toUpperCase() + newWord.slice(1) : newWord.toLowerCase();  
            } else {
                next = this.pickNextWord(possibilities.relatedWords);
            }
            result +=  ' ' + next;
            currentGram = next;
        }

        if (!currentGram.includes('.')) {
            if (result.indexOf(',') === result.length - 1) result.replace(',', '');
            result += '.';
        }
    
        return result;
    }

    generateRichText(numOfParagraph) {
        let ipson = [];
        for (let i=0; i < numOfParagraph; i++) {
            ipson.push(this.generateText(i === 0, this.paragraphLength()));
        }
        return ipson;
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
module.exports = IpsumGenerator;
