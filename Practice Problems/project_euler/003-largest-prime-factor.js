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

/*
    Project Euler 003
    Largest Prime Factor

    The prime factors of 13195 are 5, 7, 13 and 29.

    What is the largest prime factor of the number 600851475143?
 */
function solution() {
    // Sets the number that we need to factor.
    let num = arguments[0];

    // Tracks the largest prime factor found so far.
    let largestPrimeFactor = 3;

    // For every integer between 3 and `num`.
    for (let i=3; i<Math.floor(Math.sqrt(num)); i+=2) {
        // Check if the integer is a prime number and a factor of `num`.
        if (isPrime(i) && num % i === 0) {
            // Update the largest prime factor.
            largestPrimeFactor = i;
        }
    }

    return largestPrimeFactor
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
            input: [13195],
            answer: 29
        },
        {   // 2
            input: [600851475143],
            answer: 6857
        },
    ]
);