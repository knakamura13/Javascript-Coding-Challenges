/*
 Amazon Assessment #2
 Test ID: 23280666374694

 0 = Trench
 1 = Flat Area
 9 = Obstacle

 Robot starts in top-left corner (always a 1).
 Robot cannot enter trenches or leave the lot.
 Robot must remove the obstacle (9).
 Robot can move one block at a time.

 Returns the minimum distance traveled from start (0,0) to obstacle.
 */
function solution() {
	const numRows = arguments[0],
		numColumns = arguments[1],
		lot = arguments[2];

	// Create a copy of the initial lot state.
	let robotState = {
		position: {
			x: 0,
			y: 0
		}
	};

	// TODO: Implement back-tracking to prevent dead-end problems.
	let pathTraversed = [];

	let visited = [];

	let minimumDistanceTraversed = 0;

	// Traverse using breadth first search until the robot's position is at the obstacle.
	while (lot[robotState.position.y][robotState.position.x] !== 9 && minimumDistanceTraversed <= 9999) {
		let didMove = false;
		let nextState;

		// Try to move right once.
		if (!didMove && lot[robotState.position.y][robotState.position.x + 1]) {
			nextState = Object.create(robotState);
			nextState.position.x += 1;

			if (!visited.includes(nextState)) {
				visited.push(nextState);
				robotState = nextState;
				didMove = true;
			} else {
				nextState = Object.create(robotState);
			}
		}
		// Try to move down once.
		if (!didMove && lot[robotState.position.y + 1][robotState.position.x]) {
			nextState = Object.create(robotState);
			nextState.position.y += 1;

			if (!visited.includes(nextState)) {
				visited.push(nextState);
				robotState = nextState;
				didMove = true;
			} else {
				nextState = Object.create(robotState);
			}
		}
		// Try to move left once.
		if (!didMove && lot[robotState.position.y][robotState.position.x - 1]) {
			nextState = Object.create(robotState);
			nextState.position.x -= 1;

			if (!visited.includes(nextState)) {
				visited.push(nextState);
				robotState = nextState;
				didMove = true;
			} else {
				nextState = Object.create(robotState);
			}
		}
		// Try to move up once.
		if (!didMove && lot[robotState.position.y - 1][robotState.position.x]) {
			nextState = Object.create(robotState);
			nextState.position.y -= 1;

			if (!visited.includes(nextState)) {
				visited.push(nextState);
				robotState = nextState;
				didMove = true;
			} else {
				nextState = Object.create(robotState);
			}
		}

		if (!didMove) {
			nextState = Object.create(robotState);
			nextState.position.y -= 1;
			robotState = nextState;
		}

		//
		// if (lot[robotState.position.y][robotState.position.x + 1] !== 0 && lot[robotState.position.y][robotState.position.x + 1] && lot[robotState.position.y][robotState.position.x + 1]) {
		// 	robotState.position.x += 1;
		// 	visited.push(robotState.position);
		// 	console.log("moved right");
		// }
		//
		// // Try to move down once.
		// else if (lot[robotState.position.y + 1][robotState.position.x] !== 0 && lot[robotState.position.y + 1][robotState.position.x]) {
		// 	robotState.position.y += 1;
		// 	visited.push(robotState.position);
		// 	console.log("moved down");
		// }
		//
		// // Try to move left once.
		// else if (lot[robotState.position.y][robotState.position.x - 1] !== 0 && lot[robotState.position.y][robotState.position.x - 1]) {
		// 	robotState.position.x -= 1;
		// 	visited.push(robotState.position);
		// 	console.log("moved left");
		// }
		//
		// // Try to move up once.
		// else if (lot[robotState.position.y - 1][robotState.position.x] !== 0 && lot[robotState.position.y - 1][robotState.position.x]) {
		// 	robotState.position.y -= 1;
		// 	visited.push(robotState.position);
		// 	console.log("moved up");
		// }

		// TODO: If at dead-end (made it this far without moving),
		//       back-track to the most recent fork in the path.

		minimumDistanceTraversed += 1
	}
	console.log(visited);

	if (minimumDistanceTraversed >= 9999)
		minimumDistanceTraversed = -1;

	// Return the minimum distance traversed if it is less than 9999;
	// otherwise, return -1 indicating the robot did not remove the obstacle.
	return minimumDistanceTraversed;
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
			input: [3, 3, [
				[1, 0, 0],
				[1, 0, 0],
				[1, 9, 1]
			]],
			answer: 3
		},
		{   // 2
			input: [7, 7, [
				[1, 1, 1, 1, 1, 1, 0],
				[0, 0, 0, 0, 0, 1, 0],
				[0, 1, 1, 1, 0, 1, 0],
				[0, 1, 0, 1, 1, 1, 0],
				[0, 1, 0, 0, 0, 0, 0],
				[0, 1, 1, 0, 1, 1, 1],
				[0, 0, 1, 1, 1, 0, 9]
			]],
			answer: 24
		},
	]
);