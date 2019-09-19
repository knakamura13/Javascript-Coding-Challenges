/*
    Amazon Online Demo Assessment #1

    Eight houses, represented as cells, are arranged in a straight line.
    Each day every cell competes with its adjacent cells (neighbors).

    An integer value of 1 represents an active cell and a value of 0 represents an inactive cell.
    If the neighbors on both the sides of a cell are either active or inactive,
    the cell becomes inactive on the next day; otherwise the cell becomes active.

    The two cells on each end have a single adjacent cell,
    so assume that the unoccupied space on the opposite side is an inactive cell.

    Even after updating the cell state, consider its previous state when updating the state of other cells.
    The state information of all cells should be updated simultaneously.

    Write an algorithm to output the state of the cells after the given number of days.

    Input
        states      a list of integers representing the current state of cells
        days        an integer representing the number of days

    Output
        Returns     a list of integers representing the state of the cells after the given number of days.

    Note
        The elements of the list `states` contains 0s and 1s only.
 */
function solution() {
    let states = arguments[0],
        days = arguments[1],
        tempStates = states.slice();    // Slice copies the array.

    // Once per day.
    for (let day=0; day<days; day++) {
        // Check the state of each house.
        for (let i = 0; i < states.length; i++) {
            // Get the states of the house and its two neighbors.
            let curr = states[i],
                prev = states[i - 1],
                next = states[i + 1];

            if (prev === undefined)
                prev = 0;
            if (next === undefined)
                next = 0;

            // Decide what to do with the current house.
            if (prev === next) {
                // Neighbors are equal.
                tempStates[i] = 0;   // Current becomes inactive.
            } else {
                // Neighbors are different.
                tempStates[i] = 1;   // Current becomes active.
            }
        }

        // Replace the old states with the newly calculated states.
        states = tempStates.slice();    // Slice copies the array.
    }

    // Return the final states as a string.
    const finalStates = tempStates.join(" ");
    return finalStates
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
            input: [[1, 0, 0, 0, 0, 1, 0, 0], 1],
            answer: "0 1 0 0 1 0 1 0"
        },
        {   // 2
            input: [[1, 1, 1, 0, 1, 1, 1, 1], 2],
            answer: "0 0 0 0 0 1 1 0"
        },
        {   // 3
            input: [[1, 0, 1, 0, 1, 0, 0, 1], 1],
            answer: "0 0 0 0 0 1 1 0"
        },
    ]
);