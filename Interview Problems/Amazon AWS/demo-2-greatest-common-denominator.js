/*
    Amazon Online Demo Assessment #2

    The greatest common divisor (GCD),
    also called highest common factor (HCF) of N numbers,
    is the largest positive integer that divides all numbers without giving a remainder.

    Write an algorithm to determine the GCD of N positive integers.

    Input
        num         an integer representing the number of positive integers (N)
        arr         a list of positive integers

    Output
        Returns     an integer representing the GCD of the given positive integers.

    Example
        Input: 5, [2,4,6,8,10]
        Output: 2
        Explanation: The largest positive integer that divides all the positive integers 2, 4, 6, 8, 10
        without a remainder is 2. So, the output is 2.
 */
function solution() {
    // Sort the original list of numbers.
    const arr = arguments[1].sort();

    // Tracks the greatest common denominator of the list of numbers.
    let greatestCommonDenominator = 0;

    // From 1 to the smallest number.
    for (let possibleDenominator=1; possibleDenominator<=arr.sort()[0]; possibleDenominator++) {
        let dividesAll = true;

        // From the first number to the last.
        arr.forEach((number) => {
            // Check if the number is divisible by this denominator.
            if (number % possibleDenominator)
                dividesAll = false;
        });

        // If the all the numbers are divisible by this denominator, update the greatest common denominator.
        if (dividesAll && possibleDenominator > greatestCommonDenominator)
            greatestCommonDenominator = possibleDenominator;
    }

    // Return the GCD of the list of numbers.
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
        {   // 2
            input: [5, [15, 30, 60, 120, 240]],
            answer: 15
        },
    ]
);