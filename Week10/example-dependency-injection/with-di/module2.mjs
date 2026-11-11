// Module 2
export default function createM2(m4){
    if (! m4){
        throw "Error: missing argument m4!";
    }

    return {
        printHello: printHello
    };

    function printHello(name){
        console.log(m4.getMessage(name));
    }
}
