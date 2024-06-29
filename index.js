import { readFileSync } from 'fs'
import {readFile} from 'fs/promises'

// importing the json file
const {files} = JSON.parse(readFileSync('./config.json'))
// function that handles the files async to be much faster
async function handleTextFiles(files){
    const fileResults = await Promise.all(files.map((i)=>{
        return readFile(i, {encoding: 'utf8'}).then(r=>`${i} ${extractWords(r)}`).catch(e=>`${i} File Doesn't exist`)
    }))
    return fileResults
}
// .then was used cuz handleTextFiles will return a promise
handleTextFiles(files).then(console.log)



// i had to assume some rules :-
// gramer rules are not counted
// minimum charechters of a word is (2)
// correct word is the one that doesn't contain anything but alphabetical letters. 
// however due to how is the english language is written a word could end with a charecter such as (, . ? ! :) or has ( ' ) in the middle
// also if a word begins or has in the middle a number it shouldn't be counted.
// expamles :-
// "it's" is a word
// "good" is a word 
// "g" is not a word 
// "goo1d" or "@good" is not a word
// "good!" or "good?" is a word
// "how are     you?" are 3 words
// "aren't you amr?" are 3 words



function extractWords(string){
    if (string.length<1)return "Empty File"
    // first we need to separate words by blank space 
    const wordsSeprated = string.split(' ')
    // second we need to remove any words starts with anything but letters
    const filterStart = wordsSeprated.filter(i=>/^[a-zA-Z]/.test(i))
    // third we need to remove any words ends with anything but letters or acceptable special characters 
    const filterEnd = filterStart.filter(i=>/[a-zA-Z|?|!|:|.|,]$/.test(i))
    // forth remove any words that contain a special character in the middle except for (') or words that are less than one Char
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
