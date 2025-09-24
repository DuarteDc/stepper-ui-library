import App from './App'

import './index.css'
import { createRoot } from 'react-dom/client'
// export { Stepper } from './Stepper/Stepper'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(<App />)
