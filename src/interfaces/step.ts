import type { ForwardRefExoticComponent, RefAttributes } from 'react'

export interface ValidateStep {
  canContinue: () => boolean | Promise<boolean>
}

export interface StepComponentProps {
  name: string
  component: ForwardRefExoticComponent<RefAttributes<ValidateStep>>
  icon?: React.ReactNode
}
