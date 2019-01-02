# polyfill-number-tolocalestring

Polyfill Number.prototype.toLocaleString() with globalize and cldr-data.

## install

```
$ yarn add polyfill-number-tolocalestring
```

## usage
```js
import usePolyfill from 'polyfill-number-tolocalestring'

async function main() {
  const reset = await usePolyfill(true)

  const num = 1200.01

  console.log(num.toLocaleString('nl')) // -> 1.200,01
  console.log(num.toLocaleString('nl', {
    style: 'currency',
    currency: 'EUR',
    currencyDisplay: 'code'
  })) // -> 1.200,01 EUR

  reset()

  console.log(num.toLocaleString('nl')) // -> 1,200.01
}

main()
```
