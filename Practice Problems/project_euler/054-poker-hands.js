// TODO: Find the bug that causes player1 to win ~15% more often than expected.

let fs  = require("fs");

const NumericValue = {
	/* Bubble sort. */
	sort: function(cards) {
		let len = cards.length;
		for (let i = 0; i < len; i++) {
			for (let j = 0; j < len; j++) {
				let currValue = NumericValue[cards[j].split("")[0]];

				if (cards[j + 1]) {
					let nextValue = NumericValue[cards[j + 1].split("")[0]];

					if (currValue > nextValue) {
						let tmp = cards[j];
						cards[j] = cards[j + 1];
						cards[j + 1] = tmp;
					}
				}
			}
		}
		return cards;
	},
	A: 14,
	K: 13,
	Q: 12,
	J: 11,
	T: 10,
	9: 9,
	8: 8,
	7: 7,
	6: 6,
	5: 5,
	4: 4,
	3: 3,
	2: 2
};

const Hand = {
	/* Ten, Jack, Queen, King, Ace */
	isRoyal: function (cards) {
		let royalValues = "TJQKA";

		cards.forEach((card) => {
			const cardValue = card.split("")[0];
			if (royalValues.includes(cardValue))
				royalValues = royalValues.replace(cardValue, "");
		});

		return [
			royalValues.length === 0,
			undefined,
		];
	},
	/* All cards are consecutive values. */
	isStraight: function (cards) {
		let prevValue = "",
			isStraight = true;

		cards.forEach((card) => {
			const cardValue = card.split("")[0];
			if (prevValue && NumericValue[prevValue] !== NumericValue[cardValue] - 1)
				isStraight = false;
			prevValue = cardValue;
		});

		return [
			isStraight,
			NumericValue[prevValue],
		];
	},
	/* All cards of the same suit. */
	isFlush: function (cards) {
		const firstSuit = cards[0].split("")[1];
		let isFlush = true;

		cards.forEach((card) => {
			const cardSuit = card.split("")[1];
			if (cardSuit !== firstSuit)
				isFlush = false;
		});

		return [
			isFlush,
			undefined,
		];
	},
	/* Four cards of the same value. */
	isFourOfAKind: function (cards) {
		let prevValue = "",
			repeatingCount = 1,
			repeatingValue = "",
			isFourOfAKind = false;

		cards.forEach((card) => {
			const cardValue = card.split("")[0];
			if (prevValue && prevValue === cardValue) {
				repeatingCount++;
				if (repeatingCount === 4) {
					isFourOfAKind = true;
					repeatingValue = cardValue;
				}
			} else
				repeatingCount = 1;

			prevValue = cardValue;
		});

		return [
			isFourOfAKind,
			NumericValue[repeatingValue],
		];
	},
	/* Three of a kind and a pair. */
	isFullHouse: function (cards) {
		let prevValue = "",
			isFullHouse = false,
			firstPairValue = "",
			secondPairValue = "",
			repeatingCount = 1,
			repeatingValue = "";

		cards.forEach((card) => {
			const cardValue = card.split("")[0];
			if (prevValue && prevValue === cardValue) {
				repeatingCount++;

				if (firstPairValue.length === 0)
					firstPairValue = cardValue;

				if (repeatingCount === 3) {
					secondPairValue = cardValue;
					repeatingValue = cardValue;

					if (firstPairValue === secondPairValue) {
						firstPairValue = "";
						repeatingCount = 1
					}
				}

				if (firstPairValue.length > 0 && secondPairValue.length > 0)
					isFullHouse = true
			} else
				repeatingCount = 1;

			prevValue = cardValue
		});

		return [
			isFullHouse,
			NumericValue[secondPairValue],
		];
	},
	/* Three cards of the same value. */
	isThreeOfAKind: function (cards) {
		let prevValue = "",
			repeatingCount = 1,
			repeatingValue = "",
			isThreeOfAKind = false;

		cards.forEach((card) => {
			const cardValue = card.split("")[0];
			if (prevValue && prevValue === cardValue) {
				repeatingCount++;
				if (repeatingCount === 3) {
					isThreeOfAKind = true;
					repeatingValue = cardValue;
				}
			} else
				repeatingCount = 1;

			prevValue = cardValue;
		});

		return [
			isThreeOfAKind,
			NumericValue[repeatingValue],
		];
	},
	/* Two different pairs. */
	isTwoPairs: function (cards) {
		let prevValue = "",
			isTwoPairs = false,
			firstPairValue = "",
			secondPairValue = "";

		cards.forEach((card) => {
			const cardValue = card.split("")[0];
			if (firstPairValue.length === 0 && prevValue === cardValue) {
				firstPairValue = cardValue;
			} else if (secondPairValue.length === 0 && cardValue !== firstPairValue && prevValue === cardValue) {
				isTwoPairs = true;
				secondPairValue = cardValue;
			}
			prevValue = cardValue;
		});

		return [
			isTwoPairs,
			NumericValue[secondPairValue],
		];
	},
	/* Two cards of the same value. */
	isOnePair: function (cards) {
		const reversedCards = cards.reverse();
		let prevValue = "",
			repeatingValue = "",
			isOnePair = false;

		reversedCards.forEach((card) => {
			const cardValue = card.split("")[0];
			if (!isOnePair && prevValue === cardValue) {
				isOnePair = true;
				repeatingValue = cardValue;
			}
			prevValue = cardValue;
		});

		return [
			isOnePair,
			NumericValue[repeatingValue],
		];
	},
	/* Highest value card. */
	highestCard: function (cards) {
		let highestCardValue = cards[cards.length - 1].split("")[0];
		return [
			undefined,
			NumericValue[highestCardValue],
		];
	},
};

/*
	Project Euler 054
	Poker Hands

	In the card game poker, a hand consists of five cards and are ranked,
	from lowest to highest, in the following way:

	High Card: Highest value card.
	One Pair: Two cards of the same value.
	Two Pairs: Two different pairs.
	Three of a Kind: Three cards of the same value.
	Straight: All cards are consecutive values.
	Flush: All cards of the same suit.
	Full House: Three of a kind and a pair.
	Four of a Kind: Four cards of the same value.
	Straight Flush: All cards are consecutive values of same suit.
	Royal Flush: Ten, Jack, Queen, King, Ace, in same suit.

	The cards are valued in the order:
	2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.

	If two players have the same ranked hands
	then the rank made up of the highest value wins;
	for example, a pair of eights beats a pair of fives.
	But if two ranks tie, for example, both players have a pair of queens,
	then highest cards in each hand are compared (see example 4 below);
	if the highest cards tie then the next highest cards are compared, and so on.

	The file, poker.txt, contains one-thousand random hands dealt to two players.
	Each line of the file contains ten cards (separated by a single space):
	the first five are Player 1's cards and the last five are Player 2's cards.
	You can assume that all hands are valid (no invalid characters or repeated cards),
	each player's hand is in no specific order, and in each hand there is a clear winner.

	How many hands does Player 1 win?
 */
function solution() {
	let cards = arguments[0].split(" "),
		player1 = NumericValue.sort(cards.slice(0, 5)),
		player2 = NumericValue.sort(cards.slice(5, cards.length));

	// Check for automatic win by Royal Flush.
	if (Hand.isRoyal(player1)[0] && Hand.isFlush(player1)[0])
		return 1;
	else if (Hand.isRoyal(player2)[0] && Hand.isFlush(player2)[0])
		return 2;

	// Check for Straight Flush.
	if (Hand.isStraight(player1)[0] && Hand.isFlush(player1)[0]) {
		if (Hand.isStraight(player2)[0] && Hand.isFlush(player2)[0]) {
			if (Hand.isStraight(player2)[1] > Hand.isStraight(player1)[1])
				return 2;
			else if (Hand.isStraight(player2)[1] === Hand.isStraight(player1)[1])
				if (Hand.highestCard(player2)[1] > Hand.highestCard(player1)[1])
					return 2;
		}
		return 1;
	} else if (Hand.isStraight(player2)[0] && Hand.isFlush(player2)[0])
		return 2;

	// Check for Four of a Kind.
	if (Hand.isFourOfAKind(player1)[0]) {
		if (Hand.isFourOfAKind(player2)[0])
			if (Hand.isFourOfAKind(player2)[1] > Hand.isFourOfAKind(player1)[1])
				return 2;
			else if (Hand.isFourOfAKind(player2)[1] === Hand.isFourOfAKind(player1)[1])
				if (Hand.highestCard(player2)[1] > Hand.highestCard(player1)[1])
					return 2;
		return 1;
	} else if (Hand.isFourOfAKind(player2)[0])
		return 2;

	// Check for Full House.
	if (Hand.isFullHouse(player1)[0]) {
		if (Hand.isFullHouse(player2)[0])
			if (Hand.isFullHouse(player2)[1] > Hand.isFullHouse(player1)[1])
				return 2;
			else if (Hand.isFullHouse(player2)[1] === Hand.isFullHouse(player1)[1])
				if (Hand.highestCard(player2)[1] > Hand.highestCard(player1)[1])
					return 2;
		return 1;
	} else if (Hand.isFullHouse(player2)[0])
		return 2;

	// Check for Flush.
	if (Hand.isFlush(player1)[0]) {
		if (Hand.isFlush(player2)[0])
			if (Hand.isFlush(player2)[1] > Hand.isFlush(player1)[1])
				return 2;
		return 1;
	} else if (Hand.isFlush(player2)[0])
		return 2;

	// Check for Straight.
	if (Hand.isStraight(player1)[0]) {
		if (Hand.isStraight(player2)[0])
			if (Hand.isStraight(player2)[1] > Hand.isStraight(player1)[1])
				return 2;
			else if (Hand.isStraight(player2)[1] === Hand.isStraight(player1)[1])
				if (Hand.highestCard(player2)[1] > Hand.highestCard(player1)[1])
					return 2;
		return 1;
	} else if (Hand.isStraight(player2)[0])
		return 2;

	// Check for Three of a Kind.
	if (Hand.isThreeOfAKind(player1)[0]) {
		if (Hand.isThreeOfAKind(player2)[0])
			if (Hand.isThreeOfAKind(player2)[1] > Hand.isThreeOfAKind(player1)[1])
				return 2;
			else if (Hand.isThreeOfAKind(player2)[1] === Hand.isThreeOfAKind(player1)[1])
				if (Hand.highestCard(player2)[1] > Hand.highestCard(player1)[1])
					return 2;
		return 1;
	} else if (Hand.isThreeOfAKind(player2)[0])
		return 2;

	// Check for Two Pairs.
	if (Hand.isTwoPairs(player1)[0]) {
		if (Hand.isTwoPairs(player2)[0])
			if (Hand.isTwoPairs(player2)[1] > Hand.isTwoPairs(player1)[1])
				return 2;
			else if (Hand.isTwoPairs(player2)[1] === Hand.isTwoPairs(player1)[1])
				if (Hand.highestCard(player2)[1] > Hand.highestCard(player1)[1])
					return 2;
		return 1;
	} else if (Hand.isTwoPairs(player2)[0])
		return 2;

	// Check for One Pair.
	if (Hand.isOnePair(player1)[0]) {
		if (Hand.isOnePair(player2)[0])
			if (Hand.isOnePair(player2)[1] > Hand.isOnePair(player1)[1])
				return 2;
			else if (Hand.isOnePair(player2)[1] === Hand.isOnePair(player1)[1])
				if (Hand.highestCard(player2)[1] > Hand.highestCard(player1)[1])
					return 2;
		return 1;
	} else if (Hand.isOnePair(player2)[0])
		return 2;

	// Check for High Card.
	if (Hand.highestCard(player2)[1] > Hand.highestCard(player1)[1])
		return 2;

	return 1;
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

function runTestsFromFile(func, file) {
	let player1WinCount = 0;

	let lines = fs.readFileSync(file).toString().split('\n');
	lines.forEach((line) => {
		let testCase = [line];
		let result = func(...testCase);

		// Track how many games player 1 won.
		if (result === 1)
			player1WinCount++;
	});

	console.log(`\nPlayer1 won ${player1WinCount} times.`);

	console.log("Correct answer: 376.");
}

runTests(
	func = solution,
	tests = [
		{   // 1
			input: ["5H 5C 6S 7S KD 2C 3S 8S 8D TD"],
			answer: 2,
		},
		{   // 2
			input: ["5D 8C 9S JS AC 2C 5C 7D 8S QH"],
			answer: 1,
		},
		{   // 3
			input: ["2D 9C AS AH AC 3D 6D 7D TD QD"],
			answer: 2,
		},
		{   // 4
			input: ["4D 6S 9H QH QC 3D 6D 7H QD QS"],
			answer: 1,
		},
		{   // 5
			input: ["2H 2D 4C 4D 4S 3C 3D 3S 9S 9D"],
			answer: 1,
		},
		{   // 6
			input: ["3C 3D 3S 9S 9D TS JS QS KS AS"],
			answer: 2,
		},
		{   // 7
			input: ["3H 3C 3S 3D 9D 7S 8S 9S TS JS"],
			answer: 2,
		},
		{   // 8
			input: ["3H 3C 3S 3D 9D 7H 9S 7C 7S 7D"],
			answer: 2,
		},
		{   // 9
			input: ["3H 3C 4S 4D 4D 7H 9S 5C 2S 7D"],
			answer: 1,
		},
		{   // 10
			input: ["4H 4C 4S 3D 3D 2H 9S 2C 7S 7D"],
			answer: 1,
		},
	],
);

runTestsFromFile(
	func = solution,
	file = "054-poker-hands-test-cases.txt"
);