import { useEffect, useLayoutEffect } from 'react'

const useEventListener = (type, handler, dependencies = [], params = {}) => {
  const { immediate = true, layout = false, options = undefined } = params

  const method = layout ? useLayoutEffect : useEffect

  method(() => {
    window.addEventListener(type, handler, options)
    if (immediate) {
      handler()
    }

    return () => {
      window.removeEventListener(type, handler, options)
    }
  }, dependencies)
}

export default useEventListener
