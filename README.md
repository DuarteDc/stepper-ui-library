# stepper-ui

Un componente de **Stepper** sencillo y personalizable para React.

[![npm version](https://img.shields.io/npm/v/stepper-ui.svg)](https://www.npmjs.com/package/stepper-ui)
[![npm downloads](https://img.shields.io/npm/dm/stepper-ui.svg)](https://www.npmjs.com/package/stepper-ui)

---

## 🚀 Instalación

```bash
npm install stepper-ui
# o
yarn add stepper-ui
```

---

## 🔧 Uso básico

```tsx
import React from "react";
import { Stepper } from "stepper-ui";

const steps = [
  { label: "Información Personal" },
  { label: "Detalles de Contacto" },
  { label: "Confirmación" },
];

export default function App() {
  return (
    <div>
      <h1>Ejemplo Stepper</h1>
      <Stepper steps={steps} activeStep={1} />
    </div>
  );
}
```

---

## 📌 Props

| Prop          | Tipo                   | Descripción                                               | Default     |
| ------------- | ---------------------- | --------------------------------------------------------- | ----------- |
| `steps`       | `Array<{label}>`       | Lista de pasos a mostrar en el Stepper                    | `[]`        |
| `activeStep`  | `number`               | Índice del paso activo (inicia en `0`)                    | `0`         |
| `onStepClick` | `(index:number)=>void` | Callback opcional cuando el usuario hace click en un paso | `undefined` |

---

## 🎨 Estilos

El componente incluye estilos básicos, pero puedes sobreescribirlos usando tu propio CSS o con frameworks como **Tailwind**.

Ejemplo:

```css
.stepper {
  display: flex;
  gap: 1rem;
}

.stepper-step {
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.stepper-step.active {
  background-color: #007bff;
  color: white;
}
```

---

## 🛠 Desarrollo local

Clonar el repositorio y probar el componente en un proyecto de ejemplo:

```bash
git clone https://github.com/DuarteDc/stepper-ui-library
cd stepper-ui
npm install
npm run dev
```

---

## 📄 Licencia

MIT © [DuarteDc](https://github.com/DuarteDc)
