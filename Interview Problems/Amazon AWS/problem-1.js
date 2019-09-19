/*
	Input
		String	order	represents the order ID followed by its metadata.

	Output
		Boolean N/A		whether the given order is an Amazon Prime order.
 */
function isPrimeOrder(order) {
	// Turn the String into a list of metadata, removing the 0th element (the ID).
	let orderList = order.split(" ").slice(1, order.length);

	let metadataContainsLetters = false;

	// Iterate over the list of metadata Strings.
	orderList.forEach((orderStr) => {
		// Iterate over the characters in the String.
		for (let i=0; i<orderStr.length; i++) {
			// Get the character at index `i` of `orderStr`.
			let currChar = orderStr.charAt(i);

			// Check if the character is non-numeric (letter).
			if (isNaN(currChar))
				metadataContainsLetters = true;
		}
	});

	// Return true if the metadata contained no numbers.
	return metadataContainsLetters
}

/*
	Custom sorting algorithm to compare the metadata of orders,
	ignoring the 0th element (order ID) of each order.
*/
function compareMetadata(a, b) {
	// Remove the 0th element (order ID) from each order, converted back into a String afterwards.
	const metadataA = a.split(" ").slice(1, a.length).join(" "),
		metadataB = b.split(" ").slice(1, b.length).join(" ");

	// Decide which order is alpha-numerically greater.
	if (metadataA < metadataB)
		return -1;
	if (metadataA > metadataB)
		return 1;

	// Falling back to comparing by ID since the metadata is identical.
	// Get the 0th element of the order, which is the ID.
	const orderIDA = a.split(" ")[0],
		orderIDB = b.split(" ")[0];

	// Decide which ID is alpha-numerically greater.
	if (orderIDA < orderIDB)
		return -1;
	if (orderIDA > orderIDB)
		return 1;

	// Edge case: return 0 if the orders and their IDs are identical.
	return 0;
}

/*
    Amazon Assessment #1
 	Test ID: 23280666374694

 	Order Optimization Algorithm
 */
function solution() {
    const numOrders = arguments[0],
        orderList = arguments[1];

    // List of strings representing the correctly prioritized orders.
    let prioritizedOrders = [];

	// 1. First priority goes to Prime orders.
	// 2. Second priority goes to the Order ID if the orders tied in ranking.
	// Iterate over each order (String) in the `orderList` array.
	orderList.forEach((order) => {
		if (isPrimeOrder(order)) {
			// Add the Prime order to the list.
			prioritizedOrders.push(order)
		}
	});

	// Sort the list which now contains only Prime orders using a custom comparison function.
	prioritizedOrders = prioritizedOrders.sort(compareMetadata);

	// 3. Add all non-Prime orders to the list in their original order.
	orderList.forEach((order) => {
		if (isPrimeOrder(order) === false) {
			// Add the non-Prime order to the list.
			prioritizedOrders.push(order)
		}
	});

	// Return the list of strings representing the correctly prioritized orders.
    return prioritizedOrders
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
            input: [6,
				[
					"zld 93 12",
					"fp kindle book",
					"10a echo show",
					"17g 12 25 6",
					"abl kindle book",
					"125 echo dot second generation"
				]
			],
            answer: [
            	"125 echo dot second generation",
				"10a echo show",
				"abl kindle book",
				"fp kindle book",
				"zld 93 12",
				"17g 12 25 6",
			]
        },
    ]
);