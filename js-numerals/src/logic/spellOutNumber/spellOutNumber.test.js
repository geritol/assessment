import { spellOutNumber } from "./spellOutNumber"

const spellOutMacro = (input, expectedValue) => {
  const actualValue = spellOutNumber(input)
  expect(actualValue).toEqual(expectedValue)
}

describe("spellOutNumber", () => {
  test("throws error if called with a non integer value", () => {
    expect(() => spellOutNumber(1.1)).toThrow()
  })
  test("throws error if called with a negative", () => {
    expect(() => spellOutNumber(-1)).toThrow()
  })
  describe("single digit tests", () => {
    test("1 is one", spellOutMacro.bind(this, 1, "one"))
    test("2 is two", spellOutMacro.bind(this, 2, "two"))
    test("3 is three", spellOutMacro.bind(this, 3, "three"))
    test("4 is four", spellOutMacro.bind(this, 4, "four"))
    test("5 is five", spellOutMacro.bind(this, 5, "five"))
    test("6 is six", spellOutMacro.bind(this, 6, "six"))
    test("7 is seven", spellOutMacro.bind(this, 7, "seven"))
    test("8 is eight", spellOutMacro.bind(this, 8, "eight"))
    test("9 is nine", spellOutMacro.bind(this, 9, "nine"))
  })
  describe("single digit tests", () => {
    test("10 is ten", spellOutMacro.bind(this, 10, "ten"))
    test("11 is eleven", spellOutMacro.bind(this, 11, "eleven"))
    test("12 is twelve", spellOutMacro.bind(this, 12, "twelve"))
    test("13 is thirteen", spellOutMacro.bind(this, 13, "thirteen"))
    test("14 is fourteen", spellOutMacro.bind(this, 14, "fourteen"))
    test("15 is fifteen", spellOutMacro.bind(this, 15, "fifteen"))
    test("16 is sixteen", spellOutMacro.bind(this, 16, "sixteen"))
    test("17 is seventeen", spellOutMacro.bind(this, 17, "seventeen"))
    test("18 is eighteen", spellOutMacro.bind(this, 18, "eighteen"))
    test("19 is nineteen", spellOutMacro.bind(this, 19, "nineteen"))
  })
})
