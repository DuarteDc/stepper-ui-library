import { beforeAll, describe, expect, it } from 'vitest'
import { type StepComponentProps } from '../interfaces/step'
import { stepsComponentMock } from './mocks/step-component-mock'
import { useStepper } from '../hooks/useStepper'
import { act, renderHook, waitFor } from '@testing-library/react'

describe('useStepper Hook', () => {
  let mockComponent: StepComponentProps[]
  let useStepperHook: ReturnType<typeof useStepper>

  beforeAll(() => {
    mockComponent = stepsComponentMock
    const { result } = renderHook(() =>
      useStepper({ stepsComponent: mockComponent })
    )
    useStepperHook = result.current
  })

  it('should initialize the hook correctly', () => {
    expect(useStepperHook).toBeDefined()
    expect(useStepperHook.step).toBe(0)
    expect(useStepperHook.componentName).toBe('Step One')
    expect(useStepperHook.Component).toBeDefined()
    expect(typeof useStepperHook.nextStep).toBe('function')
    expect(typeof useStepperHook.backStep).toBe('function')
    expect(typeof useStepperHook.navigateTo).toBe('function')
    expect(typeof useStepperHook.goToInitialStep).toBe('function')
  })

  it('should go to the next step', async () => {
    act(async () => await useStepperHook.nextStep())
    await waitFor(() => {
      expect(useStepperHook.step).toBe(1)
      expect(useStepperHook.componentName).toBe('Step Two')
    })
  })
})
