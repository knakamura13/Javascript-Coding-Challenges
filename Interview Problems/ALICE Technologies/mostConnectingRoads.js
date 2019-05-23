/*
    Takes two arrays of cities and returns the collection of cities with the most roads between them.
 */
function mostConnectingRoads(A, B) {
    let highestScorePath = new Set();
    let connections = new Set();
    let visited = new Set();

    for (let i = 0; i < A.length; i++) {
        let a = A[i],
            b = B[i];

        // Create a road (Set) connecting `a` and `b`.
        let connection = new Set([a, b]);

        // Check if either city is attached to a preceding city OR if there are no roads yet.
        if (visited.has(a) || visited.has(b) || visited.size < 1) {
            connections.add(connection);

            // Update the path with the highest score.
            if (connections.size > highestScorePath.size)
                highestScorePath = connections;
        } else {
            // Reset `connections` and `visited` indicating that a disconnected path has started.
            connections = new Set([connection]);
            visited = new Set();
        }

        // Record that both of these cities have been visited.
        visited.add(a).add(b);
    }

    // Return the highest scoring path between the cities in `A` and `B`.
    return highestScorePath.size;
}

function main() {
    // Get the parameters from `arguments`.
    let citiesA = arguments[0];
    let citiesB = arguments[1];

    // Solve the problem.
    return mostConnectingRoads(citiesA, citiesB);
}

function runTests(func, tests) {
    let passed = 0;
    let failed = 0;

    for (let i = 0; i < tests.length; i++) {
        let test = tests[i];
        let result = func(...test.input);

        if (result === test.answer) {
            console.log(`${i + 1}: PASS`);
            passed += 1;
        } else {
            console.log(`${i + 1}: FAIL  -->  (Got: ${result}, Expected: ${test.answer})`);
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
                [1, 2, 3, 4],
                [2, 3, 1, 3]
            ],
            answer: 4
        },
        {   // 2
            input: [
                [1, 2, 4, 5, 6],
                [2, 3, 5, 6, 7]
            ],
            answer: 3
        },
    ]
);