/*
    Project Euler 005
    Smallest Multiple

    2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

    What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
 */
function solution() {
    // Define the number range for the factors.
    let min = arguments[0];
    let max = arguments[1];

    if (max - min >= 10)
        min = max - 9;

    // Tracks the smallest number that is divisible by each number `n` from `min` to `max`.
    let smallestMultiple = Number.MAX_SAFE_INTEGER;

    for (let n=Math.pow(max, 7); n>0; n-=max) {
        let isDivisible = true;

        for (let i=min; i<=max; i++) if (n % i !== 0)
            isDivisible = false;

        if (isDivisible === true && n < smallestMultiple) {
            smallestMultiple = n
        }
    }

    return smallestMultiple
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
            input: [1,10],
            answer: 2520
        },
        {   // 2
            input: [1,20],
            answer: 232792560
        },
    ]
);