// Q: Given a set of meetings for a calendar stored in a binary search tree by date time,
// write a function to return an ordered list of meetings that fall in a given time range.

/*
 Date3 (15)
 Date1 (5)           Date5 (20)
 Date0  Date2 (11)    Date4  Date6
 */

/*
 startTime,
 endTime

 return all node (values) that are within the start-end range.
 */

/*
 Example
 start   = 10
 end     = 20
 Date3   = 15

 Date1   = 5
 Date2 = 11

 Date5 = 20
 Date6 = 25

 start < 15

 // Traverse from root node (Date3) left if left.val < start, right if left.val > start

 // In this example, Date2 - Date5 are in range 10, 20
 */

function inRange(node, start, end) {
	// Start, end already defined
	if (node.val >= start && node.val <= end || node.val <= end && node.val <= end) {
		return true;
	}
	return false;
}

function solution(tree, root, start, end) {
	// Track nodes that are within the range between start,end
	let timesInRange = [];   // [Date3, Date5, Date2]

	// First, check if root node is in the range.
	if (inRange(root.val)) {
		timesInRange.append(root)
	}

	// Recursive traversal.
	navigateTree(root);

	// Return the list of nodes (times) that fall within the given range (start to end).
	return timesInRange;
}

// currNode = Date5 (11)    // should be in array.
function navigateTree(currNode) {
	let val = currNode.val;
	let left = currNode.left;
	let right = currNode.right;

	// Check if left is within the range
	if (inRange(left, start, end)) {
		timesInRange.append(left);
		navigateTree(left)
	}
	// Check if right is within the range
	if (inRange(right, start, end)) {
		timesInRange.append(right);
		navigateTree(right)
	}
}


/*  tree:
 Date3 (15)
 Date1 (5)           Date5 (20)
 Date0  Date2 (11)    Date4  Date6
 */
// root = Date3

let tree = [];  // assume tree is defined
let root = []; // assume defined
solution(tree, root, 10, 20);
