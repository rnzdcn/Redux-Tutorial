import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store/store.ts'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
