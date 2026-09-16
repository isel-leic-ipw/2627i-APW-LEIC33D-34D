// Json
const person = {
    name: "Ana",
    surnames: ["Silva", "Nunes"],
    age: 20
}

// Converting person object to a JavaScript Object Notation (JSON) string:
let personSerialized = JSON.stringify(person);

console.log("Typeof person:", typeof person);
console.log("Typeof personSerialized:", typeof personSerialized);
console.log(personSerialized);
// Do something with personSerialized (e.g., store, send)

// Recovering the object from a serialized JSON:
console.log(JSON.parse(personSerialized).surnames);
console.log("Typeof JSON.parse(personSerialized):", typeof JSON.parse(personSerialized));