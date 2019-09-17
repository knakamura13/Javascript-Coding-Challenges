function isPalindrome(n) {
    let str = n.toString();
    let strReversed = str.split("").reverse().join("");

    if (str === strReversed)
        return true;
    return false;
}

/*
    Project Euler 004
    Largest Palindrome Sum

    A palindromic number reads the same both ways.
    The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.

    Find the largest palindrome made from the product of two 3-digit numbers.
 */
function solution() {
    // Define the minimum and maximum values for each factor of the palindrome.
    let min = arguments[0];
    let max = arguments[1];

    let largestPalindrome = 0;

    for (let i=min; i<=max; i++) {
        for (let j=min; j<=max; j++) {
            let product = i * j;
            // Check if this is the largest palindrome so far.
            // Note: protect against race conditions by comparing each product to `largestPalindrome`.
            if (isPalindrome(product) && product > largestPalindrome) {
                largestPalindrome = product;
            }
        }
    }

    return largestPalindrome
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
            input: [10, 99],
            answer: 9009
        },
        {   // 2
            input: [100, 999],
            answer: 906609
        },
    ]
);