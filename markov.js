/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    const chains = {};
    const { words } = this;

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const nextWord = words[i + 1] || null;

      if (!chains[word]) {
        chains[word] = [];
      }

      chains[word].push(nextWord);
    }

    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    const { chains } = this;
    const words = Object.keys(chains);
    let currentWord = words[Math.floor(Math.random() * words.length)];
    let text = [];

    while (text.length < numWords && currentWord !== null) {
      text.push(currentWord);
      const possibleNextWords = chains[currentWord];
      currentWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
    }

    return text.join(" ");
  }
}

module.exports = MarkovMachine;