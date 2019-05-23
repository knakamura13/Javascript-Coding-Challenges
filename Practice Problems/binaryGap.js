/*
	Binary Gap

	A binary gap within a positive integer N
	is any maximal sequence of consecutive zeros
	that is surrounded by ones at both ends
	in the binary representation of N.

	Write a function:
		function solution(N);
	that, given a positive integer N, returns the length of its longest binary gap.
	The function should return 0 if N doesn't contain a binary gap.

	Write an efficient algorithm for the following assumptions:
		1 <= N <= 2,147,483,647.
 */
function binaryGap(N) {
	let currentGap = 0;
	let longestGap = 0;

	// Convert integer `N` to a string in binary form.
	let binaryN = N.toString(2);

	// Base cases.
	if (binaryN.length <= 2)
		// String is too short to have a binary gap.
		return 0;

	// Iterate over the characters in the binary string.
	for (let i = 0; i < binaryN.length; i++) {
		if (!parseInt(binaryN[i])) {
			if (parseInt(binaryN[i - 1]) === 1)
				currentGap = 1;
			else
				currentGap += 1;
		} else {
			if (currentGap > longestGap)
				longestGap = currentGap;
			currentGap = 0;
		}
	}

	return longestGap;
}


function solution() {
	let N = arguments[0];
	return binaryGap(N);
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
			input: [9],
			answer: 2,
		},
		{   // 2
			input: [529],
			answer: 4,
		},
		{   // 3
			input: [20],
			answer: 1,
		},
		{   // 4
			input: [15],
			answer: 0,
		},
		{   // 5
			input: [32],
			answer: 0,
		},
		{   // 6
			input: [1041],
			answer: 5,
		},
		{   // 7
			input: [2],
			answer: 0,
		},
		{   // 8
			input: [1],
			answer: 0,
		},
		{   // 9
			input: [0],
			answer: 0,
		},
		{   // 10
			input: [9],
			answer: 2,
		},
	],
);