import createStore from 'zustand'

const useGlobal = createStore(set => ({
  isMobile: null,
  isLoaded: false,
  setIsMobile: isMobile => set({ isMobile }),
  setIsLoaded: isLoaded => set({ isLoaded })
}))

export default useGlobal
