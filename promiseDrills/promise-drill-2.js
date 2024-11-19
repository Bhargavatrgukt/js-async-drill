/*
    1. Print out "Program started" at the start of your code
    2. Create a Promise that resolves after 3 seconds
       and rejects after 2 seconds
    3. Log out the promise while it's pending
    4. Print out "Program in progress..." as well

    5. Print out "Program complete" if the promise fulfills
    6. Print out "Program failure" if the promise rejects

    HINT: Use setTimeout for the delay
*/


console.log("Program started");

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Program failure"); // Reject after 2 seconds
    }, 2000);

    setTimeout(() => {
        resolve("Program complete"); // Resolve after 3 seconds
    }, 3000);
});

console.log(promise); 
console.log("Program in progress...");

promise
    .then((message) => console.log(message)) 
    .catch((message) => console.log(message)); 
