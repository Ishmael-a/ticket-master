import { ThemeProvider as BaseThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

interface ThemeProviderProps{
    children: ReactNode;
}

const ThemeProvider = ({children}: ThemeProviderProps) => {
  return (
    <BaseThemeProvider attribute={"class"}  defaultTheme='system' enableSystem>
        { children }
    </BaseThemeProvider>
  )
}

export {ThemeProvider}
