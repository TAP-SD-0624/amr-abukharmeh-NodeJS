# Words counter #

#### i had to assume some rules :- ###
1. gramer rules are not counted
2. minimum charechters of a word is (2)
3. correct word is the one that doesn't contain anything but alphabetical letters. 
4. word could end with a charecter only from (, . ? ! :) or has ( ' ) in the middle
5. word begins or has a charecter in the middle or a number it will be rejected.

### expamles :- ###
1. "it's" is a word
2. "good" is a word 
3. "g" is not a word 
4. "goo1d" or "@good" are not words
5. "good!" or "good?" are words
6. "how are     you?" are 3 words
7. "aren't you amr?" are 3 words

## Error Handling : ##
1. in case file dosen't exist will print "File Doesn't exist"
2. in case Empty file will print "Empty File"
3. "File Doesn't exist" might be printed in other async errors
4. can handle new lines
