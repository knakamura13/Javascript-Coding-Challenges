/*
    Amazon Online Demo Assessment #2

    The greatest common divisor (GCD),
    also called highest common factor (HCF) of N numbers
    is the largest positive integer that divides all numbers without giving a remainder.

    Write an algorithm to determine the GCD of N positive integers.

    Input
        num         an integer representing the number of positive integers (N)
        arr         a list of positive integers

    Output
        Returns     an integer representing the GCD of the given positive integers.

    Example
        Input: 5, [2,4,6,8,20]
        Output: 2
        Explanation: The largest positive integer that divides all the positive integers 2, 4, 6, 8, 10
        without a remainder is 2. So, the output is 2.
 */
function solution() {
    const num = arguments[0],
        arr = arguments[1];

    let greatestCommonDenominator = 1;

    return greatestCommonDenominator
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
            input: [5, [2, 3, 4, 5, 6]],
            answer: 1
        },
        {   // 2
            input: [5, [2, 4, 6, 8, 10]],
            answer: 2
        },
    ]
);