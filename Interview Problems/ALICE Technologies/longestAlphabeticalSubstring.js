/*
    Find the smallest amount of letters that must be removed to make string S alphabetically sorted.
 */
function longestAlphabeticalSubstring(str) {
    let subStr = "";
    let highestValue = "";

    // For each letter in string.
    for (let i = 0; i < str.length; i++) {
        // If (letter is first and smaller than next) OR (letter is greater than previous).
        if ((i == 0 && str[i] <= str[i + 1]) || (str[i] >= highestValue)) {
            subStr += str[i];       // Append to longest alphabetical sub-string.
            highestValue = str[i];  // Update highest-value letter since we found a "bigger" letter.
        }
    }

    return subStr;
}

function main() {
    // Get the parameters from `arguments`.
    let S = arguments[0];

    // Solve the problem.
    return S.length - longestAlphabeticalSubstring(S);
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
    func = main,
    tests = [
        {   // 1
            input: [
                "abcd",
            ],
            answer: 0
        },
        {   // 2
            input: [
                "acdc",
            ],
            answer: 1
        },
        {   // 3
            input: [
                "ababa",
            ],
            answer: 2
        },
        {   // 4
            input: [
                "abczyxabc",
            ],
            answer: 5
        },
        {   // 5
            input: [
                "xyxyabxycd",
            ],
            answer: 6
        },
        {   // 6
            input: [
                "banana",
            ],
            answer: 3
        },
        {   // 7
            input: [
                "zyxwvutsrqponmlkjihgfedcba",
            ],
            answer: 25
        },
    ]
);