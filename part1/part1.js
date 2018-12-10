var prompt = require('prompt');
prompt.start();

let input = "";
prompt.get(['input'], function (err, result) {
    if (err) { 
        return onErr(err); 
    }
    console.log('Command-line input received:');
    console.log('  input: ' + result.input);
    input = result.input.split(" ");
    let numLength = parseInt(input[0]);
    if(numLength < 0 || numLength > 10000){
        console.log("Exitting, please enter valid input length Greater than 0 days, and less than 10,000 days");
        process.exit(1);
    } else {
        let numbers = input;
        numbers.shift();
        for (let i = 0; i < numbers.length; i++){
            if(parseInt(numbers[i])){
                numbers[i] = parseInt(numbers[i]);
            } else {
                console.log("Exiting, Invalid input in the array, please ensure no spaces");
                process.exit(1);
            }
        }
        let max = numbers[0];
        let temp = numbers[0];
        // Using Math.Max we keep a running counter of the max we encounter
        // Run time of this operation is O(n)
        for (let i = 1; i < numbers.length; i ++){
            temp = Math.max(numbers[i],temp+numbers[i]);
            // We then see if this is the greatest max we've seen.
            // 
            max = Math.max(max,temp);
        }
        //Return to the user the computed max value.
        console.log("The Maximum possible gain is : ",max);
    }
});