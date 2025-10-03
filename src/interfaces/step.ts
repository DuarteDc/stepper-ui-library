import type { ForwardRefExoticComponent, RefAttributes } from 'react'

export interface ValidateStep {
  canContinue: () => boolean | Promise<boolean>
}

export interface StepperContextProps {
  step: number
  backStep: () => void
  nextStep: () => Promise<void>
  navigateTo: (step: number) => void
  goToInitialStep: () => void
}

export interface ComponentContextProps {
  props: StepperContextProps
}
export interface StepComponentProps {
  name: string
  component: ForwardRefExoticComponent<
    ComponentContextProps & RefAttributes<ValidateStep>
  >
  icon?: React.ReactNode
}
