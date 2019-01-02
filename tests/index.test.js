import { polyfill, polyfillSync, original } from './helpers'

describe('Polyfill exports', () => {
  describe('sync', () => {
    it('should not be used normally', () => {
      expect(Number.prototype.toLocaleString).toBe(original)
      polyfillSync()
      expect(Number.prototype.toLocaleString).toBe(original)
    })

    it('returns reset method', () => {
      expect(Number.prototype.toLocaleString).toBe(original)
      const reset = polyfillSync(true)
      expect(Number.prototype.toLocaleString).not.toBe(original)
      reset()
      expect(Number.prototype.toLocaleString).toBe(original)
    })
  })

  describe('async', () => {
    it('should not be used normally', async () => {
      expect(Number.prototype.toLocaleString).toBe(original)
      await polyfill()
      expect(Number.prototype.toLocaleString).toBe(original)
    })

    it('returns reset method', async () => {
      expect(Number.prototype.toLocaleString).toBe(original)
      const reset = await polyfill(true)
      expect(Number.prototype.toLocaleString).not.toBe(original)
      reset()
      expect(Number.prototype.toLocaleString).toBe(original)
    })
  })
})
