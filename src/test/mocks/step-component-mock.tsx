import { forwardRef, useImperativeHandle } from 'react'
import type {
  StepComponentProps,
  StepperContextProps,
  ValidateStep
} from '../../interfaces/step'

const firtsMockComponent = forwardRef<ValidateStep, StepperContextProps>(
  (_props, ref) => {
    useImperativeHandle(ref, () => ({
      canContinue: () => true
    }))
    return <div>Step One</div>
  }
)
const secondMockComponent = forwardRef<ValidateStep, StepperContextProps>(
  (_props, ref) => {
    useImperativeHandle(ref, () => ({
      canContinue: () => true
    }))
    return <div>Step Two</div>
  }
)

export const stepsComponentMock: Array<StepComponentProps> = [
  { name: 'Step One', component: firtsMockComponent },
  { name: 'Step Two', component: secondMockComponent }
]
