const moment = require('moment');

//new Date().getTime();
let someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

//let createdAt = 1234;
let date = moment();

console.log(date);

console.log(date.format('h:mm a'));
