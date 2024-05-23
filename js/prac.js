/*
// callback
function callbackFunction(name) {
    console.log("Hello " + name);
}
function outerFunction(callback) {
    let name = "rajdeo";
    callback(name);
}
outerFunction(callbackFunction);
*/


/*
let nameObj = {
   name: "Tony"
}
function sayHi(address) {
   return `My name is ${this.name} lives in ${address}`;
}
console.log('regular func => ', sayHi.call(nameObj, "thane"))
console.log('regular func => ', sayHi.apply(nameObj, ["thane"]))
console.log('regular func => ', sayHi.bind(nameObj, "thane")())

*/

const fs = require('fs');

// Timers
setTimeout(() => {
    console.log('Timeout callback executed');
}, 0);

// Immediate
setImmediate(() => {
    console.log('Immediate callback executed');
});

// File I/O
fs.readFile(__filename, () => {
    console.log('File read callback executed');
});

// Normal synchronous operation
console.log('Synchronous operation executed');


// Event emitter
const { EventEmitter } = require('events')
const eventEmitter = new EventEmitter()


eventEmitter.on('lunch', () => {
   console.log('yooo')
})


eventEmitter.emit('lunch')