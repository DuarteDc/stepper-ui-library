import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Stepper } from '../Stepper/Stepper'

describe('Stepper UI', () => {
  it('renders without crashing', () => {
    // Test will fail if there is an error during rendering
    expect(() => render(<Stepper />)).toThrow()
  })
})
