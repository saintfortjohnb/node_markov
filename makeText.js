/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');

const MarkovMachine = require('./markov');

function readFile(path) {
  try {
    return fs.readFileSync(path, 'utf-8');
  } catch (error) {
    console.error(`Error reading file: ${path}`);
    process.exit(1);
  }
}

async function readURL(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching URL: ${url}`);
    process.exit(1);
  }
}

function generateText(input) {
  const mm = new MarkovMachine(input);
  return mm.makeText();
}

async function run() {
  const [type, source] = process.argv.slice(2);

  let input;

  if (type === 'file') {
    input = readFile(source);
  } else if (type === 'url') {
    input = readURL(source);
  } else {
    console.error('Invalid input type. Please specify "file" or "url".');
    process.exit(1);
  }

  try {
    const text = await input;
    const generatedText = generateText(text);
    console.log(generatedText);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

run();

