// TODO: Solve this problem. Stuck after 90 minutes.

function isPrime(n) {
    if (n === 2 || n === 3)
        return true;
    if (n % 2 === 0 || n < 2)
        return false;

    for (let i = 3; i < n; i += 2) {
        if (n % i === 0)
            return false
    }

    return true
}

function occurrencesOfDigitInNumber(repeatingDigit, n) {
    let searchString = repeatingDigit.toString();
    let reg = new RegExp(searchString,"g");

    let originalStr = n.toString();
    let replacedStr = originalStr.replace(reg, "");

    return originalStr.length - replacedStr.length;
}

/*
    Project Euler 051
    Prime Digit Replacements

    By replacing the 1st digit of the 2-digit number *3,
    it turns out that six of the nine possible values: 13, 23, 43, 53, 73, and 83, are all prime.

    By replacing the 3rd and 4th digits of 56**3 with the same digit,
    this 5-digit number is the first example having seven primes among the ten generated numbers,
    yielding the family: 56003, 56113, 56333, 56443, 56663, 56773, and 56993.
    Consequently 56003, being the first member of this family, is the smallest prime with this property.

    Find the smallest prime which, by replacing part of the number (not necessarily adjacent digits)
    with the same digit, is part of an eight prime value family.
 */
function solution() {
	let primeFamilySize = arguments[0];

	let smallestPrime = 0;

	for (let i=100001; i<=999999; i+=2) {
	    if (isPrime(i)) {
	        let prime = i;
	        for (let j=0; j<10; j++) {
	            if (occurrencesOfDigitInNumber(j, prime) === 3) {
	                console.log(prime)
                }
            }
        }
    }

	return smallestPrime;
}

function runTests(func, tests) {
	let passed = 0;
	let failed = 0;

	for (let i = 0; i < tests.length; i++) {
		let test = tests[i];
		let result = func(...test.input);

		if (result === test.answer) {
			console.log(`${i + 1}: PASS (${test.input})`);
			passed += 1;
		} else {
			console.log(`${i + 1}: FAIL (${test.input})  -->  (Got: ${result}, Expected: ${test.answer})`);
			failed += 1;
		}
	}

	console.log(`\n${passed} passed, ${failed} failed.`);
}

runTests(
	func = solution,
	tests = [
		{   // 1
			input: [6],
			answer: 13,
		},
        // {   // 2
        //     input: [7],
        //     answer: 56003,
        // },
        // {   // 3
        //     input: [8],
        //     answer: undefined,
        // },
	],
);