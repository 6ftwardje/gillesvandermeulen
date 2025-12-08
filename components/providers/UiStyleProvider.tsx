"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type UiStyle = "light" | "dark"

interface UiStyleContextType {
  uiStyle: UiStyle
  setUiStyle: (style: UiStyle) => void
}

const UiStyleContext = createContext<UiStyleContextType>({
  uiStyle: "light",
  setUiStyle: () => {},
})

export function UiStyleProvider({ children }: { children: ReactNode }) {
  const [uiStyle, setUiStyle] = useState<UiStyle>("light")

  return (
    <UiStyleContext.Provider value={{ uiStyle, setUiStyle }}>
      {children}
    </UiStyleContext.Provider>
  )
}

export function useUiStyle() {
  return useContext(UiStyleContext)
}

