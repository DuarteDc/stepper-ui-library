import { createRef, useCallback, useMemo, useState } from 'react'
import type { StepComponentProps, ValidateStep } from '../interfaces/step'

interface Props {
  stepsComponent: StepComponentProps[]
}

export const useStepper = ({ stepsComponent }: Props) => {
  const [step, setStep] = useState(0)

  const stepRefComponents = useMemo(
    () => stepsComponent.map(() => createRef<ValidateStep>()),
    [stepsComponent]
  )

  const nextStep = async () => {
    if (await stepRefComponents[step].current?.canContinue()) {
      if (stepsComponent.length - 1 > step) {
        setStep(prev => prev + 1)
      }
    }
  }

  const backStep = () => (step < 1 ? undefined : setStep(prev => prev - 1))

  const navigateTo = useCallback((step: number) => setStep(step), [])
  const goToInitialStep = useCallback(() => setStep(0), [])

  const { component, name } = stepsComponent[step]

  return {
    step,
    Component: component,
    componentName: name,
    stepRef: stepRefComponents[step],
    backStep,
    nextStep,
    navigateTo,
    goToInitialStep
  }
}
