import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { Provider as ReduxProvider } from 'react-redux'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './global.scss'
import { store } from './components/app/store'

const container = document.getElementById('root') as HTMLDivElement

const root = createRoot(container)

function AppWrapper() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])

  return (
    <ColorSchemeProvider 
      toggleColorScheme={toggleColorScheme} 
      colorScheme={colorScheme}>
      <MantineProvider theme={{ colorScheme, primaryColor: 'lime' }}>
        <ReduxProvider store={store}>
          <App />
        </ReduxProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

root.render(<AppWrapper />)