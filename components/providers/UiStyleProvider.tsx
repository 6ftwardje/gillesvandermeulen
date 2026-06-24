"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from "react"

type UiStyle = "light" | "dark"

interface UiStyleContextType {
  uiStyle: UiStyle
  setUiStyle: (style: UiStyle) => void
  autoMode: boolean
  setAutoMode: (enabled: boolean) => void
}

const UiStyleContext = createContext<UiStyleContextType>({
  uiStyle: "light",
  setUiStyle: () => {},
  autoMode: true,
  setAutoMode: () => {},
})

export function UiStyleProvider({ children }: { children: ReactNode }) {
  const [uiStyle, setUiStyleState] = useState<UiStyle>("light")
  const [autoMode, setAutoModeState] = useState<boolean>(true)

  const setUiStyle = useCallback((style: UiStyle) => {
    setUiStyleState(style)
  }, [])

  const setAutoMode = useCallback((enabled: boolean) => {
    setAutoModeState(enabled)
  }, [])

  return (
    <UiStyleContext.Provider value={{ uiStyle, setUiStyle, autoMode, setAutoMode }}>
      {children}
    </UiStyleContext.Provider>
  )
}

export function useUiStyle() {
  return useContext(UiStyleContext)
}
