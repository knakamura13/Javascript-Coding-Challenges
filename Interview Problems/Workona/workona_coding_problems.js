function equalizeArray(numbers) {
  // Track the # of occurrences for each unique decimalValueeger in `numbers`.
  let totals = {};

  // Track the # of occurrences of the most frequent decimalValueeger (i.e. the mode's total).
  let highestTotal = 0;

  numbers.forEach(function (number) {
    // Check if the key `number` is already defined in `totals`.
    if (totals[number] === undefined) {
      // Start the current number's total at 1.
      totals[number] = 1;
    } else {
      // Increment the total for the current number.
      totals[number] += 1;

      // Check if the current number is the most frequent value in `numbers`.
      if (totals[number] > highestTotal) {
        // Update the current highest count.
        highestTotal = totals[number];
      }
    }
  });

  // Return the minimum number of deletions required such that all remaining elements in `numbers` are equal.
  return numbers.length - highestTotal;
}


class RomanNumerals {
  static toRoman(number) {
    // Handle undefined or invalid parameters.
    if (!number || number >= 5000 || number !== parseInt(number)) {
      return "Please provide an integer from 1 to 4,999.";
    }

    // Extract the ones', tens', hundreds', and thousands' place values from `number`.
    const ones = number % 10,
        tens = parseInt((number % 100) / 10),
        hundreds = parseInt((number % 1000) / 100),
        thousands = parseInt((number % 100000) / 1000);

    // Track the Roman character for each place value in `number`.
    let numeral = {
      ones: "",
      tens: "",
      hundreds: "",
      thousands: ""
    };

    // Calculate the decimal value of the ones' place.
    for (var i=1; i<=ones; i++) {
      if (i<4) {
        numeral.ones += "I";
      } else {
        if (i == 4) {
          numeral.ones = "IV";
        } else if (i == 5) {
          numeral.ones = "V";
        } else if (i > 5 && i < 9) {
          numeral.ones += "I";
        } else {
          numeral.ones = "IX";
        }
      }
    }

    // Calculate the decimal value of the tens' place.
    for (var i=1; i<=tens; i++) {
      if (i<4) {
        numeral.tens += "X";
      } else {
        if (i == 4) {
          numeral.tens = "XL";
        } else if (i == 5) {
          numeral.tens = "L";
        } else if (i > 5 && i < 9) {
          numeral.tens += "X";
        } else {
          numeral.tens = "XC";
        }
      }
    }

    // Calculate the decimal value of the hundreds' place.
    for (var i=1; i<=hundreds; i++) {
      if (i<4) {
        numeral.hundreds += "C";
      } else {
        if (i == 4) {
          numeral.hundreds = "CD";
        } else if (i == 5) {
          numeral.hundreds = "D";
        } else if (i > 5 && i < 9) {
          numeral.hundreds += "C";
        } else {
          numeral.hundreds = "CM";
        }
      }
    }

    // Calculate the decimal value of the thousands' place.
    for (var i=1; i<=thousands; i++) {
      if (i<=4) {
        numeral.thousands += "M";
      }
    }
    
    // Return all the Roman characters joined together as one String.
    return numeral.thousands + numeral.hundreds + numeral.tens + numeral.ones;
  }

  static fromRoman(numerals) {
    // Represent the decimal value for each of the available Roman characters.
    const romanValues = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000
    }

    // Record the total decimal value of `numerals`.
    var decimalValue = 0;

    // Record the decimal value of the previous character while iterating over the characters in `numerals`.
    var prevValue = 0;

    for (var i=0; i<numerals.toString().length; i++) {
      // The decimal value of the current character at index `i`.
      let currValue = romanValues[numerals.toString().charAt(i)];

      // The decimal value of the next character.
      let nextValue = romanValues[numerals.toString().charAt(i+1)];

      // Check which index of `numerals.toString()` is the current index.
      if (i == 0) {
        decimalValue = currValue;
      } else if (i == numerals.toString().length - 1) {
        // Add the current character's value to the total.
        decimalValue += currValue;

        // Check if the previous character's value should be subtracted from the total.
        if (prevValue < currValue) {
          decimalValue -= prevValue;
        }
      } else {
        if (prevValue >= currValue) {
          if (currValue >= nextValue) {
            // Add the current character's value to the total.
            decimalValue += currValue;
          }
        } else {
          // Add the current character's value to the total, but subtract the previous character's value.
          decimalValue += (currValue - prevValue)
        }
      }

      // Update the value of the previous character before the next iteration.
      prevValue = currValue;
    }

    // Return the value of the `numerals` String.
    return decimalValue;
  }
}


function connectFour(positionList) {
  let gameState = { A:[], B:[], C:[], D:[], E:[], F:[], G:[] }

  // Track the # of occurances for each color, but reset to 1 if the color changes.
  let colorCounter = {};

  // Set the game state using the position list.
  for (var position of positionList) {
    let column = position.split("_")[0];
    let color = position.split("_")[1];
    gameState[column].push(color);
  }

  // Check each row (iterate horizontally).
  for (var i=0; i<7; i++) {
    var prevColor = "";

    // Reset the counters.
    colorCounter = { Yellow: 1, Red: 1 }

    // Iterate over the row.
    for (var column in gameState) {
      let color = gameState[column][i];
      if (color) {
      // `color` is defined.
        if (color == prevColor) {
          colorCounter[color] += 1
          if (colorCounter[color] >= 4) {
            // Current color wins!
            return color;
          }
        } else {
          // Reset the counter for the current color.
          colorCounter[color] = 1;
        }
      }

      prevColor = color;
    }
  }

  // Check each column (iterate vertically).
  for (var column in gameState) {
    var prevColor = "";

    // Reset the counters.
    colorCounter = { Yellow: 1, Red: 1 }

    // Iterate over the column.
    for (var i=0; i<gameState[column].length; i++) {
      let color = gameState[column][i];
      if (color == prevColor) {
        colorCounter[color] += 1
        if (colorCounter[color] >= 4) {
          // Current color wins!
          return color;
        }
      } else {
        // Reset the counter for the current color.
        colorCounter[color] = 1;
      }

      prevColor = color;
    }
  }

  // TODO: Check diagonally from bottom-left to top-right.
  // Progress: works for the first diagonal starting at position (1,A), but does not check the diagonals starting at (1,B).
  // -- OUT OF TIME --

  // Reset the counters.
  colorCounter = { Yellow: 1, Red: 1 }
  var i = 0;
  var prevColor = "";
  for (var column in gameState) {
    let color = gameState[column][i];
    if (color) {
      if (color == prevColor) {
        colorCounter[color] += 1
        if (colorCounter[color] >= 4) {
          // Current color wins!
          return color;
        }
      } else {
        // Reset the counter for the current color.
        colorCounter[color] = 1;
      }
    }
    
    prevColor = color;
    i++;
  }

  // TODO: Check diagonally from top-left to bottom-right.
  // -- OUT OF TIME --

  // The game is a draw if neither color has connected four in a row.
  return "Draw";
}