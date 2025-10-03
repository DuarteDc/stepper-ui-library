# Stepper UI

`stepper-ui` is a React component library that provides a **customizable and easy-to-use Stepper**, ideal for multi-step forms or workflows. Built with React, TypeScript, and designed to integrate with TailwindCSS.

---

## Installation

```bash
npm install stepper-ui
# or using pnpm
pnpm add stepper-ui
```

> Make sure to have `react` and `react-dom` installed as `peerDependencies`.

---

## Basic Usage

```tsx
import { Stepper } from 'stepper-ui';
import { Button } from '@your-ui/button';
import { ArrowLeftIcon, ArrowRightIcon, TaskAddIcon } from '@your-icons';
import { FormPersonData } from './FormPersonData';
import { FormVehicles } from './FormVehicles';

<Stepper
  steps=[
    { name: 'General Information', component: FormPersonData },
    { name: 'Additional Information', component: FormVehicles }
  ]
  renderButtons={({ nextStep, backStep, step, totalSteps }) => (
    <div className="flex justify-between">
      <Button
        color="primary"
        radius="full"
        startContent={<ArrowLeftIcon />}
        onPress={backStep}
        disabled={step === 0}
      >
        Previous
      </Button>
      <Button
        color="primary"
        radius="full"
        className="cursor-pointer"
        endContent={step + 1 === totalSteps ? <TaskAddIcon /> : <ArrowRightIcon />}
        onPress={nextStep}
        disabled={step === totalSteps - 1}
      >
        {step + 1 === totalSteps ? 'Save' : 'Next'}
      </Button>
    </div>
  )}
/>
```

---

## Props

### `StepperProps`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `steps` | `StepComponentProps[]` | Array of steps for the Stepper. Each step has a name and a React component. | No |
| `renderButtons` | `(props: RenderButtonsProps) => ReactNode \| ReactNode[]` | Function that receives `nextStep` and `backStep` methods and renders the navigation buttons. | No |
| `wrapperClassName` | `string` | Additional TailwindCSS classes for the Stepper container. | Yes |
| `renderStepIcon` | `(label:string, step: number, active: boolean, completed: boolean) => ReactNode` | Function to render a custom icon for each step. | Yes |

---

### `StepComponentProps`

| Prop | Type | Description | Optional |
|------|------|-------------|----------|
| `name` | `string` | Name of the step displayed in the Stepper. | No |
| `component` | `ForwardRefExoticComponent<RefAttributes<ValidateStep>>` | React component for the step. Must implement `ValidateStep` if validation is needed. | No |
| `icon` | `ReactNode` | Optional icon displayed next to the step name. | Yes |

---

### `RenderButtonsProps`

| Prop | Type | Description |
|------|------|-------------|
| `step` | `number` | Current step (0-based). |
| `nextStep` | `() => void` | Function to go to the next step. |
| `backStep` | `() => void` | Function to go back to the previous step. |
| `totalSteps` | `number` | Total number of steps in the Stepper. |

---

### `ValidateStep`

| Method | Return | Description |
|--------|--------|-------------|
| `canContinue` | `boolean \| Promise<boolean>` | Indicates if the current step allows moving to the next step. Useful for asynchronous validation. |

---

## Example of a Step Component with `forwardRef` and `ValidateStep`

```ts
import { forwardRef, useImperativeHandle } from 'react';
import type { ValidateStep } from 'stepper-ui';

export const FormPersonData = forwardRef<ValidateStep>((props, ref) => {
  // Expose methods to Stepper using ref
  useImperativeHandle(ref, () => ({
    canContinue: () => {
      // Validation logic
      return true; // or Promise<boolean> for async validation
    }
  }));

  return (
    <div>
      {/* Form content */}
      <label>Name:</label>
      <input type="text" />
    </div>
  );
});
```

**Important notes:**

- Each step component **must use `forwardRef<ValidateStep>`** if you want Stepper to control navigation based on validation.
- The `canContinue` method can return a `boolean` or a `Promise<boolean>`.
- You can expose other methods if needed, but Stepper will only use `canContinue`.

---

## Recommendations

- Your project should have **TailwindCSS configured** if you want to use the included classes.
- You can use `renderStepIcon` to add custom icons to each step.
- `Stepper` is fully **internally controlled**; you just need to provide the steps and navigation buttons.

---

## License

MIT © DuarteBv

