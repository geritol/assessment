import {
  singleDigitsToString,
  teenNumbers,
  tens,
  largeNumbers
} from "./mappings"

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
  if (inputNumber < 100) {
    if (inputNumber % 10 === 0) {
      return tens[inputNumber]
    }
    const tensPlace = Math.floor(inputNumber / 10) * 10
    const onesPlase = inputNumber % 10
    return `${tens[tensPlace]}-${singleDigitsToString[onesPlase]}`
  }
  // LARGE NUMBERS (> 99)
  for (let i = 0; i < largeNumbers.length; i++) {
    const current = largeNumbers[i]
    const upperEnd = current.end || largeNumbers[i + 1].start
    if (inputNumber >= upperEnd) {
      continue
    }

    const { start: lowerEnd, spellOut, delimiter } = current
    const biggestPlace = Math.floor(inputNumber / lowerEnd)
    const biggestPlaceString = `${spellOutNumber(biggestPlace)} ${spellOut}`

    if (inputNumber % lowerEnd === 0) {
      return biggestPlaceString
    }
    const rest = inputNumber - biggestPlace * lowerEnd
    return `${biggestPlaceString}${delimiter}${spellOutNumber(rest)}`
  }
  throw new Error(
    `Inputted number (${inputNumber}) is larger than the biggest supported number (${largeNumbers[
      largeNumbers.length - 1
    ] - 1})`
  )
}
