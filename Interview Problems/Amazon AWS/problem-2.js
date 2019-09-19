/*
    Amazon Assessment #2
    Test ID: 23280666374694
 */
function solution() {
    const arg1 = arguments[0],
        arg2 = arguments[1];

    let solution = 0;

    // Remember to comment.


    return solution
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
            input: [1,2,3],
            answer: 0
        },
    ]
);