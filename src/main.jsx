import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { ProductosProvider } from './contexts/ProductosContext.jsx'
import { CarritoProvider } from './contexts/CarritoContex.jsx'
import { SearchProvider } from './contexts/SearchContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarritoProvider>
      <ProductosProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </ProductosProvider>
    </CarritoProvider>

  </StrictMode>,
)

