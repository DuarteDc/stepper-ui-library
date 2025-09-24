import { Stepper } from './Stepper/Stepper'

const App = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Stepper
        renderStepIcon={(i, active, completed) => (
          <div
            className={`w-32 h-6 rounded-full flex items-center justify-center ${
              active
                ? 'bg-blue-500 text-white w-60'
                : completed
                ? 'bg-green-500 text-white'
                : 'bg-gray-100'
            }`}
          >
            {completed ? '✓' : i + 1} asdhlkasdhj
          </div>
        )}
        wrapperClassName='bg-red-200 border-none shadow-lg'
        steps={[
          {
            name: 'First Step',
            component: () => (
              <div className='p-4 bg-blue-500 text-white'>First Step</div>
            )
          },
          {
            name: 'Second Step',
            component: () => (
              <div className='p-4 bg-green-500 text-white'>Second Step</div>
            )
          }
        ]}
        renderButtons={() => <div>Buttons</div>}
      />
    </div>
  )
}

export default App
