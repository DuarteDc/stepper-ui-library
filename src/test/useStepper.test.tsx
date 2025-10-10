import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { type StepComponentProps, type ValidateStep } from '../interfaces/step'
import { useStepper } from '../hooks/useStepper'

const createStepsMock = (): StepComponentProps[] => [
  {
    name: 'Step One',
    component: vi.fn(),
    icon: null
  },
  {
    name: 'Step Two',
    component: vi.fn(),
    icon: null
  },
  {
    name: 'Step Three',
    component: vi.fn(),
    icon: null
  }
]

describe('useStepper Hook', () => {
  let mockComponent: StepComponentProps[]

  beforeEach(() => {
    mockComponent = createStepsMock()
  })

  it('should initialize the hook correctly', () => {
    const { result } = renderHook(() =>
      useStepper({ stepsComponent: mockComponent })
    )

    expect(result.current).toBeDefined()
    expect(result.current.step).toBe(0)
    expect(result.current.componentName).toBe('Step One')
    expect(result.current.Component).toBeDefined()
    expect(typeof result.current.nextStep).toBe('function')
    expect(typeof result.current.backStep).toBe('function')
    expect(typeof result.current.navigateTo).toBe('function')
    expect(typeof result.current.goToInitialStep).toBe('function')
  })

  it('should not advance if canContinue() result false', async () => {
    const { result } = renderHook(() =>
      useStepper({ stepsComponent: mockComponent })
    )

    result.current.stepRef.current = {
      canContinue: vi.fn().mockResolvedValue(false)
    } as unknown as ValidateStep

    await act(async () => {
      await result.current.nextStep()
    })

    await waitFor(() => {
      expect(result.current.step).toBe(0)
      expect(result.current.componentName).toBe('Step One')
    })
  })
})
