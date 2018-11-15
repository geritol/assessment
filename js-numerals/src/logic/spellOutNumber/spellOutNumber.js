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
}
