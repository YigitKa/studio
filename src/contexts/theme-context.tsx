"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

import { useContext } from "react"
import {
  ThemeContext as NextThemeContext,
} from "next-themes"

type ThemeContextType = {
  theme?: string
  setTheme: (theme: string) => void
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(NextThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context as ThemeContextType
}
