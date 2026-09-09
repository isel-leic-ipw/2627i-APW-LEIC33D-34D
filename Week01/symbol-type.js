const firstId = Symbol('id')
const secondId = Symbol('id')

console.log(typeof firstId) // "symbol"
console.log(firstId.description) // "id"
console.log(secondId.description) // "id"

// Symbols with the same description are different
console.log(firstId == secondId) // false
console.log(firstId === secondId) // false

// Symbols used as object keys are not enumerable
const user1 = {
	name: 'Maria',
	[firstId]: 12424435,
}

// Can access the symbol property using the symbol variable
console.log(user1[firstId]) // 12424435

// But the symbol property is not enumerable
console.log("Enumerable elements of user1:")
for (key in user1) {
	console.log(`  ${key}: ${user1[key]}`)
}
