import { polyfill, locales, compareToOriginal } from './helpers'

describe('Test numbers', () => {
  polyfill(true)

  let num = 1
  while (num < Number.MAX_SAFE_INTEGER - 9) {
    locales.forEach((locale) => {
      compareToOriginal(num, locale)
      compareToOriginal(-num, locale)
      compareToOriginal(num + 9, locale)
      compareToOriginal(-(num + 9), locale)
    })

    num *= 10
  }
})
