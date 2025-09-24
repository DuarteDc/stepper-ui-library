import type { ReactNode } from 'react'
import type { StepComponentProps } from '../interfaces/step'
import { useStepper } from '../hooks/useStepper'
import { getSizeByStep } from '../utils/getSizeByStep'

interface RenderButtonsProps {
  step: number
  nextStep: () => void
  backStep: () => void
  totalSteps: number
}

interface StepperProps {
  steps: Array<StepComponentProps>
  renderButtons: (props: RenderButtonsProps) => ReactNode | ReactNode[]
  showProgress?: boolean
}

export const Stepper = ({ steps, renderButtons }: StepperProps) => {
  const { Component, step, stepRef, nextStep, backStep, navigateTo } =
    useStepper({
      stepsComponent: steps
    })
  return (
    <div className='shadow-md border p-5 lg:p-10 rounded-lg relative w-full overflow-hidden lg:mx-20'>
      <div className='w-full flex py-6 overflow-x-auto'>
        {steps.map(({ name }, index) => (
          <div
            key={name}
            style={{ width: `${getSizeByStep(steps.length)}` }}
            className='mx-1 flex w-full justify-center relative before:absolute before:right-0 before:w-full before:top-1/2 before:bottom-1/2 before:h-1 before:-z-10  before:bg-white min-w-[6rem]'
          >
            <span
              onClick={() => {
                if (index + 1 <= step) {
                  navigateTo(index)
                }
              }}
              className={`rounded-full border-2 text-[10px] lg:text-base font-bold ${
                step >= index ? 'border-primary' : 'text-gray-400'
              } px-2 py-1 lg:px-4 lg:py-2 flex text-center justify-center items-center transition-all duration-400 ${
                step > index
                  ? 'cursor-pointer bg-primary text-white'
                  : 'bg-white'
              }`}
            >
              <span
                className={`hidden md:flex min-w-6 min-h-6 rounded-full ${
                  step >= index ? 'bg-primary text-white' : 'bg-none'
                } items-center flex justify-center mr-1`}
              >
                {step <= index ? `${index + 1}` : <>Show success icon</>}
              </span>
              {name}
            </span>
          </div>
        ))}
      </div>
      <Component ref={stepRef} />
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
