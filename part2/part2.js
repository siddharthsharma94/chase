var prompt = require('prompt');
var translator = require('v-number-to-words');

prompt.start();

let input = "";
//The instructions are not clear and don't really state if we can use an external library or not
//If im not able to then I wont use it, but since its unclear in the question guide im assuming its 
//Fair game. This is how i would tackle such a problem in a real life scenario as well.
prompt.get(['input'], function (err, result) {
    console.log('Command-line input received:');
    console.log('  input: ' + result.input);
    /* Uncomment this section for the code with the library
    */
    // =======================================================
    let money = translator.numberToWords(result.input);
    money.toLocaleUpperCase();
    money = money.split(" ");
    money.push("Dollars");
    for(let i = 0; i < money.length; i++){
        let str = money[i];
        let final = str.replace(str[0], str[0].toUpperCase());
        money[i] = final;
    }
    money = money.join("")
    console.log("LIBRARY RESULT: ",money);
    // =======================================================
    // Here is the code for how I would do it without the library.
    console.log("MY CODE RESULT: ",convertToWord(result.input));
});


var ones=['','One','Two','Three','Four','Five','Xix','Seven','Eight','Nine'];
var tens=['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
var teens=['Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Xixteen','Seventeen',
           'Eighteen','Nineteen'];

function convertToWord(val){
    if (val == 0) {
        return "Zero";
    }
    else {
        return convertBillion(val)+"Dollars";
    }
}

function convertTen(val){
    if (val < 10){ 
        return ones[val];
    }
    else if (val >= 10 && val < 20){ 
        return teens[val - 10];
    }
    else{
        return tens[Math.floor(val / 10)]+ones[val % 10];
    }
}

function convertHundred(val){
    if (val > 99){
        return ones[Math.floor(val / 100)]+"Hundred"+convertTen(val % 100);
    }
    else{
        return convertTen(val);
    }
}

function convertThousand(val){
    if (val >= 1000){
        return convertHundred(Math.floor(val / 1000))+"Thousand"+convertHundred(val % 1000);
    }
    else{
        return convertHundred(val);
    }
}

function convertMillion(val){
    if (val >= 1000000){
        return convertMillion(Math.floor(val / 1000000))+"Million"+convertThousand(val % 1000000);
    }
    else {
        return convertThousand(val);
    }
}

function convertBillion(val){
    if (val >= 1000000000){
        return convertBillion(Math.floor(val / 1000000000))+"Billion"+convertMillion(val % 1000000000);
    }
    else {
        return convertMillion(val);
    }
}