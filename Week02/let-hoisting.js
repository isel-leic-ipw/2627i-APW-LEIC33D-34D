// TDZ starts at beginning of scope
const func = () => console.log(letVar); // OK: Declared, but not executed yet

// Within the TDZ letVar access throws `ReferenceError`
// console.log(letVar); // ReferenceError
// func(); // ReferenceError

let letVar = 3; // End of TDZ (for letVar)
func(); // OK: Executed outside TDZ (Outputs: 3)