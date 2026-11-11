// Module 1
export default function createM1(m2, m3){
    if (! m2){
        throw "Error: missing argument m2!";
    }
    if (! m3){
        throw "Error: missing argument m3!";
    }

    return {
        printAll: printAll
    };

    function printAll(){
        m2.printHello("Ana");
        m3.printSum(2, 3);
    }
}