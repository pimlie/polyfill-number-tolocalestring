import '@babel/polyfill'

// Feature detection from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
const toLocaleStringSupportsLocales = () => {
  const number = 0

  try {
    number.toLocaleString('i')
  } catch (e) {
    return e.name === 'RangeError'
  }

  return false
}

const toLocaleStringSupportsOptions = () => !!(typeof Intl === 'object' && Intl && typeof Intl.NumberFormat === 'function')

const shouldPolyfill = (force = false) => {
  return !(!force && toLocaleStringSupportsLocales() && toLocaleStringSupportsOptions())
}

const setPolyfill = (Globalize, cldrData) => {
  const original = Number.prototype.toLocaleString
  const loadedCldrKeys = {}
  const loadCldrData = function loadCldrData(keys) {
    let keysLoaded = 0

    keys.forEach((key) => {
      if (loadedCldrKeys[key]) {
        keysLoaded++
      }
    })

    if (keys.length === keysLoaded) {
      return true
    }

    try {
      const allData = []
      for (const key of keys) {
        if (!loadedCldrKeys[key]) {
          const data = cldrData(key)

          if (!data) {
            break
          } else {
            allData.push(data)
          }
        }
      }

      if (allData.length) {
        Globalize.load(...allData)
      }

      return keys.length === (keysLoaded + allData.length)
    } catch (e) {
      return false
    }
  }

  if (loadCldrData([
    'supplemental/likelySubtags',
    'supplemental/numberingSystems'
  ])) {
    const loadedLocales = {}

    Number.prototype.toLocaleString = function toLocaleString(lcl, opts) {
      const locale = lcl || 'en'
      const options = Object.assign({ style: 'decimal' }, opts)

      const showCurrency = options.style === 'currency' && loadCldrData([
        'supplemental/currencyData',
        'supplemental/plurals'
      ])

      if (!loadedLocales[locale]) {
        const loadLocales = [locale]
        for (const loadLocale of loadLocales) {
          const keys = [`main/${loadLocale}/numbers`]
          if (showCurrency) {
            keys.push(`main/${loadLocale}/currencies`)
          }

          if (loadCldrData(keys)) {
            loadedLocales[locale] = true
            break
          } else if (loadLocales.length === 1) {
            const globalize = Globalize(locale)
            Array.prototype.push.apply(loadLocales, [
              globalize.cldr.attributes.maxLanguageId,
              globalize.cldr.attributes.minLanguageId,
              globalize.cldr.attributes.bundle
            ].filter(v => !!v && !loadLocales.includes(v)))
          }
        }
      }

      if (!loadedLocales[locale]) {
        return this.toString()
      }

      let formatter
      if (showCurrency) {
        const currencyOptions = Object.assign(options, {
          style: options.currencyDisplay
        })
        formatter = Globalize(locale).currencyFormatter(options.currency, currencyOptions)
      } else {
        formatter = Globalize(locale).numberFormatter(options)
      }

      return formatter(this.valueOf())
    }
  }

  return () => {
    Number.prototype.toLocaleString = original
  }
}

export const polyfillSync = function polyfillSync(force = false) {
  if (!shouldPolyfill(force)) {
    return false
  }

  const Globalize = require('globalize')
  const cldrData = require('cldr-data')

  return setPolyfill(Globalize, cldrData)
}

export const polyfill = async function polyfill(force = false) {
  if (!shouldPolyfill(force)) {
    return false
  }

  const Globalize = (await import('globalize')).default
  const cldrData = (await import('cldr-data')).default

  return setPolyfill(Globalize, cldrData)
}

export default polyfill
