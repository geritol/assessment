const singleDigitsToString = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine"
}

const teenNumbers = {
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen"
}

/*
 *  Returns the inputtend number in its english written form
 *  Integer -> String
 */
export const spellOutNumber = inputNumber => {
  if (inputNumber < 0 || !Number.isInteger(inputNumber)) {
    throw new Error("please input a positive integer")
  }
  if (inputNumber < 10) {
    return singleDigitsToString[inputNumber]
  }
  if (inputNumber < 20) {
    return teenNumbers[inputNumber]
  }
}
