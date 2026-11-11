// Module 1
import * as m2 from './module2.mjs';
import * as m3 from './module3.mjs';

export function printAll(){
    m2.printHello("Ana");
    m3.printSum(2, 3);
}