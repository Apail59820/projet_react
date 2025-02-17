import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import * as React from "react";

const rootElement = (<StrictMode>
    <App/>
</StrictMode>);

createRoot(document.getElementById('root')!).render(
    rootElement as React.ReactNode
)
