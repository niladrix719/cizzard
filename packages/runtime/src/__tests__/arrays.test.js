import { expect, test } from 'vitest'
import { arraysDiffSequence, applyArraysDiffSequence } from "../utils/arrays";

test('apply array difference sequence', () => {
  const sequence = arraysDiffSequence(
    ['A', 'A', 'B', 'C'],['C', 'K', 'A', 'B']
  )

  const ans = applyArraysDiffSequence(['A', 'A', 'B', 'C'], sequence)

  expect(ans).toStrictEqual(['C', 'K', 'A', 'B'])
})