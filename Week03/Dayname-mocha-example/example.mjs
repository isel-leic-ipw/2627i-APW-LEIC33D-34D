import {dayName, dayNumber} from "./dayname.mjs";

let now = new Date();

console.log(`Today is ${dayName(now.getDay())}`);

console.log(`Today is ${dayNumber("Moon")}`);