/*
    Project Euler 001
    Multiples of 3 and 5

    If we list all the natural numbers below 10
    that are multiples of 3 or 5, we get 3, 5, 6 and 9.

    The sum of these multiples is 23.

    Find the sum of all the multiples of 3 or 5 below 1000.
 */
function solution() {
    // Define the integer that all numbers in the list should be lower than.
    let max = arguments[0];

    // Tracks the sum of multiples of 3 or 5 that are less than `max`.
    let sum = 0;

    // For each integer between 0 and `max`.
    for (let i=1; i<max; i++) {
        // If it is a multiple of 3 or 5.
        if (i % 3 === 0 || i % 5 === 0)
            // Add the number to the sum.
            sum += i
    }

    return sum
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
            input: [10],
            answer: 23
        },
        {   // 2
            input: [1000],
            answer: 233168
        },
    ]
)