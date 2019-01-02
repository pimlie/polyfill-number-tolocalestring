import { polyfill, locales, compareToOriginal } from './helpers'

// Some of these tests fails due to differences between full-icu and globalize+cldr-data

describe('Test currency', () => {
  polyfill(true)

  let num = 2
  while (num < Number.MAX_SAFE_INTEGER - 9) {
    locales.forEach((locale) => {
      compareToOriginal(num, locale, {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
      })
      compareToOriginal(num, locale, {
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'code'
      })
      compareToOriginal(num, locale, {
        style: 'currency',
        currency: 'JPY',
        currencyDisplay: 'name'
      })
    })

    num *= 10
  }
})
