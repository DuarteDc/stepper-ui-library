import type { ReactNode } from 'react'
import type { StepComponentProps } from '../interfaces/step'
import { useStepper } from '../hooks/useStepper'
import { getSizeByStep } from '../utils/getSizeByStep'
import { cn } from '../utils/mergeClass'

export interface RenderButtonsProps {
  step: number
  nextStep: () => void
  backStep: () => void
  totalSteps: number
}

export interface StepperProps {
  steps: Array<StepComponentProps>
  renderButtons: (props: RenderButtonsProps) => ReactNode | ReactNode[]
  wrapperClassName?:
    | React.HTMLAttributes<HTMLDivElement>['className']
    | undefined
  renderStepIcon?: (
    label: string,
    step: number,
    active: boolean,
    completed: boolean
  ) => ReactNode
}

export const Stepper = ({
  steps,
  renderButtons,
  wrapperClassName,
  renderStepIcon
}: StepperProps) => {
  const {
    Component,
    step,
    stepRef,
    nextStep,
    backStep,
    navigateTo,
    goToInitialStep
  } = useStepper({
    stepsComponent: steps
  })
  return (
    <div className={cn('relative w-full overflow-hidden', wrapperClassName)}>
      <div className='w-full flex py-6 overflow-x-auto'>
        {steps.map(({ name }, index) => (
          <div
            key={name}
            style={{ width: `${getSizeByStep(steps.length)}` }}
            className='mx-1 flex w-full justify-center relative before:absolute before:right-0 before:w-full before:top-1/2 before:bottom-1/2 before:h-1 before:-z-10  before:bg-white min-w-[6rem]'
          >
            {renderStepIcon ? (
              renderStepIcon(name, index, index === step, index < step)
            ) : (
              <span
                onClick={() => {
                  if (index + 1 <= step) {
                    navigateTo(index)
                  }
                }}
                className={`rounded-full text-[10px] lg:text-base font-bold bg-white ${
                  step < index && 'text-gray-500'
                } px-2 py-1 lg:px-4 lg:py-2 flex text-center justify-center items-center transition-all duration-400 ${
                  step > index && 'cursor-pointer'
                }`}
              >
                <span
                  className={`hidden md:flex min-w-6 min-h-6 rounded-full ${
                    step < index && 'bg-none'
                  } items-center flex justify-center mr-1`}
                >
                  {step <= index ? (
                    `${index + 1}`
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-4 h-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                  )}
                </span>
                {name}
              </span>
            )}
          </div>
        ))}
      </div>
      <Component
        ref={stepRef}
        props={{
          nextStep,
          backStep,
          step,
          goToInitialStep,
          navigateTo
        }}
      />
      <div className='mt-20'>
        {renderButtons({
          nextStep,
          backStep,
          step,
          totalSteps: steps.length
        })}
      </div>
    </div>
  )
}
