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
// gramer rules are not counted
// minimum charechters of a word are (2)
// correct word is the one that doesn't contain anything but alphabetical letters.
// word could end with a charecter only from (, . ? ! :) or has ( ' ) in the middle
// word begins or has a charecter in the middle or a number will be rejected.
// expamles :-
// "it's" is a word
// "good" is a word
// "g" is not a word
// "goo1d" or "@good" are not words
// "good!" or "good?" are words
// "how are you?" are 3 words
// "aren't you amr?" are 3 words



function extractWords(string){
    // reject if the file is empty
    if (string.length<1)return "Empty File"
    // first replace all newlines break with an empty space
    const replaceNewLines = string.replace(/(?:\r\n|\r|\n)/g, ' ')
    // second we need to separate words by blank space 
    const wordsSeprated = replaceNewLines.split(' ')
    // third we need to remove any words starts with anything but letters
    const filterStart = wordsSeprated.filter(i=>/^[a-zA-Z]/.test(i))
    // forth we need to remove any words ends with anything but letters or acceptable special characters 
    const filterEnd = filterStart.filter(i=>/[a-zA-Z|?|!|:|.|,]$/.test(i))
    // fifth remove any words that contain a special character in the middle except for (') or words that are less than one Char
    const wordList = filterEnd.filter((i)=>{
        // reject the word if it's less than two chars
        if(i.length===1)return false
        for(let k=0;k<i.length-1;k++){
            // check if the word contains special characters
            if(!(/[a-zA-Z]/.test(i[k]))){ 
                // however if the special char is (') then it's ok
                if(i[k]==="'")continue
                return false
            }
        }
        // accept the word
        return true
    })
    return wordList.length
}
