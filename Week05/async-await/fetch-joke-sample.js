//const URL_RANDOM_JOKE = "https://official-joke-api.appspot.com/random_joke";  // Ok
const URL_RANDOM_JOKE = "https://official-joke-api.appspot2.com/random_joke"; // fetch failed
//const URL_RANDOM_JOKE = "https://official-joke-api.appspot.com/random_joke2"; // HTTP error 404

async function showJoke(){
    try {
        const resp = await fetch(URL_RANDOM_JOKE);
        if (!resp.ok) {
            console.log("Error: HTTP error " + resp.status);
            return ;
            //throw new Error("HTTP error " + resp.status);
        }
        const obj  = await resp.json();
        console.log(obj.setup);
        setTimeout(() => { console.log(obj.punchline); }, 5000);
    }
    catch (e){
        console.log("Error", e.message);
    }
}

console.log("BEGIN ASYNC");
showJoke();
console.log("END ASYNC");
