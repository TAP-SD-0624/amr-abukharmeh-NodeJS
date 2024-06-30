import { readFileSync } from 'fs'
import {readFile} from 'fs/promises'

// importing the json file
const {files} = JSON.parse(readFileSync('./config.json'))
// function that handles the files async to be much faster
async function handleTextFiles(files){
    const fileResults = await Promise.all(files.map(async (i)=>{
        try {
            const r = await readFile(i, { encoding: 'utf8' })
            return `${i} ${extractWords(r)}`
        } catch (e) {
            return `${i} File Doesn't exist`
        }
    }))
    return fileResults
}
// .then was used cuz handleTextFiles will return a promise
handleTextFiles(files).then(console.log)



// i had to assume some rules :-
// grammar rules are not counted
// minimum charechters of a word are (2)
// correct word is the one that doesn't contain anything but alphabetical letters.
// however a word could contain English Punctuation (, . ? ! : -) etc
// a word that begins with a number will be rejected.
// expamles :-
// "it's" is a word
// "good" is a word
// "g" is not a word
// "good!" or "good?" are words
// "how are you?" are 3 words
// "aren't you amr?" are 3 words

function extractWords(string){
    // reject if the file is empty
    if (string.length<1)return "Empty File"
    // first replace all newlines break with an empty space
    const replaceNewLines = string.replace(/(\r\n|\r|\n)/g, ' ')
    // second we delete anything that is not a letter 
    const justWords = replaceNewLines.replace(/[^a-zA-Z\d\s]/g,"")
    // third we need to separate words by blank space 
    const wordsSeprated = justWords.split(' ')
    // forth we need to remove any word starts with anything but letters or is less than 2 letters
    const filterStart = wordsSeprated.filter(i=>/^[a-zA-Z]/.test(i)||i.length>1)
    return filterStart.length
}
