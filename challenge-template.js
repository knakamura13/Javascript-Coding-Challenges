/*
    category or group
    name

    description
 */
function solution() {
    let param1 = arguments[0];
    let param2 = arguments[1];

    return "answer"
}

function runTests(func, tests) {
    let passed = 0;
    let failed = 0;

    for (let i = 0; i < tests.length; i++) {
        let test = tests[i];
        let result = func(...test.input);

        if (result === test.answer) {
            console.log(`${i + 1}: PASS (${test.input})`);
            passed += 1
        } else {
            console.log(`${i + 1}: FAIL (${test.input})  -->  (Got: ${result}, Expected: ${test.answer})`);
            failed += 1
        }
    }

    console.log(`\n${passed} passed, ${failed} failed.`)
}

runTests(
    func = solution,
    tests = [
        {   // 1
            input: [
                "parameter 1",
                "parameter 2"
            ],
            answer: "answer"
        },
    ]
)