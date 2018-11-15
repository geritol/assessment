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
  describe("integers bigger than 19 but smaller than 100", () => {
    describe("tens", () => {
      test("20 is twenty", spellOutMacro.bind(this, 20, "twenty"))
      test("30 is thirty", spellOutMacro.bind(this, 30, "thirty"))
      test("40 is forty", spellOutMacro.bind(this, 40, "forty"))
      test("50 is fifty", spellOutMacro.bind(this, 50, "fifty"))
      test("60 is sixty", spellOutMacro.bind(this, 60, "sixty"))
      test("70 is seventy", spellOutMacro.bind(this, 70, "seventy"))
      test("80 is eighty", spellOutMacro.bind(this, 80, "eighty"))
      test("90 is ninety", spellOutMacro.bind(this, 90, "ninety"))
    })
    test("21 is twenty-one", spellOutMacro.bind(this, 21, "twenty-one"))
    test("32 is thirty-two", spellOutMacro.bind(this, 32, "thirty-two"))
    test("43 is forty-three", spellOutMacro.bind(this, 43, "forty-three"))
    test("54 is fifty-four", spellOutMacro.bind(this, 54, "fifty-four"))
    test("65 is sixty-five", spellOutMacro.bind(this, 65, "sixty-five"))
    test("76 is seventy-six", spellOutMacro.bind(this, 76, "seventy-six"))
    test("87 is eighty-seven", spellOutMacro.bind(this, 87, "eighty-seven"))
    test("98 is ninety-eight", spellOutMacro.bind(this, 98, "ninety-eight"))
    test("99 is ninety-nine", spellOutMacro.bind(this, 99, "ninety-nine"))
  })
  describe("integers bigger than 99", () => {
    test("100 is one hundred", spellOutMacro.bind(this, 100, "one hundred"))
    test(
      "242 is two hundred and forty-two",
      spellOutMacro.bind(this, 242, "two hundred and forty-two")
    )
    test(
      "999 is nine hundred and ninety-nine",
      spellOutMacro.bind(this, 999, "nine hundred and ninety-nine")
    )
    test("1000 is one thousand", spellOutMacro.bind(this, 1000, "one thousand"))
    test(
      "2001 is two thousand and one",
      spellOutMacro.bind(this, 2001, "two thousand and one")
    )
    test(
      "999000 is nine hundred and ninety-nine thousand",
      spellOutMacro.bind(this, 999000, "nine hundred and ninety-nine thousand")
    )
    test(
      "999999 is nine hundred and ninety-nine thousand and nine hundred and ninety-nine",
      spellOutMacro.bind(
        this,
        999999,
        "nine hundred and ninety-nine thousand and nine hundred and ninety-nine"
      )
    )
    test(
      "1000000 is one million",
      spellOutMacro.bind(this, 1000000, "one million")
    )
    test(
      "11000000 is one million",
      spellOutMacro.bind(this, 11000000, "eleven million")
    )
    test(
      "999999999 is nine hundred and ninety-nine million, nine hundred and ninety-nine thousand and nine hundred and ninety-nine",
      spellOutMacro.bind(
        this,
        999999999,
        "nine hundred and ninety-nine million, nine hundred and ninety-nine thousand and nine hundred and ninety-nine"
      )
    )
  })
})
