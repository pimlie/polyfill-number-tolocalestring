export { polyfill, polyfillSync } from '../../src'
export locales from './locales'

export const original = Number.prototype.toLocaleString

// fill-icu uses 202f, cldr uses 00a0. Replace both with normal space
export const noBreakSpaceRegex = new RegExp('[\u202f\u00a0]', 'g')

export const compareToOriginal = function compareToOriginal(num, locale, options = {}) {
  it(`should format ${num} as ${options.style || 'decimal'} in ${locale}`, () => {
    const thisImplementation = num.toLocaleString(locale, options).replace(noBreakSpaceRegex, ' ')
    const originalImplementation = original.call(num, locale, options).replace(noBreakSpaceRegex, ' ')
    expect(thisImplementation).toBe(originalImplementation)
  })
}
