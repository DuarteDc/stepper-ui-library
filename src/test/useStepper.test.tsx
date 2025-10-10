import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, beforeEach, vi } from 'vitest'
import { type StepComponentProps, type ValidateStep } from '../interfaces/step'
import { useStepper } from '../hooks/useStepper'
import { stepsComponentMock } from './mocks/step-component-mock'

describe('useStepper Hook', () => {
  let mockComponent: StepComponentProps[]

  beforeEach(() => {
    mockComponent = stepsComponentMock
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

  it('should advance if canContinue() result true', async () => {
    const { result } = renderHook(() =>
      useStepper({ stepsComponent: mockComponent })
    )
    result.current.stepRef.current = {
      canContinue: vi.fn().mockResolvedValue(true)
    } as unknown as ValidateStep

    await act(async () => {
      await result.current.nextStep()
    })

    await waitFor(() => {
      expect(result.current.step).toBe(1)
      expect(result.current.componentName).toBe('Step Two')
    })
  })

  it('should go back a step', async () => {
    const { result } = renderHook(() =>
      useStepper({ stepsComponent: mockComponent })
    )

    result.current.stepRef.current = {
      canContinue: vi.fn().mockResolvedValue(true)
    } as unknown as ValidateStep

    await act(async () => {
      await result.current.nextStep()
    })
    expect(result.current.step).toBe(1)
    await act(() => {
      result.current.backStep()
    })

    await waitFor(() => {
      expect(result.current.step).toBe(0)
      expect(result.current.componentName).toBe('Step One')
    })
  })

  it('should navigate to a specific step', async () => {
    const { result } = renderHook(() =>
      useStepper({ stepsComponent: mockComponent })
    )
    await act(async () => {
      await result.current.navigateTo(2)
    })

    await waitFor(() => {
      expect(result.current.step).toBe(2)
      expect(result.current.componentName).toBe('Step Three')
    })
  })
  it('should go to initial step', async () => {
    const { result } = renderHook(() =>
      useStepper({ stepsComponent: mockComponent })
    )

    await act(() => result.current.navigateTo(2))

    await act(() => result.current.goToInitialStep())

    await waitFor(() => {
      expect(result.current.step).toBe(0)
      expect(result.current.componentName).toBe('Step One')
    })
  })
})
