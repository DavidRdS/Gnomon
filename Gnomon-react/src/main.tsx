// index.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import App from './App.tsx'
import './index.css'

// retorna uma função para aplicar a atualização quando houver nova versão
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    // Use um UI próprio se quiser (toast/modal); usando confirm por simplicidade
    if (confirm('Nova versão disponível. Atualizar agora?')) {
      updateSW(true) // atualiza o SW e recarrega quando estiver pronto
    }
  },
  onOfflineReady() {
    console.log('App pronto para uso offline.')
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)